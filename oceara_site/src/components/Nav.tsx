import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#real-world", label: "Field notes" },
  { href: "#missions", label: "Missions" },
  { href: "#architecture", label: "Architecture" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#research", label: "Research" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#platform");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.id) setActive(`#${visible.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 border-b border-white/0 transition-all duration-700",
        scrolled || open
          ? "border-white/10 bg-abyss/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-3" data-magnetic>
          <span className="relative grid h-7 w-7 place-items-center">
            <span className="absolute inset-0 rounded-full border border-cyan/70" />
            <span className="absolute inset-[5px] rounded-full border border-cyan/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_14px_rgba(126,224,208,.7)]" />
          </span>
          <span className="font-display text-[15px] tracking-[0.28em] uppercase">
            Oceara
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "relative py-2 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-300",
                active === l.href ? "text-cyan" : "text-mist hover:text-foam",
              )}
            >
              {l.label}
              <span
                className={cn(
                  "absolute right-0 bottom-0 left-0 h-px origin-left bg-cyan transition-transform duration-300",
                  active === l.href ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden border border-amber/25 bg-amber/5 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-amber uppercase sm:inline-flex">
            Early stage / Pre-pilot
          </span>
          <a
            href="#contact"
            className="hidden rounded-full border border-cyan/25 px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-cyan uppercase transition-colors hover:border-cyan/50 hover:bg-cyan/5 md:inline"
            data-magnetic
          >
            Contact ↗
          </a>
          <button
            className="grid h-9 w-9 place-items-center border border-white/10 bg-white/[0.02] transition-colors hover:border-cyan/30 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span className="h-px w-full bg-foam transition-transform duration-300" />
              <span className="h-px w-3/4 bg-foam transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-abyss/95 px-5 py-6 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-b border-white/5 px-1 py-3 font-mono text-xs tracking-[0.22em] uppercase",
                  active === l.href ? "text-cyan" : "text-mist",
                )}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="px-1 py-3 font-mono text-xs tracking-[0.22em] text-cyan uppercase"
            >
              Contact ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
