import { useState } from "react";

const NOTES = [
  {
    cat: "Underwater localization",
    problem: "GPS does not work below the surface. Drift accumulates.",
    why: "Without a stable local frame, mapping, inspection, and return-to-site all fail.",
    approach: "Fuse inertial, depth, acoustic, optical, and terrain-relative cues as the environment allows.",
  },
  {
    cat: "Multimodal perception",
    problem: "Visibility is unstable. Cameras and sonar disagree.",
    why: "A single sensor modality is not enough for real water.",
    approach: "Treat optical and acoustic sensing as complementary layers, not competing cameras.",
  },
  {
    cat: "Spatial memory",
    problem: "Missions are usually treated as isolated dives.",
    why: "Change detection needs a place to live across time.",
    approach: "Build a persistent spatial history of sites the robot revisits.",
  },
  {
    cat: "Autonomous mission planning",
    problem: "High-level jobs still collapse into teleoperation.",
    why: "Bandwidth and attention cannot scale with ocean access.",
    approach: "Plan → navigate → perceive → verify → report from a mission goal.",
  },
  {
    cat: "Underwater manipulation",
    problem: "Acting on the world is harder than looking at it.",
    why: "Inspection becomes work only when the robot can sample or recover.",
    approach: "Treat manipulation as a later payload class, not a launch claim.",
  },
  {
    cat: "Energy / endurance",
    problem: "Transit, hover, sensing, and compute all compete for watt-hours.",
    why: "Persistent presence is an energy problem first.",
    approach: "Design for mission energy, not peak thrust.",
  },
  {
    cat: "Underwater communication",
    problem: "Radio dies. Acoustics are thin. Satellites wait at the surface.",
    why: "Most of the intelligence has to live on the vehicle.",
    approach: "Local autonomy plus store-and-forward, with human takeover when needed.",
  },
];

export function Research() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section data-reveal id="research" className="relative bg-abyss-2 py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">13 — Research</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          Engineering notes.
        </h2>
        <p className="mt-6 max-w-2xl text-mist">
          In research. We are not publishing invented results. These notes describe
          the problems we intend to work.
        </p>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {NOTES.map((n, i) => {
            const isOpen = open === i;
            return (
              <article key={n.cat}>
                <button
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                    {n.cat}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-amber uppercase">
                    In research
                  </span>
                </button>
                {isOpen && (
                  <div className="grid gap-6 pb-10 md:grid-cols-3">
                    <Block k="Problem" v={n.problem} />
                    <Block k="Why it matters" v={n.why} />
                    <Block k="Approach" v={n.approach} />
                    <Block k="Experiment" v="Engineering note — in progress." />
                    <Block k="Result" v="Not yet. No fabricated findings." />
                    <Block k="Next step" v="Build the first physical prototype and test in controlled water." />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Block({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="label text-cyan">{k}</div>
      <p className="mt-3 text-sm leading-relaxed text-mist">{v}</p>
    </div>
  );
}
