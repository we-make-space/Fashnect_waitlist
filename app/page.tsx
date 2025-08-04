
import { BackgroundGradientAnimation } from "@/components/background-gradient-animation";
import { TextHoverEffect } from "@/components/text-hover-effect";
import {Button, ButtonGroup} from "@heroui/button";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  
  return (
    <section  className="h-svh  text-white relative overflow-hidden">
 <BackgroundGradientAnimation />
  <div className="absolute inset-0 flex items-center justify-center">
  <Image
    className="w-full h-full max-w-5xl  object-cover"
    src="/image.png" width={500} height={500} alt="Coming Soon"/>
 </div>
 <main className="relative z-20  backdrop-blur-sm backdrop-brightness-50 flex flex-col items-center r w-full h-full">
          {/* Main Content */}
      <div className="relative z-20  flex-1 gap-4 flex items-center flex-col  px-4 py-8">
        {/* Waitlist Badge */}
        <div>
          <Image src="https://swqsltuanmnbnmbyqgaq.supabase.co/storage/v1/object/public/fashnect//Fashnect.PNG" className="w-16 h-16 object-cover rounded-xl" width={100} height={100} alt="Fashnect"/>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-center  bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
          Built with you in mind!
        </h1>

        {/* Glassmorphism Card */}
        <div className="w-full backdrop-blur-lg max-w-2xl mx-auto">
          <div className="  border border-white/20 rounded-3xl p-8 shadow-2xl">
            {/* <h2 className="text-2xl font-semibold text-white text-center mb-3">Join our waitlist!</h2> */}
            {/* <p className="text-white/70 text-center mb-8 leading-relaxed">
              Be the first to know when we launch. Join our waitlist and stay updated with the latest news and exclusive offers.
            </p> */}
<WaitlistForm />

          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 ">
          <a
            href="https://www.instagram.com/fashnect/"
            className="w-12 h-12 bg-white/10  border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <FaInstagram  size={20} />
          </a>
          <a
            href="https://www.linkedin.com/company/fashnect/"
            className="w-12 h-12 bg-white/10  border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <CiLinkedin  size={20} />
          </a>
          {/* <a
            href="#"
            className="w-12 h-12 bg-white/10  border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <Instagram size={20} />
          </a> */}
        </div>
      </div>
  <TextHoverEffect text="FASHNECT" />
</main>
"




    </section>
  );
}
