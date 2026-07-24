import { cn } from "@/lib/cn";

/** Small uppercase label above a heading. A short coffee-bean mark precedes it. */
export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-2xs font-bold uppercase tracking-label",
        tone === "inverse" ? "text-on-inverse-muted" : "text-accent-strong",
        className,
      )}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-pill bg-accent" />
      {children}
    </p>
  );
}
