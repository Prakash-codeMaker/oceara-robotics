export function Thesis() {
  return (
    <section data-reveal id="platform" className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">02 — Thesis</div>
        <h2 className="headline mt-6 max-w-5xl text-[12vw] text-foam sm:text-7xl md:text-8xl">
          The ocean is enormous.
          <br />
          Our access to it isn’t.
        </h2>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-mist">
          Underwater environments are difficult to access repeatedly and safely.
          We want to build robotic systems that can stay in the environment
          longer, gather persistent spatial data, and turn high-level mission
          goals into physical action.
        </p>

        <div className="mt-20 grid gap-px bg-white/10 md:grid-cols-3">
          <Statement
            n="01"
            title="Explore"
            body="Map unknown environments and build repeatable mission records."
          />
          <Statement
            n="02"
            title="Understand"
            body="Combine multimodal perception with spatial memory to detect and reason about change."
          />
          <Statement
            n="03"
            title="Act"
            body="Move toward inspection, sampling, retrieval, and marine-debris recovery."
          />
        </div>

        <p className="mt-12 max-w-xl font-mono text-[11px] tracking-[0.16em] text-slate-sea uppercase">
          One robot. Many missions. Start with a job. Build a platform.
        </p>
      </div>
    </section>
  );
}

function Statement({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <article className="group bg-abyss p-8 md:p-10">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.22em] text-cyan">
          {n}
        </span>
        <span className="h-px w-12 bg-cyan/30 transition-all group-hover:w-20" />
      </div>
      <h3 className="font-display mt-10 text-4xl tracking-tight md:text-5xl">
        {title}
      </h3>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mist">{body}</p>
    </article>
  );
}
