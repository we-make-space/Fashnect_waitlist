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
import type { CSSProperties } from "react"
import { EmailLogo, EmailSocialFooter } from "./email-brand"
import { WL_EMAIL, WaitlistEmailResponsiveHead } from "./waitlist-email-responsive"

export interface SellerEmailProps {
  name: string
  whatsappUrl: string
}

export default function SellerEmail({ name, whatsappUrl }: SellerEmailProps) {
  const greeting = name.trim() ? name.trim() : "there"

  return (
    <Html>
      <WaitlistEmailResponsiveHead />
      <Preview>Sell more, get seen — your seller lane on WhatsApp.</Preview>
      <Body style={main}>
        <Container className={WL_EMAIL.container} style={container}>
          <Section className={WL_EMAIL.card} style={card}>
            <EmailLogo />
            <Heading className={WL_EMAIL.h1} style={h1}>
              Let&apos;s grow your next chapter
            </Heading>
            <Text className={WL_EMAIL.text} style={text}>
              Hi {greeting},
            </Text>
            <Text className={WL_EMAIL.text} style={text}>
              You&apos;re on the Fashnect waitlist — and you&apos;re welcome here as a seller. We&apos;re
              building for boutiques and creators who want to grow with buyers who care. Picture
              your next chapter with us, then come into the seller WhatsApp community: early news, a
              straight line to the team, and peers who understand the work.
            </Text>
            <Section style={ctaWrap}>
              <Link href={whatsappUrl} className={WL_EMAIL.cta} style={ctaWhatsapp}>
                Join the seller community in WhatsApp
              </Link>
            </Section>
            <Hr style={hr} />
            <Text className={WL_EMAIL.muted} style={muted}>
              Skip the group? You&apos;ll still get the essentials by email — no FOMO.
            </Text>
            <EmailSocialFooter />
          </Section>
        </Container>
      </Body>
    </Html>
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
  fontSize: "26px",
  fontWeight: 600,
  lineHeight: "32px",
  margin: "0 0 20px",
  letterSpacing: "-0.02em",
}

const text: CSSProperties = {
  color: "#424245",
  fontSize: "17px",
  lineHeight: "26px",
  margin: "0 0 16px",
  wordBreak: "break-word",
}

const ctaWrap: CSSProperties = {
  textAlign: "center" as const,
  margin: "28px 0 8px",
}

const cta: CSSProperties = {
  backgroundColor: "#000000",
  color: "#ffffff",
  borderRadius: "980px",
  fontSize: "16px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
  padding: "16px 28px",
  minHeight: "48px",
  boxSizing: "border-box",
  lineHeight: 1.35,
}

const ctaWhatsapp: CSSProperties = {
  ...cta,
  backgroundColor: "#25D366",
  color: "#ffffff",
}

const hr: CSSProperties = {
  border: "none",
  borderTop: "1px solid #e8e8ed",
  margin: "28px 0",
}

const muted: CSSProperties = {
  color: "#86868b",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0",
}
