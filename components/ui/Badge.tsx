import { cn } from "@/lib/cn";

/**
 * Small status tag for menu items ("Popular", "House Favourite", ...).
 * Colour-coded but always readable, and never the only signal (it has text).
 */
const tones: Record<string, string> = {
  Popular: "bg-accent/15 text-accent-strong",
  "House Favourite": "bg-primary/12 text-primary",
  New: "bg-leaf/15 text-olive-600",
  Seasonal: "bg-wood/15 text-wood-600",
};

export function Badge({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const tone = tones[children] ?? "bg-primary/10 text-primary";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-2xs font-bold uppercase tracking-label",
        tone,
        className,
      )}
    >
      {children}
    </span>
  );
}
