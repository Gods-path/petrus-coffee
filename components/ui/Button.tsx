import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
  "transition-[transform,background-color,box-shadow,color] duration-[150ms] ease-out " +
  "hover:-translate-y-px active:translate-y-0 disabled:opacity-50 " +
  "disabled:pointer-events-none select-none whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary shadow-sm hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "bg-surface text-heading border border-border-strong hover:bg-surface-cream",
  ghost:
    "bg-transparent text-heading border border-border hover:bg-surface-cream",
  // For use on dark (roasted-bean) sections.
  inverse:
    "bg-surface-cream text-primary shadow-sm hover:bg-white",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

/** Shared class string so `<Link>` can look identical to `<Button>`. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: { variant?: ButtonVariant; size?: ButtonSize } & React.ComponentProps<"button">) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
