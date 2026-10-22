import { useState } from "react";

const FIELD_VIDEO = "4sSxPkhI9Do";

const REFERENCES = [
  {
    number: "01",
    type: "FIELD DOCUMENTATION / NOAA OCEAN EXPLORATION",
    title: "Inspect before intervening.",
    copy: "Real marine-debris imagery from an ROV inspection mission. This is an external research reference, not footage of an Oceara mission.",
    image: "https://d2ol7oe51mr4n9.cloudfront.net/user_39gwItpPF5f81c47VHif1zmAIQE/ae18ffe3-d922-4b90-8d0c-0fdf5288dda7.webp",
    alt: "NOAA Ocean Exploration field image showing an ROV inspecting marine debris",
    credit: "Image courtesy of Kraken Robotics and NOAA Ocean Exploration",
    source: "https://oceanexplorer.noaa.gov/multimedia/technology-development-partnerships-ex1904-logs-july30-media-debris/",
  },
  {
    number: "02",
    type: "EXISTING ROV / BLUE ROBOTICS",
    title: "The hardware has to work in real water.",
    copy: "An underwater reference photo of the BlueROV2, an existing system. Use it to reason about tether, lighting, frame and environment, not as a visual claim about O-01.",
    image: "https://d2ol7oe51mr4n9.cloudfront.net/user_39gwItpPF5f81c47VHif1zmAIQE/887aa5ac-a520-4ba4-95b5-f016f693e23b.webp",
    alt: "Blue Robotics BlueROV2 underwater among a reef during a real dive",
    credit: "Image courtesy of Blue Robotics",
    source: "https://bluerobotics.com/press/",
  },
  {
    number: "03",
    type: "DEPLOYMENT CONTEXT / BLUE ROBOTICS",
    title: "A robot is more than the vehicle.",
    copy: "Before a dive there is a tether, a launch point, an operator, a recovery plan and equipment checks. Those realities belong in the design conversation from day one.",
    image: "https://d2ol7oe51mr4n9.cloudfront.net/user_39gwItpPF5f81c47VHif1zmAIQE/415e6ca6-c861-4b64-986d-84ef8bfc480f.webp",
    alt: "BlueROV2 system with tether and support equipment on a dock before deployment",
    credit: "Image courtesy of Blue Robotics",
    source: "https://bluerobotics.com/press/",
  },
  {
    number: "04",
    type: "SENSOR REFERENCE / NOAA OCEAN EXPLORATION",
    title: "Evidence starts with seeing clearly.",
    copy: "A real underwater scan using red illumination and a green laser reference line. It is a useful reminder that lighting, visibility and measurement need deliberate design.",
    image: "https://d2ol7oe51mr4n9.cloudfront.net/user_39gwItpPF5f81c47VHif1zmAIQE/e9fb918f-ef1a-46f8-98ad-42919befc5b3.webp",
    alt: "NOAA underwater marine-debris scan with red illumination and a green laser reference line",
    credit: "Image courtesy of Kraken Robotics and NOAA Ocean Exploration",
    source: "https://oceanexplorer.noaa.gov/multimedia/technology-development-partnerships-ex1904-logs-july30-media-scan/",
  },
];

