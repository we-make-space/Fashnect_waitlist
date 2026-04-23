/**
 * Returns true when Nodemailer can build a transporter and `sendEmail` has a From address.
 * Team notifications use the same transporter.
 */
export function isWaitlistSmtpConfigured(): boolean {
  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  const from = process.env.SMTP_FROM?.trim() || user
  return Boolean(host && user && pass && from)
}
