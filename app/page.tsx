export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/*Start Tekst*/}
      <header className="pt-16">
        <div className="text-brand text-[44px] font-[480] tracking-tight">
          Strømly<span className="align-super text-[12px] ml-1">®</span>
        </div>
      </header>

      {/*Center mini boks*/}
      <section className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center rounded-full border-[0.1px] border-brand-20 px-4 py-0.5">
          <span className="text-brand text-[14px] font-[100]">
            Lancering 2026
          </span>
        </div>

        {/*Main tekst i midten*/}
        <h1 className="mt- 0 text-brand text-[50px] leading-[120%] font-[350] tracking-tight">
          Vi er i gang med at lade op
        </h1>
      </section>

      {/*Slut tekst*/}
      <footer className="pb-8 text-center">
        <p className="text-brand text-[16px] leading-[135%] font-[350]">
          Danmarks nye ladeløsning til dig på farten
          <br />
          eller hjemme. Lad op i ly. Kør grønt
        </p>
      </footer>
    </main>
  );
}