export function RealWorldReferences() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section data-reveal id="real-world" className="relative overflow-hidden border-y border-white/10 bg-abyss-2 py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-cyan/5 blur-3xl" />
        <div className="absolute bottom-0 left-[-12%] h-[380px] w-[380px] rounded-full bg-cyan/5 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-[1480px] px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="label text-cyan">Field notes / Real systems</div>
            <h2 className="headline mt-6 max-w-5xl text-5xl md:text-7xl">
              Reference the ocean.
              <br />
              Do not fake the evidence.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-mist md:col-span-4 md:justify-self-end">
            The images and video in this chapter show existing ROVs and documented
            research work. They are visual and technical references, not Oceara
            hardware, an O-01 test, or evidence of an Oceara deployment.
          </p>
        </div>

        <div className="mt-12 overflow-hidden border border-white/10 bg-abyss">
          <div className="grid lg:grid-cols-12">
            <div className="relative min-h-[300px] overflow-hidden bg-abyss-3 lg:col-span-8 lg:min-h-[480px]">
              {playVideo ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${FIELD_VIDEO}?autoplay=1&rel=0&playsinline=1`}
                  title="Blue Robotics BlueROV2 Dare to Explore. Existing ROV reference footage, not O-01."
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <>
                  <img
                    src="https://d2ol7oe51mr4n9.cloudfront.net/user_39gwItpPF5f81c47VHif1zmAIQE/887aa5ac-a520-4ba4-95b5-f016f693e23b.webp"
                    alt="Blue Robotics BlueROV2 underwater in a real dive"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/95 via-abyss/15 to-abyss/25" />
                  <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4 md:inset-x-8 md:top-8">
                    <span className="label text-foam">Video reference / Blue Robotics</span>
                    <span className="border border-white/25 bg-abyss/60 px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-mist uppercase">Existing ROV</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPlayVideo(true)}
                    className="group absolute inset-x-5 bottom-7 flex w-fit items-center gap-4 text-left md:inset-x-8 md:bottom-10"
                    aria-label="Play Blue Robotics Dare to Explore underwater ROV video"
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-cyan/70 bg-abyss/70 text-cyan transition-all group-hover:scale-105 group-hover:bg-cyan group-hover:text-abyss">
                      <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M7 4.8v14.4L19 12 7 4.8Z" /></svg>
                    </span>
                    <span>
                      <span className="block font-display text-xl text-foam md:text-2xl">Watch a real ROV dive</span>
                      <span className="mt-1 block font-mono text-[9px] tracking-[0.14em] text-mist uppercase">Click to load video / not O-01 footage</span>
                    </span>
                    <span aria-hidden="true" className="ml-3 text-cyan transition-transform group-hover:translate-x-1">↗</span>
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col justify-between border-t border-white/10 p-6 md:p-8 lg:col-span-4 lg:border-l lg:border-t-0">
              <div>
                <div className="label text-cyan">Reference 01 / Deployment</div>
                <h3 className="font-display mt-7 max-w-sm text-3xl leading-tight tracking-tight text-foam md:text-4xl">
                  The mission begins before the dive.
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-mist">
                  Real underwater systems have to be launched, connected, piloted,
                  monitored and recovered. These constraints should shape our first
                  build and its safety review, not just the concept render.
                </p>
              </div>
              <div className="mt-10 border-t border-white/10 pt-4">
                <div className="font-mono text-[9px] tracking-[0.12em] text-mist uppercase">Video credit / Blue Robotics</div>
                <a href="https://bluerobotics.com/press/" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] text-cyan uppercase hover:text-foam">
                  Open media kit <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {REFERENCES.map((reference) => (
            <article key={reference.number} className="group flex min-w-0 flex-col bg-abyss-2">
              <div className="relative aspect-[4/3] overflow-hidden bg-abyss-3">
                <img
                  src={reference.image}
                  alt={reference.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-3 top-3 bg-abyss/80 px-2 py-1 font-mono text-[8px] tracking-[0.1em] text-foam uppercase">{reference.number}</span>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="font-mono text-[8px] leading-relaxed tracking-[0.1em] text-cyan uppercase">{reference.type}</p>
                <h3 className="mt-4 font-display text-xl leading-tight text-foam">{reference.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-mist">{reference.copy}</p>
                <div className="mt-auto pt-5">
                  <p className="font-mono text-[8px] leading-relaxed text-slate-sea uppercase">{reference.credit}</p>
                  <a href={reference.source} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.09em] text-cyan uppercase hover:text-foam">
                    Original source <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 max-w-4xl font-mono text-[9px] leading-relaxed tracking-[0.035em] text-slate-sea">
          REAL-WORLD REFERENCE MEDIA / Blue Robotics image reuse is subject to its media-kit terms and credit. NOAA images are credited individually. None of the images or video documents an Oceara system or test.
        </p>
      </div>
    </section>
  );
}
