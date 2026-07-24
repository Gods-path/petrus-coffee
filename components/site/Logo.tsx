import Link from "next/link";
import { cn } from "@/lib/cn";

/** Wordmark: a bean mark + the name set in the display serif. */
export function Logo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Link
      href="/"
      aria-label="Petrus Coffee — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden
        className={cn(
          "grid h-9 w-9 place-items-center rounded-pill font-display text-lg leading-none",
          tone === "inverse"
            ? "bg-surface-cream text-primary"
            : "bg-primary text-on-primary",
        )}
      >
        P
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-xl font-semibold tracking-tight",
            tone === "inverse" ? "text-on-inverse" : "text-heading",
          )}
        >
          Petrus
        </span>
        <span
          className={cn(
            "block text-2xs font-bold uppercase tracking-label",
            tone === "inverse" ? "text-on-inverse-muted" : "text-accent-strong",
          )}
        >
          Coffee · Douala
        </span>
      </span>
    </Link>
  );
}
