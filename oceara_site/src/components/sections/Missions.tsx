const PIPELINE = [
  "DETECT",
  "CLASSIFY",
  "LOCALIZE",
  "APPROACH",
  "VERIFY",
  "RECOVER",
];

export function Missions() {
  return (
    <section data-reveal id="missions" className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">08 — Missions</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          One robot.
          <br />
          Many missions.
        </h2>
        <p className="mt-6 max-w-2xl text-mist">
          Oceara is an autonomous underwater robotics platform. Debris recovery
          is one job. The larger system is built to explore, understand, inspect,
          and eventually act.
        </p>

        <article className="mt-20 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="label text-cyan">Ocean discovery</div>
            <h3 className="headline mt-4 text-4xl md:text-6xl">
              Explore what humans cannot easily reach.
            </h3>
            <ul className="mt-8 space-y-2 font-mono text-[11px] tracking-[0.14em] text-mist uppercase">
              {[
                "Autonomous mapping",
                "Exploration",
                "Bathymetric data",
                "Sonar",
                "Optical imaging",
                "Mission recording",
                "Spatial memory",
              ].map((c) => (
                <li key={c} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-cyan/50" />
                  {c}
                </li>
              ))}
            </ul>
            <a href="#simulator" className="btn-ghost mt-8">
              Discover the mission
            </a>
          </div>
          <div className="relative min-h-[320px] overflow-hidden border border-white/10">
            <img
              src="/images/map-bathy.jpg"
              alt="Bathymetric map concept"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 label text-cyan">
              3D seabed map · sonar sweep · robot route · concept
            </div>
          </div>
        </article>

        <article className="mt-24 grid items-center gap-10 lg:grid-cols-2">
          <div className="relative order-2 min-h-[320px] overflow-hidden border border-white/10 lg:order-1">
            <img
              src="/images/seabed.jpg"
              alt="Seabed research concept"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent" />
            <div className="absolute bottom-4 left-4 label">
              Repeatable observations · concept
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="label text-cyan">Marine research</div>
            <h3 className="headline mt-4 text-4xl md:text-6xl">
              A robotic field instrument for the ocean.
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Environmental surveys",
                "Repeatable observations",
                "Water-quality sensing",
                "Benthic imagery",
                "Scientific sampling",
                "Long-duration missions",
              ].map((u) => (
                <div
                  key={u}
                  className="border border-white/10 px-3 py-3 font-mono text-[11px] tracking-[0.08em] text-mist"
                >
                  {u}
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10px] tracking-[0.16em] text-amber uppercase">
              Sampling and manipulation are a development direction — not a
              completed capability.
            </p>
          </div>
        </article>

        <article className="mt-24">
          <div className="label text-cyan">Marine debris</div>
          <h3 className="headline mt-4 max-w-4xl text-4xl md:text-6xl">
            Find it. Locate it.
            <br />
            Understand it. Recover it.
          </h3>
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="relative min-h-[280px] overflow-hidden border border-white/10 lg:col-span-5">
              <img
                src="/images/debris.jpg"
                alt="Marine debris concept"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="lg:col-span-7">
              <ol className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">
                {PIPELINE.map((s, i) => (
                  <li key={s} className="bg-abyss p-5">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-cyan">
                      0{i + 1}
                    </div>
                    <div className="font-display mt-3 text-xl tracking-tight">
                      {s}
                    </div>
                    {s === "RECOVER" && (
                      <div className="mt-3 font-mono text-[9px] tracking-[0.14em] text-amber uppercase">
                        Future capability / prototype target
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-mist">
                O-01 is not a debris collector. Detection, classification, and
                localization come first. Recovery is a later physical capability
                we intend to develop — not a claim about the current robot.
              </p>
            </div>
          </div>
        </article>

        <article className="mt-24 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="label text-cyan">Subsea inspection</div>
            <h3 className="headline mt-4 text-4xl md:text-6xl">
              Turn underwater access into data.
            </h3>
            <p className="mt-6 text-mist">
              Ports, dams, submerged structures, offshore infrastructure,
              aquaculture, underwater assets. The product is not a dive. It is a
              repeatable inspection record.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Robot",
                "Sensor data",
                "Spatial map",
                "Inspection report",
              ].map((t) => (
                <span
                  key={t}
                  className="border border-white/15 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-mist uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden border border-white/10">
            <img
              src="/images/structure.jpg"
              alt="Submerged structure inspection concept"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent" />
            <div className="absolute right-4 bottom-4 left-4 grid grid-cols-3 gap-2">
              {["Hull", "Anomaly", "Map"].map((k) => (
                <div key={k} className="panel px-3 py-2 font-mono text-[10px] tracking-[0.14em] uppercase">
                  {k}
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
