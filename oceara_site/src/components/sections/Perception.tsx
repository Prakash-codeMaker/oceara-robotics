import { useEffect, useRef, useState } from "react";

const VIEWS = ["CAMERA", "SONAR", "DEPTH", "MAP"] as const;
type View = (typeof VIEWS)[number];

const PIPELINE = [
  "RAW SENSOR DATA",
  "PERCEPTION",
  "LOCALIZATION",
  "3D SPATIAL MAP",
] as const;

export function Perception() {
  const [view, setView] = useState<View>("CAMERA");
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % PIPELINE.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 0.016;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#071016";
      ctx.fillRect(0, 0, w, h);

      // seabed
      ctx.strokeStyle = "rgba(126,224,208,0.18)";
      ctx.beginPath();
      for (let x = 0; x < w; x += 8) {
        const y =
          h * 0.62 +
          Math.sin(x * 0.02 + t * 0.4) * 10 +
          Math.sin(x * 0.05) * 18;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // rocks
      const rocks = [
        [w * 0.22, h * 0.7, 28],
        [w * 0.48, h * 0.66, 40],
        [w * 0.73, h * 0.72, 22],
      ];
      ctx.fillStyle = "rgba(90,110,115,0.5)";
      rocks.forEach(([x, y, r]) => {
        ctx.beginPath();
        ctx.ellipse(x, y, r, r * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // structure
      ctx.fillStyle = "rgba(180,190,185,0.35)";
      ctx.fillRect(w * 0.78, h * 0.28, 10, h * 0.42);
      ctx.fillRect(w * 0.84, h * 0.36, 8, h * 0.34);

      // debris
      ctx.fillStyle = "rgba(201,166,107,0.7)";
      ctx.fillRect(w * 0.34, h * 0.74, 18, 10);

      if (view === "SONAR" || view === "MAP") {
        const cx = w * 0.18;
        const cy = h * 0.38;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.strokeStyle = "rgba(126,224,208,0.15)";
        for (let r = 30; r < 220; r += 30) {
          ctx.beginPath();
          ctx.arc(0, 0, r, -0.7, 0.7);
          ctx.stroke();
        }
        ctx.rotate(Math.sin(t) * 0.6);
        const grad = ctx.createLinearGradient(0, 0, 180, 0);
        grad.addColorStop(0, "rgba(126,224,208,0.0)");
        grad.addColorStop(0.5, "rgba(126,224,208,0.18)");
        grad.addColorStop(1, "rgba(126,224,208,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 200, -0.15, 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (view === "MAP" || step >= 3) {
        ctx.strokeStyle = "rgba(126,224,208,0.45)";
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(w * 0.12, h * 0.4);
        ctx.quadraticCurveTo(w * 0.4, h * 0.2, w * 0.7, h * 0.45);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (view === "DEPTH") {
        for (let y = 0; y < h; y += 6) {
          const a = y / h;
          ctx.fillStyle = `rgba(126,224,208,${0.02 + a * 0.12})`;
          ctx.fillRect(0, y, w, 6);
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [view, step]);

  return (
    <section data-reveal className="relative bg-abyss-2 py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">05 — Perception</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          See what the robot sees.
        </h2>
        <p className="mt-6 max-w-2xl text-mist">
          From raw sensors to action. Camera, sonar, depth, and map are not
          separate products. They are layers of the same spatial understanding.
        </p>
        <div className="mt-4 font-mono text-[10px] tracking-[0.18em] text-amber uppercase">
          Simulation / concept — not field footage
        </div>

        <div className="mt-12 border border-white/10">
          <div className="flex flex-wrap gap-px border-b border-white/10 bg-white/5">
            {VIEWS.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-5 py-3 font-mono text-[10px] tracking-[0.2em] uppercase ${
                  view === v ? "bg-abyss text-cyan" : "text-mist hover:text-foam"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[280px] border-b border-white/10 lg:border-r lg:border-b-0">
              <img
                src={
                  view === "SONAR"
                    ? "/images/sonar-abstract.jpg"
                    : view === "MAP"
                      ? "/images/map-bathy.jpg"
                      : "/images/optical-view.jpg"
                }
                alt=""
                className="h-full min-h-[280px] w-full object-cover"
                style={{
                  filter: view === "DEPTH" ? "grayscale(0.4) contrast(1.2)" : undefined,
                }}
              />
              <div className="scanline" />
              <div className="absolute top-3 left-3 label text-cyan">
                {view === "CAMERA" ? "Optical" : view}
              </div>
            </div>
            <div className="relative min-h-[280px] bg-abyss">
              <canvas
                ref={canvasRef}
                width={900}
                height={520}
                className="h-full w-full"
              />
              <div className="absolute top-3 left-3 label text-cyan">
                Spatial overlay
              </div>
            </div>
          </div>

          <div className="grid gap-px border-t border-white/10 bg-white/5 sm:grid-cols-4">
            {PIPELINE.map((p, i) => (
              <div
                key={p}
                className={`px-4 py-4 font-mono text-[10px] tracking-[0.16em] uppercase ${
                  i === step ? "bg-abyss text-cyan" : "text-slate-sea"
                }`}
              >
                <div className="text-[9px] text-slate-sea">0{i + 1}</div>
                <div className="mt-1">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
