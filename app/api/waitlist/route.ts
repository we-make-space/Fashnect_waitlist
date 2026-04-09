import { sendWaitlistOnboardingEmails } from "@/lib/email/send-waitlist-onboarding"
import { supabase } from "@/lib/supabase"
import { after } from "next/server"
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

  const { error: dbError } = await supabase.from("waitlist").insert([
    {
      email,
      phone: cleanPhone,
      role,
    },
  ])

  if (dbError) {
    if (dbError.code === "23505") {
      return NextResponse.json({ error: "duplicate", message: "Email already registered" }, { status: 409 })
    }
    console.error("Waitlist insert error:", dbError)
    return NextResponse.json({ error: "Failed to save signup" }, { status: 500 })
  }

  const phoneForEmail = phoneRaw.trim() || cleanPhone || null

  after(async () => {
    try {
      await sendWaitlistOnboardingEmails({
        email,
        name,
        role,
        whatsappUrl,
        phone: phoneForEmail,
      })
    } catch (err) {
      console.error("Background waitlist email failed:", err)
    }
  })

  return NextResponse.json({ success: true, joinUrl: whatsappUrl, role })
}
