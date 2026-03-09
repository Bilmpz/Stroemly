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

  const [open, setOpen] = useState(false); // ✅ FIX: mangler i din fil

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    if (!logoRef.current || !badgeRef.current || !titleRef.current || !ctaRef.current || !footerRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const items = [
        logoRef.current,
        badgeRef.current,
        titleRef.current,
        footerRef.current, 
        ctaRef.current,
      ];

      gsap.set(items, { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(items[0], { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(items[1], { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.42")
        .to(items[2], { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.42")
        .to(items[3], { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.42")
        .to(items[4], { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.42");

      tl.set(items, { clearProps: "transform" });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main className="min-h-[90vh] lg:min-h-screen flex flex-col items-center px-6 lg:px-0 overflow-x-hidden">
        <header ref={logoRef} className="pt-16 lg:pt-20">
          <img src="/logo.svg" alt="Strømly logo" className="h-10 lg:h-10 w-auto" />
        </header>

        <section className="flex-1 flex flex-col items-center justify-center text-center">

          <h1
            ref={titleRef}
            className="text-brand font-[350] tracking-tight leading-[110%]
                     text-[36px] sm:text-[44px] lg:text-[70px]
                     max-w-[18ch] sm:max-w-[22ch] lg:max-w-none
                     break-words"
          >
            Vi er i gang med at lade op
          </h1>

<button
  ref={ctaRef}
  onClick={() => setOpen(true)}
  className="cursor-pointer mt-7 lg:mt-10 inline-flex items-center justify-center gap-3
             h-[48px] px-7
             rounded-full
             bg-[#4E4743]
             text-[#E6E6E6]
             text-[15px] sm:text-[16px] font-[400]
             tracking-[0.01em]
             transition-all duration-200
             hover:opacity-90 hover:scale-[1.02]
             active:scale-[0.98]"
>
  <span>Få besked når vi lancerer</span>
  <span className="text-[17px] leading-none">→</span>
</button>
        </section>

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