import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// One small global motion layer keeps the whole site feeling like one product,
// rather than a stack of unrelated sections.
gsap.registerPlugin(ScrollToPlugin);

export function PageEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const cleanups: Array<() => void> = [];

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const onAnchor = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      if (reduce) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      gsap.to(window, {
        duration: 1.05,
        ease: "power3.inOut",
        scrollTo: { y: target, offsetY: 76 },
      });
    };

    anchors.forEach((a) => a.addEventListener("click", onAnchor));
    cleanups.push(() => anchors.forEach((a) => a.removeEventListener("click", onAnchor)));

    if (reduce) return () => cleanups.forEach((fn) => fn());

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealTargets.forEach((el) => el.classList.add("reveal-ready"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
    cleanups.push(() => revealObserver.disconnect());

    if (!isTouch) {
      const glow = document.createElement("div");
      glow.className = "pointer-glow";
      document.body.appendChild(glow);

      const move = (event: MouseEvent) => {
        glow.style.transform = `translate3d(${event.clientX - 120}px, ${event.clientY - 120}px, 0)`;
      };
      window.addEventListener("mousemove", move, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("mousemove", move);
        glow.remove();
      });

      const magnetic = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
      magnetic.forEach((el) => {
        const onMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 10;
          const dy = ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 10;
          el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        };
        const reset = () => {
          el.style.transform = "translate3d(0, 0, 0)";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", reset);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", reset);
          el.style.transform = "";
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
