import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "cream" | "surface" | "sunken" | "inverse";

const toneClasses: Record<Tone, string> = {
  cream: "bg-background text-text",
  surface: "bg-surface text-text",
  sunken: "bg-surface-sunken text-text",
  inverse: "bg-surface-inverse text-on-inverse",
};

/** A full-bleed page section with a coloured band and standard vertical rhythm. */
export function Section({
  tone = "cream",
  className,
  containerClassName,
  children,
  ...props
}: {
  tone?: Tone;
  containerClassName?: string;
} & React.ComponentProps<"section">) {
  return (
    <section
      className={cn("py-[var(--section-py)]", toneClasses[tone], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
