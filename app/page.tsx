export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">

      {/* Logo */}
      <header className="pt-20">
        <img
          src="/logo.svg"
          alt="Strømly logo"
          className="h-12 w-auto"
        />
      </header>

      {/* Center */}
      <section className="flex-1 flex flex-col items-center justify-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center rounded-full border-[0.5px] border-brand-20 px-4 py-[2px] mb-8">
          <span className="text-brand text-[14px] font-[350]">
            Lancering 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-brand text-[70px] leading-[110%] font-[350] tracking-tight">
          Vi er i gang med at lade op
        </h1>
      </section>

      {/* Footer */}
      <footer className="pb-16 text-center">
        <p className="text-brand text-[18px] leading-[125%] font-[350]">
          Danmarks nye ladeløsning til dig på farten
          <br />
          eller hjemme. Lad op i ly. Kør grønt
        </p>
      </footer>

    </main>
  );
}
