export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-abyss py-16">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="flex items-center gap-3">
          <span className="relative grid h-7 w-7 place-items-center">
            <span className="absolute inset-0 rounded-full border border-cyan/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          <span className="font-display text-sm tracking-[0.28em] uppercase">
            Oceara Robotics
          </span>
        </div>
        <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-mist uppercase">
          Autonomous underwater systems
        </p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-slate-sea uppercase">
          Explore · Research · Inspect · Recover
        </p>

        <div className="mt-10 flex flex-wrap gap-6 font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
          <a href="#platform" className="hover:text-cyan">
            Platform
          </a>
          <a href="#missions" className="hover:text-cyan">
            Missions
          </a>
          <a href="#architecture" className="hover:text-cyan">
            Architecture
          </a>
          <a href="#roadmap" className="hover:text-cyan">
            Roadmap
          </a>
          <a href="#research" className="hover:text-cyan">
            Research
          </a>
          <a href="#contact" className="hover:text-cyan">
            Contact
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-8">
          <span className="border border-amber/30 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-amber uppercase">
            Early stage / Pre-pilot
          </span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-slate-sea uppercase">
            Intelligence below the surface.
          </span>
        </div>
      </div>
    </footer>
  );
}
