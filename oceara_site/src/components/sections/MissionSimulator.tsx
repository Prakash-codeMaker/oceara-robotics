import { useEffect, useMemo, useRef, useState } from "react";

const MISSIONS = {
  SURVEY: {
    objective: "Map the assigned area and return a spatial record.",
    area: "500 m × 300 m",
    depth: "42 m",
  },
  INSPECT: {
    objective: "Inspect a submerged structure and flag anomalies.",
    area: "120 m corridor",
    depth: "28 m",
  },
  SEARCH: {
    objective: "Find objects of interest in the assigned polygon.",
    area: "500 m × 300 m",
    depth: "42 m",
  },
  RECOVER: {
    objective: "Locate, verify, and approach a target. Recovery is a future capability.",
    area: "80 m radius",
    depth: "35 m",
  },
} as const;

type Mission = keyof typeof MISSIONS;

const STEPS = [
  "PLAN",
  "DESCEND",
  "LOCALIZE",
  "MAP",
  "SEARCH",
  "DETECT",
  "CLASSIFY",
  "VERIFY",
  "REPORT",
] as const;

export function MissionSimulator() {
  const [mission, setMission] = useState<Mission>("SEARCH");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = step < 0 ? 0 : (step + 1) / STEPS.length;

  useEffect(() => {
    if (!running) return;
    if (step >= STEPS.length - 1) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [running, step]);

  const path = useMemo(() => {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 24; i++) {
      const u = i / 24;
      const x = 0.12 + u * 0.72;
      const y = 0.28 + Math.sin(u * Math.PI * 3.2) * 0.18 + u * 0.22;
      pts.push([x, y]);
    }
    return pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#071016";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(126,224,208,0.06)";
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(126,224,208,0.2)";
      ctx.strokeRect(w * 0.08, h * 0.14, w * 0.84, h * 0.72);

      ctx.beginPath();
      path.forEach(([x, y], i) => {
        const px = x * w;
        const py = y * h;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "rgba(126,224,208,0.25)";
      ctx.stroke();

      const vis = Math.max(0, progress);
      ctx.beginPath();
      path.forEach(([x, y], i) => {
        if (i / (path.length - 1) > vis) return;
        const px = x * w;
        const py = y * h;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "#7ee0d0";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = 1;

      const idx = Math.min(
        path.length - 1,
        Math.floor(vis * (path.length - 1)),
      );
      const [rx, ry] = path[idx];
      ctx.fillStyle = "#7ee0d0";
      ctx.beginPath();
      ctx.arc(rx * w, ry * h, 5, 0, Math.PI * 2);
      ctx.fill();

      if (step >= 5) {
        ctx.strokeStyle = "#c9a66b";
        ctx.strokeRect(w * 0.58, h * 0.48, 28, 18);
        ctx.fillStyle = "#c9a66b";
        ctx.font = "10px IBM Plex Mono";
        ctx.fillText("OBJECT", w * 0.58, h * 0.47);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [path, progress, step]);

  const meta = MISSIONS[mission];

  return (
    <section data-reveal className="relative bg-abyss-2 py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">07 — Mission simulator</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          Give the robot a mission.
        </h2>
        <p className="mt-6 max-w-2xl text-mist">
          Start with a job. The system should then plan, navigate, perceive,
          remember, act, verify, and report.
        </p>
        <div className="mt-3 font-mono text-[10px] tracking-[0.18em] text-amber uppercase">
          Simulation / concept
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {(Object.keys(MISSIONS) as Mission[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMission(m);
                setRunning(false);
                setStep(-1);
              }}
              className={`border px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase ${
                mission === m
                  ? "border-cyan bg-cyan text-abyss"
                  : "border-white/15 text-mist hover:text-foam"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="border border-white/10 lg:col-span-8">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="label text-cyan">Underwater map</span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">
                {mission} · concept
              </span>
            </div>
            <canvas ref={canvasRef} width={960} height={540} className="w-full" />
          </div>
          <aside className="border border-white/10 p-6 lg:col-span-4">
            <div className="label">Mission parameters</div>
            <dl className="mt-5 space-y-3 font-mono text-[11px] tracking-[0.12em] uppercase">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-sea">Area</dt>
                <dd>{meta.area}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-sea">Depth</dt>
                <dd>{meta.depth}</dd>
              </div>
              <div>
                <dt className="text-slate-sea">Objective</dt>
                <dd className="mt-2 normal-case tracking-normal text-mist">
                  {meta.objective}
                </dd>
              </div>
            </dl>
            {mission === "RECOVER" && (
              <div className="mt-4 border border-amber/30 px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-amber uppercase">
                Future capability / prototype target
              </div>
            )}
            <button
              className="btn-primary mt-8 w-full justify-center"
              onClick={() => {
                setStep(0);
                setRunning(true);
              }}
            >
              {step >= STEPS.length - 1 ? "Replay mission" : "Start mission"}
            </button>
            <ol className="mt-6 space-y-1.5">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={`flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] uppercase ${
                    i <= step ? "text-cyan" : "text-slate-sea"
                  }`}
                >
                  <span className="w-5">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className="h-px flex-1"
                    style={{ background: i <= step ? "#7ee0d0" : "#1a2c30" }}
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
