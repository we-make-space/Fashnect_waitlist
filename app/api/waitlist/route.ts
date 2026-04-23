import { sendWaitlistOnboardingEmails } from "@/lib/email/send-waitlist-onboarding"
import { isWaitlistSmtpConfigured } from "@/lib/email/smtp-env"
import { supabase } from "@/lib/supabase"
import { WAITLIST_LOCATION_MAX_LEN } from "@/lib/waitlist-constants"
import { NextResponse } from "next/server"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type WaitlistRole = "seller" | "buyer"

function normalizeName(raw: unknown, email: string): string {
  if (typeof raw === "string" && raw.trim()) return raw.trim()
  const local = email.split("@")[0] ?? ""
  return local.replace(/[._-]+/g, " ").trim() || "there"
}

function isWaitlistRole(value: unknown): value is WaitlistRole {
  return value === "seller" || value === "buyer"
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 })
  }

  const record = body as Record<string, unknown>
  const emailRaw = typeof record.email === "string" ? record.email.trim() : ""
  const role = record.role
  const phoneRaw = typeof record.phone === "string" ? record.phone : ""
  const name = normalizeName(record.name, emailRaw.toLowerCase())
  const locationRaw = typeof record.location === "string" ? record.location.trim() : ""
  if (locationRaw.length > WAITLIST_LOCATION_MAX_LEN) {
    return NextResponse.json(
      { error: "invalid_location", message: `Location must be ${WAITLIST_LOCATION_MAX_LEN} characters or less` },
      { status: 400 },
    )
  }
  const location = locationRaw || null

  if (!emailRaw) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  if (!emailRegex.test(emailRaw)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
  }

  if (!isWaitlistRole(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 })
  }

  const email = emailRaw.toLowerCase()
  const cleanPhone = phoneRaw ? phoneRaw.trim().replace(/[\s\-().]/g, "") : null

  const whatsappSeller = process.env.WHATSAPP_SELLER?.trim()
  const whatsappBuyer = process.env.WHATSAPP_BUYER?.trim()
  const whatsappUrl = role === "seller" ? whatsappSeller : whatsappBuyer

  if (!whatsappUrl) {
    console.error("Missing WHATSAPP_SELLER or WHATSAPP_BUYER for role:", role)
    return NextResponse.json(
      {
        error: "server_config",
        message:
          "Waitlist signup is not fully configured (WhatsApp links). Add WHATSAPP_SELLER and WHATSAPP_BUYER to your server environment.",
      },
      { status: 500 },
    )
  }

  const baseRow = {
    email,
    phone: cleanPhone,
    role,
  }

  let insertError = (
    await supabase.from("waitlist").insert([
      {
        ...baseRow,
        location,
      },
    ])
  ).error

  // Supabase schema cache: missing `location` column (PGRST204) — run
  // supabase/migrations/20250423120000_add_location_to_waitlist.sql in the SQL editor.
  const isMissingLocationColumn =
    insertError?.code === "PGRST204" &&
    typeof insertError.message === "string" &&
    insertError.message.includes("'location'")

  if (isMissingLocationColumn) {
    console.warn(
      "[waitlist] `location` column missing on `waitlist` table; saving without it. Run: supabase/migrations/20250423120000_add_location_to_waitlist.sql",
    )
    const retry = await supabase.from("waitlist").insert([baseRow])
    insertError = retry.error
  }

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ error: "duplicate", message: "Email already registered" }, { status: 409 })
    }
    console.error("Waitlist insert error:", insertError)
    return NextResponse.json({ error: "Failed to save signup" }, { status: 500 })
  }

  const phoneForEmail = phoneRaw.trim() || cleanPhone || null

  if (!isWaitlistSmtpConfigured()) {
    console.warn(
      "[waitlist] SMTP not configured. Set SMTP_HOST, SMTP_PORT (optional, default 587), SMTP_USER, SMTP_PASS, and SMTP_FROM (or rely on SMTP_USER as From). See .env.example.",
    )
    return NextResponse.json(
      {
        success: true,
        joinUrl: whatsappUrl,
        role,
        message:
          "You're on the list. Welcome email couldn't be sent because mail isn't configured on the server yet—check spam later or use the WhatsApp link below.",
      },
      { status: 502 },
    )
  }

  try {
    await sendWaitlistOnboardingEmails({
      email,
      name,
      role,
      whatsappUrl,
      phone: phoneForEmail,
      location,
    })
  } catch (err) {
    console.error("Waitlist email failed:", err)
    return NextResponse.json(
      {
        success: true,
        joinUrl: whatsappUrl,
        role,
        message:
          "You're on the list, but we couldn't send the welcome email. Check spam or use the WhatsApp link below.",
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true, joinUrl: whatsappUrl, role })
}
