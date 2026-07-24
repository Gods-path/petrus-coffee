import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto text-center",
        align === "center" ? "max-w-2xl" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow tone={tone} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "mt-3 font-display text-display-lg font-semibold",
          tone === "inverse" ? "text-on-inverse" : "text-heading",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "inverse" ? "text-on-inverse-muted" : "text-text-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
