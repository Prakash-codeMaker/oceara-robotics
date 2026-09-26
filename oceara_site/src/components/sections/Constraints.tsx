import { useState } from "react";

const MODULES = [
  {
    n: "01",
    title: "No GPS",
    body: "Underwater systems cannot rely on ordinary GPS positioning. Mission localization must combine suitable inertial, acoustic, optical, depth, and/or terrain-relative techniques depending on the environment.",
  },
  {
    n: "02",
    title: "Limited communication",
    body: "Radio drops at the surface. Below it, the vehicle uses acoustic communication, local autonomy, and store-and-forward mission data.",
  },
  {
    n: "03",
    title: "Visibility",
    body: "Clear water becomes turbid without warning. Camera views fail. Acoustic imaging has to carry the scene.",
  },
  {
    n: "04",
    title: "Physics",
    body: "Pressure, buoyancy, current, energy, corrosion, and sealing are not edge cases. They are the operating environment.",
  },
];

export function Constraints() {
  const [vis, setVis] = useState<"clear" | "turbid">("clear");

  return (
    <section data-reveal className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">04 — Constraints</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          The medium is the problem.
        </h2>
        <p className="mt-6 max-w-2xl text-mist">
          Underwater robotics is not aerial robotics with different paint. The
          physics, sensing, and communications stack has to be rebuilt for water.
        </p>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          <article className="border border-white/10 p-6 md:p-8">
            <Header n="01" title="No GPS" />
            <p className="mt-4 text-sm leading-relaxed text-mist">{MODULES[0].body}</p>
            <div className="mt-8 grid-bg relative h-48 overflow-hidden border border-white/10">
              <div className="absolute top-4 left-6 font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
                Surface — GNSS available
              </div>
              <div className="absolute top-1/2 right-0 left-0 h-px bg-cyan/40" />
              <div className="absolute top-[52%] left-6 font-mono text-[10px] tracking-[0.18em] text-amber uppercase">
                Subsurface — GNSS denied
              </div>
              <div className="absolute top-[18%] left-1/2 flex -translate-x-1/2 gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-6 w-px bg-cyan"
                    style={{ opacity: 1 - i * 0.12, height: 10 + i * 3 }}
                  />
                ))}
              </div>
              <div className="absolute bottom-8 left-1/2 h-4 w-16 -translate-x-1/2 rounded-sm bg-foam/80" />
              <div className="absolute bottom-6 left-1/2 font-mono text-[9px] tracking-[0.16em] text-mist uppercase">
                Local nav
              </div>
            </div>
          </article>

          <article className="border border-white/10 p-6 md:p-8">
            <Header n="02" title="Limited communication" />
            <p className="mt-4 text-sm leading-relaxed text-mist">{MODULES[1].body}</p>
            <div className="mt-8 flex h-48 items-center justify-between gap-4 border border-white/10 px-6">
              <div className="text-center">
                <div className="mx-auto mb-2 h-10 w-16 border border-white/20 bg-abyss-4" />
                <div className="font-mono text-[9px] tracking-[0.16em] text-mist uppercase">
                  Robot
                </div>
              </div>
              <div className="flex-1">
                <div className="text-center font-mono text-[9px] tracking-[0.2em] text-slate-sea uppercase">
                  RF unavailable
                </div>
                <div className="my-2 h-px w-full bg-white/10" />
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-cyan/70"
                      style={{
                        animation: "blink 1.6s infinite",
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-center font-mono text-[9px] tracking-[0.2em] text-cyan uppercase">
                  Acoustic + autonomy + store-forward
                </div>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 h-10 w-10 rounded-full border border-cyan/40" />
                <div className="font-mono text-[9px] tracking-[0.16em] text-mist uppercase">
                  Surface
                </div>
              </div>
            </div>
          </article>

          <article className="border border-white/10 p-6 md:p-8">
            <Header n="03" title="Visibility" />
            <p className="mt-4 text-sm leading-relaxed text-mist">{MODULES[2].body}</p>
            <div className="mt-8">
              <div className="mb-3 flex gap-2">
                <button
                  onClick={() => setVis("clear")}
                  className={`font-mono text-[10px] tracking-[0.18em] uppercase ${vis === "clear" ? "text-cyan" : "text-slate-sea"}`}
                >
                  Clear water
                </button>
                <span className="text-slate-sea">/</span>
                <button
                  onClick={() => setVis("turbid")}
                  className={`font-mono text-[10px] tracking-[0.18em] uppercase ${vis === "turbid" ? "text-cyan" : "text-slate-sea"}`}
                >
                  Turbid water
                </button>
              </div>
              <div className="relative h-48 overflow-hidden border border-white/10">
                <img
                  src="/images/optical-view.jpg"
                  alt="Optical camera concept"
                  className="h-full w-full object-cover"
                  style={{
                    filter:
                      vis === "turbid"
                        ? "blur(6px) saturate(0.4) brightness(0.55)"
                        : "none",
                    transition: "filter 0.6s ease",
                  }}
                />
                {vis === "turbid" && (
                  <img
                    src="/images/sonar-abstract.jpg"
                    alt="Sonar concept"
                    className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-80"
                  />
                )}
                <div className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.18em] text-foam uppercase">
                  {vis === "clear" ? "Camera primary" : "Sonar primary"}
                </div>
              </div>
            </div>
          </article>

          <article className="border border-white/10 p-6 md:p-8">
            <Header n="04" title="Physics" />
            <p className="mt-4 text-sm leading-relaxed text-mist">{MODULES[3].body}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "Pressure",
                "Buoyancy",
                "Currents",
                "Energy",
                "Corrosion",
                "Sealing",
              ].map((k, i) => (
                <div key={k} className="border border-white/10 p-3">
                  <div className="label">{k}</div>
                  <div className="mt-3 h-1 bg-white/10">
                    <div
                      className="h-1 bg-cyan"
                      style={{
                        width: `${40 + ((i * 17) % 50)}%`,
                        animation: "caustic 4s linear infinite",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Header({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h3 className="font-display text-3xl tracking-tight md:text-4xl">{title}</h3>
      <span className="font-mono text-[10px] tracking-[0.22em] text-cyan">{n}</span>
    </div>
  );
}
