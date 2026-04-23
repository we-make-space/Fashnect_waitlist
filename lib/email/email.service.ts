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

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    })
    if (process.env.NODE_ENV === "development") {
      console.log("[email] sent", { to, subject: subject.slice(0, 48), messageId: info.messageId })
    }
  } catch (err: unknown) {
    const e = err as {
      message?: string
      code?: string
      command?: string
      response?: string
      responseCode?: number
    }
    console.error("[email] sendMail failed", {
      to,
      subject: subject.slice(0, 60),
      message: e.message,
      code: e.code,
      responseCode: e.responseCode,
      response: e.response,
      command: e.command,
    })
    throw err
  }
}
