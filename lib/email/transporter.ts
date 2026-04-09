import nodemailer, { type Transporter } from "nodemailer"

let cached: Transporter | null = null

export function getTransporter(): Transporter {
  if (cached) return cached

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || "587")
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is incomplete. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.")
  }

  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    pool: true,
    maxConnections: 2,
    maxMessages: 50,
  })

  return cached
}
