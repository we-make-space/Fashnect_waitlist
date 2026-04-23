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

export interface BuyerEmailProps {
  name: string
  whatsappUrl: string
}

export default function BuyerEmail({ name, whatsappUrl }: BuyerEmailProps) {
  const greeting = name.trim() ? name.trim() : "there"

  return (
    <Html>
      <WaitlistEmailResponsiveHead />
      <Preview>Curated discovery — optional first look on WhatsApp.</Preview>
      <Body style={main}>
        <Container className={WL_EMAIL.container} style={container}>
          <Section className={WL_EMAIL.card} style={card}>
            <EmailLogo />
            <Heading className={WL_EMAIL.h1} style={h1}>
              You&apos;re on Fashnect as a shopper
            </Heading>
            <Text className={WL_EMAIL.text} style={text}>
              Hi {greeting},
            </Text>
            <Text className={WL_EMAIL.text} style={text}>
              You&apos;re on the Fashnect waitlist as a shopper — a buyer who cares about what you
              wear and who you buy from. We&apos;re building calmer discovery, sellers you can trust,
              and pieces worth keeping. The heart of that story will unfold in our shopper WhatsApp
              community: launch timing, first looks, and the conversation while we build.
            </Text>
            <Text className={WL_EMAIL.text} style={text}>
              Come join us there — tap the button, introduce yourself when you land, and stay close
              to what&apos;s next. That&apos;s how you&apos;ll hear the good stuff first and shape Fashnect
              alongside other shoppers.
            </Text>
            <Section style={ctaWrap}>
              <Link href={whatsappUrl} className={WL_EMAIL.cta} style={ctaWhatsapp}>
                Join the shopper community in WhatsApp
              </Link>
            </Section>
            <Hr style={hr} />
            <Text className={WL_EMAIL.muted} style={muted}>
              We want you in the room — tap the button and say hello. That&apos;s where launch
              news, first looks, and the real conversation happen first.
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
