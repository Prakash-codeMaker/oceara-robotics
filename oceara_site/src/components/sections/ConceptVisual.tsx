const CONCEPT_IMAGE =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_39gwItpPF5f81c47VHif1zmAIQE/14d81ed6-1ae5-4425-9870-e811fde58e0d.webp";

export function ConceptVisual() {
  return (
    <section
      data-reveal
      id="visual-study"
      className="relative overflow-hidden border-y border-white/10 bg-abyss-2 py-20 md:py-28"
      aria-labelledby="concept-visual-title"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <div className="absolute -right-24 top-0 h-[380px] w-[380px] rounded-full bg-cyan/5 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-[1480px] items-center gap-8 px-5 md:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="label text-cyan">O-01 / Visual study</div>
          <h2 id="concept-visual-title" className="headline mt-5 text-4xl md:text-5xl">
            The ambition,
            <br />
            made visible.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-mist">
            An original AI-generated visual of a possible tethered underwater
            vehicle. It helps explain the direction of O-01; it is not final CAD,
            a built prototype, or real field footage.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="border border-cyan/25 bg-cyan/[0.05] px-3 py-2 font-mono text-[9px] tracking-[0.1em] text-cyan uppercase">Concept art</span>
            <span className="border border-white/10 px-3 py-2 font-mono text-[9px] tracking-[0.1em] text-mist uppercase">Prototype not built</span>
          </div>
          <a href="#roadmap" className="mt-7 inline-flex items-center gap-3 border-b border-cyan/40 pb-2 font-mono text-[10px] tracking-[0.1em] text-cyan uppercase transition-colors hover:border-cyan hover:text-foam">
            See the first-test plan <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="group min-w-0 lg:col-span-8">
          <div className="media-frame glass-edge relative aspect-video overflow-hidden border border-cyan/20 bg-abyss">
            <img
              src={CONCEPT_IMAGE}
              alt="AI-generated illustration of a tethered underwater robot exploring a debris-strewn seabed. It is conceptual artwork, not a photograph of Oceara hardware."
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2 md:bottom-5 md:left-5">
              <span className="border border-cyan/35 bg-abyss/85 px-3 py-2 font-mono text-[9px] tracking-[0.1em] text-cyan uppercase backdrop-blur">AI-generated / not hardware</span>
              <span className="bg-abyss/75 px-2 py-2 font-mono text-[9px] tracking-[0.08em] text-foam/80 uppercase backdrop-blur">O-01 visual direction</span>
            </div>
          </div>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[8px] tracking-[0.08em] text-slate-sea uppercase">
            <span>Design concept / not final CAD</span>
            <span>No performance or depth rating implied</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
