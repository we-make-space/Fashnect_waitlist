import {
  Body,
  Container,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import type { CSSProperties, ReactNode } from "react"
import { EmailLogo } from "./email-brand"
import { WL_EMAIL, WaitlistEmailResponsiveHead } from "./waitlist-email-responsive"

export type TeamSignupRole = "seller" | "buyer"

export interface TeamWaitlistSignupEmailProps {
  name: string
  email: string
  phone: string | null
  role: TeamSignupRole
}

function telHrefFromPhone(phone: string | null | undefined): string | undefined {
  if (!phone?.trim()) return undefined
  const trimmed = phone.trim()
  const body = trimmed.replace(/^\+/, "").replace(/\D/g, "")
  if (body.length < 7) return undefined
  return trimmed.startsWith("+") ? `tel:+${body}` : `tel:${body}`
}

function roleLabel(role: TeamSignupRole): string {
  return role === "seller" ? "Seller" : "Buyer"
}

function roleDescription(role: TeamSignupRole): string {
  return role === "seller"
    ? "Wants to sell on Fashnect (provider)"
    : "Wants to shop on Fashnect (explorer)"
}

export default function TeamWaitlistSignupEmail({
  name,
  email,
  phone,
  role,
}: TeamWaitlistSignupEmailProps) {
  const displayName = name.trim() || "—"
  const phoneLine = phone?.trim() ? phone.trim() : "Not provided"
  const mailto = `mailto:${encodeURIComponent(email)}`
  const telHref = telHrefFromPhone(phone)

  return (
    <Html>
      <WaitlistEmailResponsiveHead />
      <Preview>
        New waitlist signup: {displayName} · {roleLabel(role)}
      </Preview>
      <Body style={main}>
        <Container className={WL_EMAIL.container} style={container}>
          <Section className={WL_EMAIL.card} style={card}>
            <EmailLogo />
            <Heading className={WL_EMAIL.h1} style={h1}>
              Someone new joined the waitlist
            </Heading>
            <Text className={WL_EMAIL.text} style={lede}>
              Here&apos;s a quick snapshot so you can follow up or add them to your workflows. The
              signup is already stored in your waitlist database.
            </Text>

            <Section style={dl}>
              <Row label="Name" value={displayName} />
              <Row label="Email" value={<Link href={mailto} style={valueLink}>{email}</Link>} />
              <Row
                label="Phone"
                value={
                  telHref ? (
                    <Link href={telHref} style={valueLink}>
                      {phoneLine}
                    </Link>
                  ) : (
                    phoneLine
                  )
                }
              />
              <Row label="Role" value={roleLabel(role)} hint={roleDescription(role)} />
            </Section>

            <Hr style={hr} />
            <Text className={WL_EMAIL.muted} style={muted}>
              Automatic message from the Fashnect waitlist app — no reply expected.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

function Row({
  label,
  value,
  hint,
}: {
  label: string
  value: ReactNode
  hint?: string
}) {
  return (
    <Section style={row}>
      <Text style={dt}>{label}</Text>
      <Text style={dd}>{value}</Text>
      {hint ? (
        <Text style={dhint}>{hint}</Text>
      ) : null}
    </Section>
  )
}

const main: CSSProperties = {
  backgroundColor: "#f5f5f7",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  WebkitTextSizeAdjust: "100%",
  textSizeAdjust: "100%",
  width: "100%",
}

const container: CSSProperties = {
  margin: "0 auto",
  padding: "40px 16px",
  maxWidth: "560px",
  width: "100%",
}

const card: CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "18px",
  padding: "36px 28px",
  border: "1px solid #e8e8ed",
  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
  maxWidth: "100%",
  boxSizing: "border-box",
}

const h1: CSSProperties = {
  color: "#1d1d1f",
  fontSize: "24px",
  fontWeight: 600,
  lineHeight: "30px",
  margin: "0 0 12px",
  letterSpacing: "-0.02em",
}

const lede: CSSProperties = {
  color: "#424245",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 24px",
  wordBreak: "break-word",
}

const dl: CSSProperties = {
  margin: "0",
  padding: "20px 0 0",
  borderTop: "1px solid #e8e8ed",
}

const row: CSSProperties = {
  margin: "0 0 20px",
}

const dt: CSSProperties = {
  color: "#86868b",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "0 0 6px",
  lineHeight: "16px",
}

const dd: CSSProperties = {
  color: "#1d1d1f",
  fontSize: "17px",
  lineHeight: "26px",
  fontWeight: 500,
  margin: "0",
  wordBreak: "break-word",
}

const dhint: CSSProperties = {
  color: "#86868b",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "6px 0 0",
}

const valueLink: CSSProperties = {
  color: "#0071e3",
  textDecoration: "underline",
  fontWeight: 600,
}

const hr: CSSProperties = {
  border: "none",
  borderTop: "1px solid #e8e8ed",
  margin: "24px 0 20px",
}

const muted: CSSProperties = {
  color: "#86868b",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0",
}
