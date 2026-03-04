"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SignupModal from "./components/SignupModal";

export default function Home() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!logoRef.current || !badgeRef.current || !titleRef.current || !ctaRef.current || !footerRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Smooth timeline (ikke “trinvis” hårdt)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(logoRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(badgeRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .fromTo(titleRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.35")
        .fromTo(ctaRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65 }, "-=0.35")
        .fromTo(footerRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.35");

      // Ryd transform bagefter
      tl.set([logoRef.current, badgeRef.current, titleRef.current, ctaRef.current, footerRef.current], {
        clearProps: "transform",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main className="min-h-[90vh] lg:min-h-screen flex flex-col items-center px-6 lg:px-0 overflow-x-hidden">
        {/* Logo */}
        <header ref={logoRef} className="pt-16 lg:pt-20">
          <img src="/logo.svg" alt="Strømly logo" className="h-10 lg:h-10 w-auto" />
        </header>

        {/* Center */}
        <section className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center rounded-full border-[0.5px] border-brand-20 px-4 py-1 lg:py-[4px] mb-6 lg:mb-8"
          >
            <span className="text-brand text-[13px] lg:text-[14px] font-[350]">
              Lancering 2026
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="text-brand font-[350] tracking-tight leading-[110%]
                     text-[36px] sm:text-[44px] lg:text-[70px]
                     max-w-[18ch] sm:max-w-[22ch] lg:max-w-none
                     break-words"
          >
            Vi er i gang med at lade op
          </h1>

          {/* CTA (matcher badge-stil + premium feel) */}
          <button
            ref={ctaRef}
            onClick={() => setOpen(true)}
            className="mt-7 lg:mt-10 w-full max-w-[520px]
                       rounded-2xl border-[0.5px] border-brand-20
                       bg-white/10 backdrop-blur-md
                       px-6 py-4
                       text-brand font-[350] text-[15px] sm:text-[16px]
                       hover:bg-white/15 transition
                       focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            Signup til Lancering 2026
          </button>
        </section>

        {/* Footer */}
        <footer ref={footerRef} className="pb-12 lg:pb-16 text-center">
          <p className="text-brand font-[350] leading-[125%]
                        text-[14px] sm:text-[16px] lg:text-[18px] max-w-[38ch] lg:max-w-none">
            Danmarks nye ladeløsning til dig på farten
            <br />
            eller hjemme. Lad op i ly. Kør grønt
          </p>
        </footer>
      </main>

      <SignupModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}