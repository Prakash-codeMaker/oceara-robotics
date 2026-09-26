export function Status() {
  return (
    <section data-reveal className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">Where we are</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          Architecture ready.
          <br />
          Water next.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">
          This is the exact transition from architecture to physical execution.
          Not a weakness. A stage.
        </p>

        <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-abyss p-8 md:p-12">
            <div className="label text-cyan">Where we are</div>
            <ul className="mt-8 space-y-4 text-lg">
              {[
                "Architecture ready",
                "First-version robot design complete",
                "Pre-prototype",
                "Pre-pilot",
                "Pre-incorporation",
              ].map((i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="h-px w-8 bg-cyan/50" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-abyss p-8 md:p-12">
            <div className="label text-amber">What we need</div>
            <ul className="mt-8 space-y-4 text-lg">
              {[
                "Hardware",
                "Robotics engineering",
                "Capital",
                "Research access",
                "Testing environments",
                "Early deployment partners",
              ].map((i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="h-px w-8 bg-amber/50" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
