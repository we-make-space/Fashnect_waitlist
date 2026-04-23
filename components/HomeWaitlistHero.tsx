"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { WaitlistForm } from "@/components/WaitlistForm"
import { TextHoverEffect } from "@/components/text-hover-effect"

export function HomeWaitlistHero() {
  const [waitlistComplete, setWaitlistComplete] = useState(false)

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 lg:gap-2 w-full min-w-0 min-h-0">
      <div className="shrink-0">
        <Image
          src="/fashnect.svg"
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl"
          width={64}
          height={64}
          alt="Fashnect"
          priority
        />
      </div>

      <div className="w-full max-w-4xl min-h-[7.5rem] sm:min-h-[8.5rem] lg:min-h-0 min-w-0 px-1 shrink-0">
        <AnimatePresence mode="wait">
          {!waitlistComplete ? (
            <motion.h1
              key="pre-signup"
              className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent leading-[1.15] sm:leading-tight"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Join the Fashnect waitlist
              <span className="mt-2 sm:mt-3 block text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/85 bg-clip-text text-transparent leading-snug">
                Built with you in mind — early access to social fashion commerce.
              </span>
            </motion.h1>
          ) : (
            <motion.h1
              key="post-signup"
              className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent leading-[1.15] sm:leading-tight"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              You&apos;re on the Fashnect waitlist
              <span className="mt-2 sm:mt-3 block text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/85 bg-clip-text text-transparent leading-snug">
                Thanks for signing up—next steps are in the card below, and our team will be in touch soon.
              </span>
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center w-full min-w-0 gap-0">
        <div className="w-full min-w-0 backdrop-blur-lg max-w-2xl mx-auto shrink min-h-0">
          <div className="border border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-5 xl:p-6 shadow-2xl">
            <WaitlistForm onThankYouView={() => setWaitlistComplete(true)} />
          </div>
        </div>
        <div className="shrink-0 w-full max-w-[min(100%,72rem)] mx-auto px-2 sm:px-4 -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5">
          <TextHoverEffect text="FASHNECT" />
        </div>
      </div>
    </div>
  )
}
