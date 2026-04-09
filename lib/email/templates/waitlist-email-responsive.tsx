import { Head } from "@react-email/components"

/** Class names for `@media` overrides — many email clients honor these on mobile. */
export const WL_EMAIL = {
  container: "wl-email-container",
  card: "wl-email-card",
  h1: "wl-email-h1",
  text: "wl-email-text",
  muted: "wl-email-muted",
  cta: "wl-email-cta",
  logoImg: "wl-email-logo-img",
  social: "wl-email-social",
  socialRow: "wl-email-social-row",
} as const

const mobileCss = `
@media only screen and (max-width: 600px) {
  .wl-email-container { padding: 24px 12px !important; }
  .wl-email-card { padding: 24px 16px !important; border-radius: 14px !important; }
  .wl-email-h1 { font-size: 22px !important; line-height: 28px !important; margin: 0 0 16px !important; }
  .wl-email-text { font-size: 16px !important; line-height: 24px !important; }
  .wl-email-muted { font-size: 14px !important; line-height: 21px !important; }
  .wl-email-cta {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    text-align: center !important;
    padding: 16px 20px !important;
    min-height: 48px !important;
    line-height: 1.35 !important;
  }
  .wl-email-logo-img { width: 64px !important; height: 64px !important; }
  .wl-email-social-row { font-size: 14px !important; line-height: 20px !important; }
}
`.trim()

export function WaitlistEmailResponsiveHead() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <style>{mobileCss}</style>
    </Head>
  )
}
