import { render } from "@react-email/render"
import { createElement } from "react"
import BuyerEmail from "./templates/buyer-email"
import SellerEmail from "./templates/seller-email"
import TeamWaitlistSignupEmail from "./templates/team-waitlist-signup-email"
import { sendEmail } from "./email.service"

export type WaitlistNotifyRole = "seller" | "buyer"

/**
 * Sends welcome + optional team notification. Safe to run after the HTTP response
 * (e.g. inside Next.js `after()`). Run onboarding + team mail in parallel.
 */
export async function sendWaitlistOnboardingEmails(payload: {
  email: string
  name: string
  role: WaitlistNotifyRole
  whatsappUrl: string
  /** Display/submitted phone; omit or null when not provided */
  phone: string | null
}) {
  const { email, name, role, whatsappUrl, phone } = payload

  const onboardingHtml =
    role === "seller"
      ? await render(createElement(SellerEmail, { name, whatsappUrl }))
      : await render(createElement(BuyerEmail, { name, whatsappUrl }))

  const userPromise = sendEmail({
    to: email,
    subject:
      role === "seller"
        ? "Let's grow your next chapter · Fashnect"
        : "A quieter way to find what you'll wear · Fashnect",
    html: onboardingHtml,
  })

  const teamTo = process.env.TEAM_EMAIL?.trim()
  const roleWord = role === "seller" ? "Seller" : "Buyer"
  const teamSubject = `New waitlist signup · ${roleWord} · ${email}`
  const teamPromise = teamTo
    ? sendEmail({
        to: teamTo,
        subject: teamSubject,
        html: await render(
          createElement(TeamWaitlistSignupEmail, {
            name,
            email,
            phone,
            role,
          }),
        ),
      }).catch((err) => {
        console.error("Team notification email failed:", err)
      })
    : Promise.resolve()

  await Promise.all([userPromise, teamPromise])
}
