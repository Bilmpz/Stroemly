export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 lg:px-0">
      {/* Logo */}
      <header className="pt-16 lg:pt-20">
        <img
          src="/logo.svg"
          alt="Strømly logo"
          className="h-10 lg:h-12 w-auto"
        />
      </header>

      {/* Center */}
      <section className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border-[0.5px] border-brand-20 px-4 py-1 lg:py-[4px] mb-6 lg:mb-8">
          <span className="text-brand text-[13px] lg:text-[14px] font-[350]">
            Lancering 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-brand font-[350] tracking-tight leading-[110%] text-[36px] sm:text-[44px] lg:text-[70px]">
          Vi er i gang med at lade op
        </h1>
      </section>

      {/* Footer */}
      <footer className="pb-12 lg:pb-16 text-center">
        <p className="text-brand font-[350] leading-[125%] text-[14px] sm:text-[16px] lg:text-[18px] max-w-[38ch] lg:max-w-none">
          Danmarks nye ladeløsning til dig på farten
          <br />
          eller hjemme. Lad op i ly. Kør grønt
        </p>
      </footer>
    </main>
  );
}
