import { useState } from "react";

type Day = 1 | 14 | 30 | "diff";

const OBJECTS: {
  id: string;
  x: number;
  y: number;
  kind: "rock" | "structure" | "debris" | "crate";
  days: number[];
}[] = [
  { id: "s1", x: 72, y: 38, kind: "structure", days: [1, 14, 30] },
  { id: "r1", x: 28, y: 58, kind: "rock", days: [1, 14, 30] },
  { id: "r2", x: 48, y: 70, kind: "rock", days: [1, 14, 30] },
  { id: "d1", x: 40, y: 62, kind: "debris", days: [14, 30] },
  { id: "c1", x: 58, y: 55, kind: "crate", days: [1, 14] },
  { id: "s2", x: 72, y: 50, kind: "structure", days: [30] },
];

export function SpatialMemory() {
  const [day, setDay] = useState<Day>(1);
  const showDiff = day === "diff";
  const currentDay = day === "diff" ? 30 : day;

  return (
    <section data-reveal className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">06 — Spatial memory</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          The ocean changes.
          <br />
          The robot remembers.
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
          The long-term vision is not simply recording underwater imagery. The
          robot should build a spatial history of places it visits and reason
          about meaningful changes over time.
        </p>

        <div className="mt-12 flex flex-wrap gap-2">
          {(
            [
              [1, "Mission 01 · Day 01"],
              [14, "Mission 02 · Day 14"],
              [30, "Mission 03 · Day 30"],
              ["diff", "Difference layer"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={String(id)}
              onClick={() => setDay(id)}
              className={`border px-4 py-2 font-mono text-[10px] tracking-[0.16em] uppercase ${
                day === id
                  ? "border-cyan text-cyan"
                  : "border-white/10 text-mist hover:text-foam"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-abyss-2 lg:col-span-8">
            <img
              src="/images/map-bathy.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <svg viewBox="0 0 100 70" className="relative h-full w-full">
              <path
                d="M4 48 Q 20 40 32 50 T 60 46 T 96 52"
                fill="none"
                stroke="rgba(126,224,208,0.25)"
                strokeWidth="0.3"
              />
              {OBJECTS.map((o) => {
                const present = o.days.includes(currentDay);
                const was = o.days.includes(1);
                const appeared = showDiff && present && !was;
                const gone = showDiff && !present && was;
                const visible = showDiff ? appeared || gone || present : present;
                if (!visible) return null;
                const color = appeared
                  ? "#7ee0d0"
                  : gone
                    ? "#c9a66b"
                    : o.kind === "structure"
                      ? "#d9d2c5"
                      : o.kind === "debris"
                        ? "#c9a66b"
                        : "#8b9aa0";
                return (
                  <g key={o.id} opacity={gone ? 0.45 : 1}>
                    {o.kind === "structure" ? (
                      <rect
                        x={o.x - 1.2}
                        y={o.y - 8}
                        width="2.4"
                        height="12"
                        fill={color}
                      />
                    ) : (
                      <circle cx={o.x} cy={o.y} r={o.kind === "rock" ? 2.2 : 1.6} fill={color} />
                    )}
                    {gone && (
                      <line
                        x1={o.x - 3}
                        y1={o.y - 3}
                        x2={o.x + 3}
                        y2={o.y + 3}
                        stroke="#c9a66b"
                        strokeWidth="0.4"
                      />
                    )}
                  </g>
                );
              })}
              <circle cx="18" cy="32" r="1.4" fill="#7ee0d0" />
              <text x="21" y="33" fill="#7ee0d0" fontSize="2.4" fontFamily="IBM Plex Mono">
                O-01
              </text>
            </svg>
            {showDiff && (
              <div className="absolute top-4 right-4 border border-cyan/40 bg-abyss/80 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
                Change detected
              </div>
            )}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.16em] text-mist uppercase">
              Concept spatial history · same site, repeated visits
            </div>
          </div>

          <aside className="border border-white/10 p-6 lg:col-span-4">
            <div className="label text-cyan">Observed delta</div>
            <ul className="mt-6 space-y-5 text-sm text-mist">
              <li>
                <span className="block font-mono text-[10px] tracking-[0.16em] text-cyan uppercase">
                  Appeared
                </span>
                Debris object enters the scene by day 14.
              </li>
              <li>
                <span className="block font-mono text-[10px] tracking-[0.16em] text-amber uppercase">
                  Disappeared
                </span>
                Crate is gone by day 30.
              </li>
              <li>
                <span className="block font-mono text-[10px] tracking-[0.16em] text-foam uppercase">
                  Changed
                </span>
                Structure footprint extends — biofouling or physical shift.
              </li>
            </ul>
            <p className="mt-8 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-slate-sea uppercase">
              Persistent underwater intelligence is a memory problem as much as a
              sensing problem.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
