import { useEffect, useState } from "react";

export function Teleop() {
  const [pos, setPos] = useState({ x: 42, y: 48 });
  const [conf, setConf] = useState(92);
  const [mode, setMode] = useState<"auto" | "assist" | "resume">("auto");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (mode !== "auto") return;
    const t = setInterval(() => {
      setConf((c) => {
        const next = Math.max(55, c - 2);
        if (next <= 61) setMode("assist");
        return next;
      });
    }, 400);
    return () => clearInterval(t);
  }, [mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w") move(0, -4);
      if (k === "s") move(0, 4);
      if (k === "a") move(-4, 0);
      if (k === "d") move(4, 0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  const move = (dx: number, dy: number) => {
    if (mode === "auto") return;
    setPos((p) => ({
      x: Math.min(86, Math.max(12, p.x + dx)),
      y: Math.min(78, Math.max(18, p.y + dy)),
    }));
  };

  const verify = () => {
    setVerified(true);
    setConf(96);
    setMode("resume");
  };

  return (
    <section data-reveal className="relative bg-abyss-2 py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">11 — Human in the loop</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          Autonomous when it can.
          <br />
          Human when it should.
        </h2>
        <p className="mt-6 max-w-2xl text-mist">
          A realistic autonomy posture. The vehicle works the mission. When
          confidence drops, it asks. When the object is verified, autonomy
          resumes.
        </p>
        <div className="mt-3 font-mono text-[10px] tracking-[0.18em] text-amber uppercase">
          Simulated teleoperation interface · concept
        </div>

        <div className="mt-12 border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <span className="label text-cyan">O-01 teleop · concept</span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">
                Autonomy confidence
              </span>
              <span
                className={`font-display text-2xl ${conf < 70 ? "text-amber" : "text-cyan"}`}
              >
                {conf}%
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12">
            <div className="relative min-h-[280px] lg:col-span-7">
              <img
                src="/images/optical-view.jpg"
                alt="Camera concept"
                className="h-full min-h-[280px] w-full object-cover"
              />
              <div className="scanline" />
              <div className="absolute top-3 left-3 label">Camera</div>
              <div
                className="absolute h-8 w-8 border border-cyan"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              />
              {mode === "assist" && !verified && (
                <div className="absolute top-4 right-4 border border-amber/40 bg-abyss/80 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-amber uppercase">
                  Request human assistance
                </div>
              )}
              {verified && (
                <div className="absolute top-4 right-4 border border-cyan/40 bg-abyss/80 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-cyan uppercase">
                  Object verified · autonomy resumed
                </div>
              )}
            </div>
            <div className="grid border-t border-white/10 lg:col-span-5 lg:border-t-0 lg:border-l">
              <div className="relative min-h-[140px] border-b border-white/10">
                <img
                  src="/images/sonar-abstract.jpg"
                  alt="Sonar concept"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 label">Sonar</div>
              </div>
              <div className="relative min-h-[140px] bg-abyss-3">
                <div className="absolute top-3 left-3 label">Minimap</div>
                <div className="absolute inset-6 border border-cyan/20">
                  <div
                    className="absolute h-2 w-2 bg-cyan"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-px border-t border-white/10 bg-white/5 md:grid-cols-2">
            <div className="bg-abyss p-5">
              <div className="label">Control overlay</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <span />
                <Key onClick={() => move(0, -4)}>W</Key>
                <span />
                <Key onClick={() => move(-4, 0)}>A</Key>
                <Key onClick={() => move(0, 4)}>S</Key>
                <Key onClick={() => move(4, 0)}>D</Key>
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-slate-sea uppercase">
                {mode === "auto"
                  ? "Waiting for confidence drop"
                  : mode === "assist"
                    ? "You have the vehicle"
                    : "Autonomy has the vehicle"}
              </p>
            </div>
            <div className="bg-abyss p-5">
              <dl className="space-y-2 font-mono text-[11px] tracking-[0.12em] uppercase">
                <Row k="Mode" v={mode === "assist" ? "Human" : "Autonomous"} />
                <Row k="Link" v="Simulated" />
                <Row k="Heading" v={`${Math.round(pos.x * 3.1)}°`} />
                <Row k="Depth" v="42 m" />
              </dl>
              <button
                className="btn-primary mt-6"
                onClick={verify}
                disabled={mode === "auto"}
              >
                Verify object
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Key({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="border border-white/15 py-3 font-mono text-xs tracking-[0.2em] text-mist hover:border-cyan hover:text-cyan"
    >
      {children}
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-slate-sea">{k}</dt>
      <dd className="text-foam">{v}</dd>
    </div>
  );
}
