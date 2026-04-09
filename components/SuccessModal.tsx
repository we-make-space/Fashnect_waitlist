"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import {
  WhatsAppIcon,
  whatsappColors,
  whatsappCtaBackground,
  whatsappCtaBoxShadow,
} from "@/components/icons/whatsapp-icon"

export type SuccessModalRole = "seller" | "buyer"

export interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  role: SuccessModalRole
  joinUrl: string
}

export function SuccessModal({ isOpen, onClose, role, joinUrl }: SuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  const isSeller = role === "seller"
  const title = "You're on the list"
  const subtitle = isSeller
    ? "Grow your fashion business with Fashnect—your community is waiting on WhatsApp."
    : "Discover fashion on Fashnect—connect with your people on WhatsApp."
  const ctaLabel = isSeller ? "Join seller community" : "Join on WhatsApp"

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#075E54]/35 backdrop-blur-md"
            aria-label="Close dialog"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-[420px] overflow-hidden rounded-3xl border text-left text-neutral-900 shadow-2xl"
            style={{
              borderColor: `${whatsappColors.green}55`,
              background: "linear-gradient(165deg, rgba(255,255,255,0.97) 0%, rgba(248,255,252,0.96) 50%, rgba(255,255,255,0.94) 100%)",
              boxShadow: `0 25px 80px -12px rgba(7, 94, 84, 0.35), 0 0 0 1px rgba(37, 211, 102, 0.12)`,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{
                background: `linear-gradient(90deg, ${whatsappColors.deep}, ${whatsappColors.green}, ${whatsappColors.teal})`,
              }}
            />
            <div className="px-5 pb-8 pt-9 sm:px-8 sm:pb-9 sm:pt-10">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-md"
                  style={{
                    backgroundColor: whatsappColors.green,
                    boxShadow: `0 8px 24px ${whatsappColors.green}55`,
                  }}
                >
                  <WhatsAppIcon className="h-8 w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#128C7E]">Fashnect × WhatsApp</p>
                  <h2 id="success-modal-title" className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-900">
                    {title}{" "}
                    <span aria-hidden className="inline-block">
                      🎉
                    </span>
                  </h2>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">{subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                Check your email for early access and updates—we&apos;ll be in touch from there too.
              </p>

              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 min-h-12 text-[15px] font-semibold text-white transition hover:brightness-105 touch-manipulation"
                style={{
                  backgroundColor: whatsappColors.green,
                  boxShadow: `0 10px 32px ${whatsappColors.green}55`,
                }}
              >
                <WhatsAppIcon className="h-5 w-5 text-white" />
                {ctaLabel}
              </a>

              <button
                type="button"
                onClick={onClose}
                className="mt-5 w-full rounded-full border border-neutral-200/90 bg-white/60 py-3.5 min-h-12 text-sm font-medium text-neutral-600 transition hover:border-neutral-300 hover:bg-white touch-manipulation"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
