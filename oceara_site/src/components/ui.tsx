import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("label", className)}>{children}</div>;
}

export function StatusChip({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: "cyan" | "amber" | "mist";
}) {
  const color =
    tone === "amber"
      ? "border-amber/40 text-amber"
      : tone === "mist"
        ? "border-white/15 text-mist"
        : "border-cyan/35 text-cyan";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] uppercase",
        color,
      )}
    >
      <span
        className={cn(
          "status-dot",
          tone === "amber" && "amber",
          tone === "mist" && "opacity-50",
        )}
      />
      {children}
    </span>
  );
}

export function SectionIndex({ n }: { n: string }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.22em] text-cyan/80">
      {n}
    </span>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn("hairline", className)} />;
}

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("panel", className)}>{children}</div>;
}
