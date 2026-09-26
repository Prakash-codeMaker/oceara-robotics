import { useState } from "react";

const LAYERS = [
  {
    id: "goal",
    label: "Mission goal",
    copy: "A high-level instruction: survey this region, inspect this structure, find objects of interest.",
  },
  {
    id: "agent",
    label: "Agent / mission planner",
    copy: "Turns a job into a sequence of spatial tasks, constraints, and verification checks.",
  },
  {
    id: "nav",
    label: "Autonomous navigation",
    copy: "Path, hover, and attitude in current — without assuming a human is on the stick.",
  },
  {
    id: "loc",
    label: "Localization",
    copy: "A local frame built from inertial, depth, acoustic, optical, and terrain-relative cues.",
  },
  {
    id: "perc",
    label: "Perception",
    copy: "Multimodal sensing. Cameras when the water allows. Sonar when it does not.",
  },
  {
    id: "mem",
    label: "Spatial memory",
    copy: "Maps that persist across dives so change can be detected, not just filmed.",
  },
  {
    id: "ctrl",
    label: "Vehicle control",
    copy: "Closed-loop control of thrusters, depth, and attitude under real hydrodynamics.",
  },
  {
    id: "hw",
    label: "Sensors + hardware",
    copy: "Pressure housing, power, payload, and the physical body that has to survive the ocean.",
  },
];

export function AutonomyStack() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];

  return (
    <section data-reveal id="architecture" className="relative bg-abyss-2 py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">09 — Autonomy stack</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          From raw sensors to action.
        </h2>
        <p className="mt-6 max-w-2xl text-mist">
          Architecture ready. The stack is designed so a human can give the robot
          a job — and the vehicle can plan, perceive, remember, and act.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <ol className="lg:col-span-5">
            {LAYERS.map((l, i) => (
              <li key={l.id}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex w-full items-center justify-between border-b border-white/10 px-2 py-4 text-left transition-colors ${
                    active === i ? "text-cyan" : "text-mist hover:text-foam"
                  }`}
                >
                  <span className="font-display text-xl tracking-tight md:text-2xl">
                    {l.label}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em]">
                    0{i + 1}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="border border-white/10 p-8 lg:col-span-7">
            <div className="label text-cyan">{layer.label}</div>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist">
              {layer.copy}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Plan", "Navigate", "Perceive", "Remember"].map((k, i) => (
                <div
                  key={k}
                  className={`border px-3 py-3 font-mono text-[10px] tracking-[0.16em] uppercase ${
                    i === active % 4
                      ? "border-cyan text-cyan"
                      : "border-white/10 text-slate-sea"
                  }`}
                >
                  {k}
                </div>
              ))}
            </div>
            <div className="mt-10 overflow-hidden border border-white/10">
              <img
                src="/images/hardware-detail.jpg"
                alt="O-01 hardware concept"
                className="h-48 w-full object-cover"
              />
            </div>
            <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-slate-sea uppercase">
              Hover a layer. Concept / architecture ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
