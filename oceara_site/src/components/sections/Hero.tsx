import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { SUBSYSTEMS, type SubsystemId } from "../robot/O01Model";
import { useIsMobile, usePrefersReducedMotion, useWebGL } from "@/hooks/useMedia";
import { MEDIA } from "@/media";

const HeroScene = lazy(() =>
  import("../robot/HeroScene").then((m) => ({ default: m.HeroScene })),
);

// This is a scroll-driven environmental narrative, not an O-01 depth rating.
const DEPTHS = [
  { m: 0, label: "SURFACE" },
  { m: 10, label: "LIGHT FALL-OFF" },
  { m: 25, label: "GPS DENIED" },
  { m: 50, label: "VISIBILITY LOSS" },
  { m: 100, label: "ACOUSTIC CONSTRAINTS" },
  { m: 200, label: "UNCERTAINTY" },
];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const webgl = useWebGL();
  const [depth, setDepth] = useState(0);
  const [selected, setSelected] = useState<SubsystemId | null>(null);
  const [hovered, setHovered] = useState<SubsystemId | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = Math.max(window.innerHeight * 0.9, 1);
      setDepth(Math.min(1, Math.max(0, y / h)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const depthLabel = useMemo(() => {
    const meters = depth * 220;
    const closest = DEPTHS.reduce((a, b) =>
      Math.abs(b.m - meters) < Math.abs(a.m - meters) ? b : a,
    );
    return closest.label;
  }, [depth]);

  const active = selected ?? hovered;
  const sub = SUBSYSTEMS.find((s) => s.id === active);

  const show3d = webgl && !reduced;

  return (
    <section id="top" className="relative h-[180vh] bg-abyss">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-abyss">
          <img
            src="/images/o01-hero.jpg"
            alt="O-01 underwater robot concept"
            className="absolute inset-0 h-full w-full object-cover scale-[1.035] opacity-25 blur-[0.3px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(126,224,208,.16),transparent_28%),linear-gradient(180deg,rgba(4,7,10,.02),rgba(4,7,10,.55))]" />
          <div className="hero-noise pointer-events-none absolute inset-0 opacity-30" /><div className="hero-image-sheen" />
          {MEDIA.heroUnderwaterFilm && (
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen"
              src={MEDIA.heroUnderwaterFilm}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          {show3d ? (
            <Suspense
              fallback={<div className="absolute inset-0" aria-hidden />}
            >
              <HeroScene
                depth={depth}
                highlight={active}
                interactive={!mobile}
                onSelect={setSelected}
                onHover={setHovered}
                reduced={reduced || mobile}
                dpr={mobile ? 1 : 1.25}
              />
            </Suspense>
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,10,.78)_0%,rgba(4,7,10,.2)_46%,rgba(4,7,10,.48)_100%)]" />
        </div>

        <div className="vignette pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            background: `linear-gradient(180deg, rgba(4,7,10,${0.15 + depth * 0.35}) 0%, rgba(4,7,10,${0.1 + depth * 0.45}) 40%, rgba(4,7,10,${0.55 + depth * 0.35}) 100%)`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-[1480px] flex-col justify-between px-5 pt-24 pb-8 md:px-8 md:pb-10">
          <div className="flex items-start justify-between">
            <div className="pointer-events-auto">
              <div className="label text-cyan">O-01 / Concept</div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-mist uppercase">
                First prototype · Not yet built
              </div>
            </div>
            <div className="hidden text-right md:block">
              <div className="label">Environment chapter</div>
              <div className="font-display mt-1 text-3xl tracking-tight text-foam">
                {depthLabel}
              </div>
            </div>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="headline text-[14vw] text-foam sm:text-[11vw] lg:text-[7.4vw]">
                Intelligence
                <br />
                below
                <br />
                the surface.
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist md:text-base">
                Oceara is developing O-01, a proposed tethered underwater
                robotics platform. The first target is a controlled-water proof
                of operator control and live video. Waste recovery remains a
                later direction, not a demonstrated capability.
              </p>
              <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
                <a href="#platform" className="btn-primary rounded-full" data-magnetic>
                  Explore the platform
                </a>
                <a href="#missions" className="btn-ghost rounded-full" data-magnetic>
                  View missions
                </a>
              </div>
            </div>

            <div className="pointer-events-auto lg:col-span-5 lg:justify-self-end">
              {sub ? (
                <div className="panel glass-edge max-w-sm rounded-2xl p-5">
                  <div className="label text-cyan">{sub.label}</div>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{sub.copy}</p>
                  <button
                    className="mt-4 font-mono text-[10px] tracking-[0.18em] text-mist uppercase hover:text-cyan"
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="panel glass-edge max-w-sm rounded-2xl p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="label text-cyan">O-01 / Concept</span>
                    <span className="status-dot" />
                  </div>
                  <dl className="space-y-2 font-mono text-[11px] tracking-[0.12em] text-mist uppercase">
                    <Row k="System stage" v="Architecture drafted" />
                    <Row k="Navigation" v="Requirements under review" />
                    <Row k="Perception" v="Design target" />
                    <Row k="First test" v="Operator control" />
                    <Row k="Link" v="Tethered concept" />
                  </dl>
                  <div className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] tracking-[0.14em] text-slate-sea uppercase">
                    {mobile
                      ? "Concept model · Prototype target"
                      : "Drag to inspect · Click a subsystem"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute top-1/2 right-5 hidden -translate-y-1/2 md:block">
          <div className="flex flex-col items-center gap-2">
            <div className="h-28 w-px depth-track" />
            <div className="font-mono text-[9px] tracking-[0.2em] text-cyan uppercase">
              {depthLabel}
            </div>
            <div className="h-28 w-px depth-track rotate-180" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <dt className="text-slate-sea">{k}</dt>
      <dd className="text-foam">{v}</dd>
    </div>
  );
}
