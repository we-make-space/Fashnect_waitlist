import { BackgroundGradientAnimation } from "@/components/background-gradient-animation";
import { TextHoverEffect } from "@/components/text-hover-effect";
import { HomeWaitlistHero } from "@/components/HomeWaitlistHero";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

export default function Home() {
  return (
    <section
      className={`
        text-white relative overflow-x-hidden
        min-h-svh min-h-dvh overflow-y-auto
        lg:min-h-0
      `}
    >
      <BackgroundGradientAnimation />
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <Image
          className="w-full h-full max-w-5xl object-cover"
          src="https://ebzpkkgbkxaixjjjjlkl.supabase.co/storage/v1/object/public/FASHNECT/image.png"
          width={500}
          height={500}
          alt=""
          role="presentation"
          priority
          loading="eager"
        />
      </div>
      <main
        className={`
          relative z-20 backdrop-blur-sm backdrop-brightness-50 flex flex-col items-center w-full
          min-h-svh min-h-dvh
          lg:min-h-0
        `}
      >
        <div
          className={`
            relative z-20 flex flex-1 flex-col items-center justify-center gap-4
            px-4 py-6 sm:py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]
            w-full max-w-[100vw] min-h-0
            lg:flex-none lg:justify-start lg:gap-6 lg:py-10 lg:pb-12
          `}
        >
          <HomeWaitlistHero />

          <div className="flex items-center justify-center gap-4 sm:gap-6 shrink-0 lg:gap-4">
            <a
              href="https://www.instagram.com/fashnect/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fashnect on Instagram"
              className="min-h-12 min-w-12 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 touch-manipulation"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/fashnect/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fashnect on LinkedIn"
              className="min-h-12 min-w-12 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 touch-manipulation"
            >
              <CiLinkedin size={20} />
            </a>
          </div>
        </div>
        <div className="shrink-0 w-full max-w-[min(100%,72rem)] mx-auto px-2 sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1">
          <TextHoverEffect text="FASHNECT" />
        </div>
      </main>
    </section>
  );
}
