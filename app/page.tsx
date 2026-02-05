export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      
      {/* Logo */}
      <header className="pt-14">
        <div className="text-brand text-[44px] font-[450] tracking-tight">
          Strømly<span className="align-super text-[12px] ml-1">®</span>
        </div>
      </header>

      {/* Center */}
      <section className="flex-1 flex flex-col items-center justify-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center rounded-full border-[0.5px] border-brand-20 px-4 py-[2px] mb-12">
          <span className="text-brand text-[13px] font-[350]">
            Lancering 2026
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-brand text-[70px] leading-[110%] font-[350] tracking-tight">
          Vi er i gang med at lade op
        </h1>
      </section>

      {/* Footer */}
      <footer className="pb-14 text-center">
        <p className="text-brand text-[20px] leading-[125%] font-[350]">
          Danmarks nye ladeløsning til dig på farten
          <br />
          eller hjemme. Lad op i ly. Kør grønt
        </p>
      </footer>
    </main>
  );
}
