"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SignupModal({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Åbn animation + fokus
  useEffect(() => {
    if (!open) return;

    setStatus("idle");
    setErrorMsg("");

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // lås scroll bag modal
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // fokus input
    setTimeout(() => inputRef.current?.focus(), 30);

    if (!reduceMotion && overlayRef.current && panelRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" }
      );
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, reduceMotion]);

  // Luk animation (valgfri) – vi holder det simpelt: parent lukker bare.
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
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <button
        onClick={onClose}
        aria-label="Luk"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      {/* panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-[520px] rounded-2xl border border-brand-20 bg-white/85 backdrop-blur-xl shadow-xl"
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
              className="shrink-0 rounded-full border border-brand-20 px-3 py-1 text-brand text-sm font-[350] hover:bg-white/60 transition"
            >
              Luk
            </button>
          </div>

          <form onSubmit={onSubmit} className="mt-6">
            <label className="block text-brand text-sm font-[350] mb-2">
              Email
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                ref={inputRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="din@email.dk"
                className="w-full rounded-xl border border-brand-20 bg-white/70 px-4 py-3 text-brand font-[350] outline-none focus:ring-2 focus:ring-brand/20"
                required
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-xl border border-brand-20 bg-brand text-white px-5 py-3 font-[350] hover:opacity-90 transition disabled:opacity-60"
              >
                {status === "loading" ? "Sender..." : "Send"}
              </button>
            </div>

            {/* status */}
            <div className="mt-4 min-h-[22px]">
              {status === "success" && (
                <p className="text-brand text-sm font-[350]">
                  Tak! Du er skrevet op ✅
                </p>
              )}
              {status === "error" && (
                <p className="text-brand text-sm font-[350]">
                  {errorMsg}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="rounded-xl border border-brand-20 bg-white/60 p-4">
            <p className="text-brand/80 text-xs sm:text-sm font-[350] leading-relaxed">
              Vi bruger kun din email til at informere om lanceringen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}