const STEPS = [
  { n: "01", title: "Architecture", status: "Complete", tone: "cyan" },
  { n: "02", title: "First physical prototype", status: "Next", tone: "amber" },
  { n: "03", title: "Bench + pressure + propulsion testing", status: "Next", tone: "amber" },
  { n: "04", title: "Controlled water testing", status: "Validate", tone: "mist" },
  { n: "05", title: "Autonomous mission tests", status: "Validate", tone: "mist" },
  { n: "06", title: "First external field deployment", status: "Future", tone: "mist" },
  { n: "07", title: "Multi-mission platform", status: "Long term", tone: "mist" },
];

export function Roadmap() {
  return (
    <section data-reveal id="roadmap" className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">12 — Roadmap</div>
        <h2 className="headline mt-6 text-5xl md:text-7xl">
          From architecture to water.
        </h2>
        <p className="mt-6 max-w-xl text-mist">
          Early stage / pre-pilot. We are at the transition from design to
          physical execution.
        </p>

        <ol className="mt-16">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="grid grid-cols-12 items-center gap-4 border-t border-white/10 py-8 last:border-b"
            >
              <div className="col-span-2 font-mono text-[11px] tracking-[0.2em] text-cyan md:col-span-1">
                {s.n}
              </div>
              <div className="font-display col-span-10 text-2xl tracking-tight md:col-span-7 md:text-4xl">
                {s.title}
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <span
                  className={`inline-flex border px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase ${
                    s.tone === "cyan"
                      ? "border-cyan/40 text-cyan"
                      : s.tone === "amber"
                        ? "border-amber/40 text-amber"
                        : "border-white/15 text-mist"
                  }`}
                >
                  {s.status}
                </span>
              </div>
              {i === 0 && (
                <p className="col-span-12 text-sm text-mist md:col-start-2">
                  Product vision, technical architecture, and first-version robot
                  design are ready.
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
