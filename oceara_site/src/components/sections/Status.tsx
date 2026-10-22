export function Status() {
  return (
    <section data-reveal className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">Where we are</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          Design documented.
          <br />
          Water next.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">
          The initial architecture and engineering requirements are drafted.
          The next stage is technical review, real supplier quotes, assembly and
          a controlled-water test. The physical prototype has not yet been built.
        </p>

        <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-abyss p-8 md:p-12">
            <div className="label text-cyan">Where we are</div>
            <ul className="mt-8 space-y-4 text-lg">
              {[
                "Architecture and engineering requirements drafted",
                "Component-level budget not yet quote-backed",
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
