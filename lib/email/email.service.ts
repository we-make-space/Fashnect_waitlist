import { getTransporter } from "./transporter"

const defaultFrom = () =>
  process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim() || ""

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  const transporter = getTransporter()
  const from = defaultFrom()
  if (!from) {
    throw new Error("SMTP_FROM or SMTP_USER must be set for the From address.")
  }

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  })
}
