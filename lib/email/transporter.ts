import nodemailer, { type Transporter } from "nodemailer"

let cached: Transporter | null = null

/** Pooled SMTP breaks on serverless (timeouts, frozen connections). */
function isServerlessEnv(): boolean {
  return (
    process.env.VERCEL === "1" ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
    Boolean(process.env.NETLIFY)
  )
}

export function getTransporter(): Transporter {
  const serverless = isServerlessEnv()
  if (cached && !serverless) return cached

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || "587")
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration is incomplete. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.")
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    pool: !serverless,
    ...(serverless
      ? {}
      : {
          maxConnections: 2,
          maxMessages: 50,
        }),
  })

  if (!serverless) {
    cached = transport
  }

  return transport
}
