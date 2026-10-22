const SOURCES = [
  {
    org: "OECD",
    note: "Ocean Economy research",
    href: "https://www.oecd.org/ocean/",
  },
  {
    org: "NOAA Ocean Exploration",
    note: "Autonomous Underwater Vehicles",
    href: "https://oceanexplorer.noaa.gov/technology/subs/auvs/auvs.html",
  },
  {
    org: "Woods Hole Oceanographic Institution",
    note: "Ocean robotics / deep-ocean systems",
    href: "https://www.whoi.edu/what-we-do/explore/underwater-vehicles/",
  },
  {
    org: "Blue Robotics",
    note: "Existing ROV reference media kit",
    href: "https://bluerobotics.com/press/",
  },
  {
    org: "NOAA Ocean Exploration",
    note: "Marine-debris field reference / image credits shown in section",
    href: "https://oceanexplorer.noaa.gov/multimedia/technology-development-partnerships-ex1904-logs-july30-media-debris/",
  },
  {
    org: "Dimensional",
    note: "dimOS documentation",
    href: "https://github.com/dimensionalOS/dimos",
  },
];

export function Sources() {
  return (
    <section data-reveal className="bg-abyss-2 py-20">
      <div className="mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="label">Research basis</div>
        <p className="mt-4 max-w-xl text-sm text-mist">
          Technical reading and licensed or credited reference-media sources.
          These organisations are not partners or endorsers of Oceara. The ROV
          images and video show existing systems, not O-01.
        </p>
        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {SOURCES.map((s) => (
            <li key={s.org}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-wrap items-baseline justify-between gap-3 py-5 hover:text-cyan"
              >
                <span className="font-display text-xl tracking-tight">{s.org}</span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-mist uppercase">
                  {s.note}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
