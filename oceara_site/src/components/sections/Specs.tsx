const SPECS = [
  { k: "Depth rating", v: "Target", n: "Prototype specification" },
  { k: "Endurance", v: "Target", n: "Design goal" },
  { k: "Payload", v: "Modular", n: "Prototype target" },
  { k: "Navigation", v: "Multimodal", n: "Architecture ready" },
  { k: "Perception", v: "Optical + acoustic", n: "Architecture ready" },
  { k: "Communication", v: "Acoustic + surface link", n: "Design goal" },
  { k: "Compute", v: "Onboard", n: "Prototype target" },
  { k: "Mass / envelope", v: "TBD", n: "Not yet validated" },
];

export function Specs() {
  return (
    <section data-reveal className="relative bg-abyss-2 py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="label text-cyan">Hardware</div>
            <h2 className="headline mt-6 text-5xl md:text-7xl">
              Prototype targets.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-mist">
            Numbers come after water. Until the first physical prototype is built
            and tested, specifications remain targets — not claims.
          </p>
        </div>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {SPECS.map((s) => (
            <div
              key={s.k}
              className="grid grid-cols-12 items-baseline gap-4 py-5"
            >
              <div className="col-span-12 font-mono text-[10px] tracking-[0.2em] text-slate-sea uppercase sm:col-span-4">
                {s.k}
              </div>
              <div className="font-display col-span-7 text-2xl tracking-tight md:col-span-5 md:text-3xl">
                {s.v}
              </div>
              <div className="col-span-5 text-right font-mono text-[10px] tracking-[0.16em] text-amber uppercase md:col-span-3">
                {s.n}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
