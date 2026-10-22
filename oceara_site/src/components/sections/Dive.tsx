import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    depth: "SURFACE",
    meters: "0 m",
    title: "Mission planning",
    copy: "Goals are set in language and geometry. The vehicle is still in a world with GPS, radio, and light.",
    why: "This is the last easy layer.",
  },
  {
    depth: "10 M",
    meters: "10 m",
    title: "Optical perception",
    copy: "Cameras still work. Color shifts. Light falls off. Particles begin to scatter the image.",
    why: "Vision is useful — until it isn’t.",
  },
  {
    depth: "25 M",
    meters: "25 m",
    title: "Localization becomes harder",
    copy: "Surface GPS is gone. Drift starts. The robot must hold a local frame from inertial, depth, and whatever the environment still offers.",
    why: "Position is now an estimate.",
  },
  {
    depth: "50 M",
    meters: "50 m",
    title: "Acoustic sensing takes over",
    copy: "Visibility collapses in many waters. Imaging sonar becomes the primary way to see structure, objects, and terrain.",
    why: "Sound travels where light does not.",
  },
  {
    depth: "100 M",
    meters: "100 m",
    title: "Communication is constrained",
    copy: "Radio is unavailable. Acoustic bandwidth is thin and slow. Most of the work has to happen on the vehicle.",
    why: "You cannot joystick the ocean.",
  },
  {
    depth: "200 M+",
    meters: "200 m+",
    title: "Autonomy becomes essential",
    copy: "Pressure, energy, current, and uncertainty compound. The robot reaches the seabed and must act with what it has onboard.",
    why: "This is why we are building a platform.",
  },
];

export function Dive() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setP(self.progress),
    });
    return () => st.kill();
  }, []);

  const idx = Math.min(STAGES.length - 1, Math.floor(p * 0.999 * STAGES.length));
  const stage = STAGES[idx];
  const dark = 0.2 + p * 0.75;

  if (reduced) {
    return (
      <section className="bg-abyss-2 py-24">
        <div className="mx-auto max-w-[1480px] px-5 md:px-8">
          <div className="label text-cyan">03 / The underwater environment</div>
          <h2 className="headline mt-6 text-5xl md:text-7xl">Why depth is hard.</h2>
          <p className="mt-5 max-w-2xl border-l border-amber/60 pl-4 text-sm leading-relaxed text-mist">
            Environmental narrative only. These example depths describe changing underwater conditions, not O-01’s depth rating or tested operating range.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((s) => (
              <article key={s.depth} className="border border-white/10 p-6">
                <div className="label text-cyan">{s.depth}</div>
                <h3 className="font-display mt-4 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{s.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative h-[520vh] bg-abyss">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(40,90,95,${0.28 - p * 0.22}) 0%, rgba(4,7,10,${dark}) 55%, #04070a 100%)`,
          }}
        />
        <img
          src="/images/deep-ocean.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-lighten"
          style={{ opacity: 0.18 + p * 0.12 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-transparent to-abyss" />

        {/* sinking robot */}
        <img
          src="/images/o01-side.jpg"
          alt=""
          className="pointer-events-none absolute left-1/2 w-[min(72vw,640px)] -translate-x-1/2 object-contain opacity-80"
          style={{
            top: `${12 + p * 52}%`,
            filter: `brightness(${1 - p * 0.45}) saturate(${1 - p * 0.3})`,
          }}
        />

        {/* sonar rings appear deeper */}
        <div
          className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: Math.max(0, p - 0.45) * 1.6 }}
        >
          <div className="sonar-ring absolute inset-0" />
          <div className="sonar-ring absolute inset-8" style={{ animationDelay: "1.2s" }} />
          <div className="sonar-ring absolute inset-16" style={{ animationDelay: "2.2s" }} />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1480px] flex-col justify-between px-5 py-24 md:px-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="label text-cyan">03 / The underwater environment</div>
              <div className="mt-3 font-mono text-[10px] tracking-[0.22em] text-mist uppercase">
                Scroll to explore the environment
              </div>
              <div className="mt-3 max-w-[250px] font-mono text-[8px] leading-relaxed tracking-[0.1em] text-amber uppercase">
                Illustrative depth context / not an O-01 performance chart
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-5xl tracking-tight md:text-7xl">
                {stage.meters}
              </div>
              <div className="label mt-2 text-cyan">{stage.depth}</div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="headline text-4xl md:text-6xl">{stage.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">
                {stage.copy}
              </p>
              <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-amber uppercase">
                {stage.why}
              </p>
            </div>
            <div className="hidden items-end justify-end lg:col-span-6 lg:flex">
              <ol className="space-y-2">
                {STAGES.map((s, i) => (
                  <li
                    key={s.depth}
                    className="flex items-center gap-4 font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: i === idx ? "#7ee0d0" : "#5c6d73" }}
                  >
                    <span className="w-16 text-right">{s.meters}</span>
                    <span
                      className="h-px"
                      style={{
                        width: i === idx ? 48 : 18,
                        background: i === idx ? "#7ee0d0" : "#1a2c30",
                      }}
                    />
                    <span>{s.depth}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
