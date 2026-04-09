import { Img, Link, Section, Text } from "@react-email/components"
import type { CSSProperties } from "react"
import {
  FASHNECT_EMAIL_LOGO_URL,
  FASHNECT_INSTAGRAM_URL,
  FASHNECT_LINKEDIN_URL,
} from "@/config/seo"
import { WL_EMAIL } from "./waitlist-email-responsive"

export function EmailLogo() {
  return (
    <Section style={logoSection}>
      <Img
        src={FASHNECT_EMAIL_LOGO_URL}
        width={72}
        height={72}
        alt="Fashnect"
        className={WL_EMAIL.logoImg}
        style={logoImg}
      />
    </Section>
  )
}

export function EmailSocialFooter() {
  return (
    <Section className={WL_EMAIL.social} style={socialSection}>
      <Text style={socialHeading}>Follow Fashnect</Text>
      <Text className={WL_EMAIL.socialRow} style={socialRow}>
        <Link href={FASHNECT_INSTAGRAM_URL} style={socialLink}>
          Instagram
        </Link>
        <span style={socialDot}> · </span>
        <Link href={FASHNECT_LINKEDIN_URL} style={socialLink}>
          LinkedIn
        </Link>
      </Text>
    </Section>
  )
}

const logoSection: CSSProperties = {
  textAlign: "center",
  margin: "0 0 4px",
}

const logoImg: CSSProperties = {
  margin: "0 auto",
  display: "block",
}

const socialSection: CSSProperties = {
  textAlign: "center",
  margin: "24px 0 0",
}

const socialHeading: CSSProperties = {
  color: "#86868b",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  margin: "0 0 8px",
}

const socialRow: CSSProperties = {
  color: "#424245",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "0",
}

const socialLink: CSSProperties = {
  color: "#0071e3",
  textDecoration: "underline",
  fontWeight: 500,
}

const socialDot: CSSProperties = {
  color: "#aeaeb2",
  textDecoration: "none",
}
