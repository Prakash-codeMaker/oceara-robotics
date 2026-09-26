export function Dimensional() {
  return (
    <section data-reveal className="relative bg-abyss py-28 md:py-36">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label text-cyan">10 — Why Dimensional</div>
        <h2 className="headline mt-6 max-w-4xl text-5xl md:text-7xl">
          A bridge into physical AI.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">
          Dimensional’s public dimOS work spans capabilities such as navigation,
          perception, spatial memory, agents, manipulation, simulation, and
          teleoperation. Our thesis is to extend this style of physical
          intelligence into the underwater domain.
        </p>
        <p className="mt-6 max-w-2xl text-mist">
          We want to explore extending physical-AI infrastructure into underwater
          robotics. We do not claim that dimOS already supports underwater robots.
        </p>

        <div className="mt-16 grid items-stretch gap-px bg-white/10 md:grid-cols-3">
          <div className="bg-abyss p-8">
            <div className="label">dimOS / physical AI foundation</div>
            <p className="mt-6 text-sm leading-relaxed text-mist">
              Agents, spatial memory, perception, navigation, simulation, and
              teleoperation as public technical direction — on land, in air, and
              in lab.
            </p>
          </div>
          <div className="bg-abyss p-8">
            <div className="label text-cyan">Oceara underwater platform</div>
            <p className="mt-6 text-sm leading-relaxed text-mist">
              A vehicle, a sensing stack, and a mission layer built for GPS-denied,
              bandwidth-poor, optically hostile water.
            </p>
          </div>
          <div className="bg-abyss p-8">
            <div className="label">Underwater autonomy</div>
            <p className="mt-6 text-sm leading-relaxed text-mist">
              Persistent spatial intelligence below the surface. A robot that can
              take a job and return a record.
            </p>
          </div>
        </div>

        <div className="mt-8 inline-flex border border-amber/30 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-amber uppercase">
          Concept / technical direction
        </div>
      </div>
    </section>
  );
}
