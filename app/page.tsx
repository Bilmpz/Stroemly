"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

useEffect(() => {
  if (!logoRef.current || !badgeRef.current || !titleRef.current || !footerRef.current) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const ctx = gsap.context(() => {
    const items = [
      logoRef.current,
      badgeRef.current,
      titleRef.current,
      footerRef.current,
    ];

    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15,       // 150ms mellem hver
        ease: "power3.out",  // smooth
        clearProps: "transform", // rydder transform bagefter
      }
    );
  });

  return () => ctx.revert();
}, []);






  return (
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
  );
}
