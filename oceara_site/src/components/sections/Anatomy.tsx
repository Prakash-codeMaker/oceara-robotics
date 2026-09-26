import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useIsMobile, usePrefersReducedMotion, useWebGL } from "@/hooks/useMedia";

const AnatomyScene = lazy(() =>
  import("../robot/AnatomyScene").then((m) => ({ default: m.AnatomyScene })),
);

const LAYERS = [
  { k: "Outer structure", t: "PERCEPTION" },
  { k: "Pressure housing", t: "PRESSURE" },
  { k: "Battery", t: "POWER" },
  { k: "Compute", t: "CONTROL" },
  { k: "Control system", t: "CONTROL" },
  { k: "Sensor bus", t: "PERCEPTION" },
  { k: "Propulsion", t: "PROPULSION" },
  { k: "Payload", t: "PAYLOAD" },
];

export function Anatomy() {
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const webgl = useWebGL();

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setP(scrolled / Math.max(total, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const idx = Math.min(LAYERS.length - 1, Math.floor(p * 0.999 * LAYERS.length));
  const show3d = webgl && !reduced;

  return (
    <section ref={wrap} className={reduced ? "bg-abyss py-28" : "relative h-[280vh] bg-abyss"}>
      <div className={reduced ? "" : "sticky top-0 h-screen overflow-hidden"}>
        <div className="mx-auto grid h-full max-w-[1480px] items-center gap-8 px-5 py-24 md:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="label text-cyan">Robot anatomy</div>
            <h2 className="headline mt-6 text-4xl md:text-6xl">
              Exploded O-01.
            </h2>
            <p className="mt-5 max-w-md text-mist">
              A first-version robot design. Concept / first prototype. Not yet
              fabricated.
            </p>
            <ol className="mt-10 space-y-2">
              {LAYERS.map((l, i) => (
                <li
                  key={l.k}
                  className="flex items-center justify-between border-b border-white/10 py-2 font-mono text-[11px] tracking-[0.14em] uppercase"
                  style={{ color: i === idx ? "#7ee0d0" : "#5c6d73" }}
                >
                  <span>{l.k}</span>
                  <span>{l.t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative h-[50vh] min-h-[320px] lg:col-span-7 lg:h-[70vh]">
            {show3d && inView ? (
              <Suspense
                fallback={
                  <img
                    src="/images/o01-side.jpg"
                    alt="O-01"
                    className="h-full w-full object-contain"
                  />
                }
              >
                <AnatomyScene exploded={p} dpr={mobile ? 1 : 1.4} />
              </Suspense>
            ) : (
              <img
                src="/images/o01-side.jpg"
                alt="O-01 concept"
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
