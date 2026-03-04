"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = { open: boolean; onClose: () => void };

export default function SignupModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;

    setStatus("idle");
    setErrorMsg("");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTimeout(() => inputRef.current?.focus(), 50);

    if (!reduceMotion && overlayRef.current && panelRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 16, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" }
      );
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Kunne ikke sende. Prøv igen.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Netværksfejl. Prøv igen.");
    }
  }

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* overlay */}
      <button
        onClick={onClose}
        aria-label="Luk"
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
      />

      {/* panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-[560px]
                   rounded-3xl border-[0.5px] border-brand-20
                   bg-white/10 backdrop-blur-xl
                   shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-brand text-sm font-[350]">Lancering 2026</p>

              <h2 className="mt-1 text-brand text-2xl sm:text-3xl font-[350] leading-tight">
                Signup med din email
              </h2>

              <p className="mt-2 text-brand/80 text-sm sm:text-base font-[350]">
                Så får du besked, når Strømly går live.
              </p>
            </div>

            <button
              onClick={onClose}
              className="shrink-0 rounded-full border-[0.5px] border-brand-20
                         bg-white/5 px-4 py-2
                         text-brand text-sm font-[350]
                         hover:bg-white/10 transition"
            >
              Luk
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-6">
            <label className="block text-brand text-sm font-[350] mb-2">Email</label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="din@email.dk"
                className="w-full rounded-2xl border-[0.5px] border-brand-20
                           bg-white/5 backdrop-blur-md
                           px-4 py-3 text-brand font-[350]
                           outline-none focus:ring-2 focus:ring-brand/20
                           placeholder:text-brand/40"
                required
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-2xl border-[0.5px] border-brand-20
                           bg-brand/90 text-white
                           px-6 py-3 font-[350]
                           hover:opacity-90 transition
                           disabled:opacity-60"
              >
                {status === "loading" ? "Sender..." : "Send"}
              </button>
            </div>

            <div className="mt-4 min-h-[22px]">
              {status === "success" && (
                <p className="text-brand text-sm font-[350]">Tak! Du er skrevet op ✅</p>
              )}
              {status === "error" && (
                <p className="text-brand text-sm font-[350]">{errorMsg}</p>
              )}
            </div>
          </form>
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="rounded-2xl border-[0.5px] border-brand-20 bg-white/5 p-4">
            <p className="text-brand/80 text-xs sm:text-sm font-[350] leading-relaxed">
              Vi bruger kun din email til at informere om lanceringen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}