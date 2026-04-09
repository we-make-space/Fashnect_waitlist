"use client"

import { motion } from "framer-motion"
import { WhatsAppIcon, whatsappColors } from "@/components/icons/whatsapp-icon"
import type { SuccessModalRole } from "@/components/SuccessModal"

export interface WaitlistThankYouProps {
  role: SuccessModalRole
  joinUrl: string
}

export function WaitlistThankYou({ role, joinUrl }: WaitlistThankYouProps) {
  const isSeller = role === "seller"
  const communityLabel = isSeller ? "Open seller community" : "Open your community"

  return (
    <motion.div
      className="w-full text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
        style={{
          backgroundColor: whatsappColors.green,
          boxShadow: `0 12px 40px ${whatsappColors.green}55`,
        }}
      >
        <WhatsAppIcon className="h-8 w-8 text-white" />
      </div>

      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#25D366]">You&apos;re in</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">Thank you</h2>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/80">
        You&apos;re on the Fashnect waitlist. Watch for a message from the <span className="text-white">Fashnect team</span>
        —we&apos;ll share launch timing, early access, and what happens next.
      </p>
      <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
        Your WhatsApp group is where things move fastest. Jump in, stay active, and join the conversation—that&apos;s how
        you stay ahead of the crowd and catch updates before they go wide.
      </p>

      <div className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <a
        href={joinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-full px-6 py-4 min-h-12 text-[15px] font-semibold text-white shadow-xl transition hover:brightness-105 sm:w-auto touch-manipulation"
        style={{ backgroundColor: whatsappColors.green, boxShadow: `0 8px 28px ${whatsappColors.green}66` }}
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0 text-white" />
        {communityLabel}
      </a>

      <p className="mt-6 text-xs leading-relaxed text-white/45">
        Check your inbox too—your welcome note may take a minute to arrive.
      </p>
    </motion.div>
  )
}
