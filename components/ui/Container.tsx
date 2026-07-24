import { cn } from "@/lib/cn";

/** Centered page container: max 1200px with fluid side gutters. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[clamp(1rem,4vw,2.5rem)]",
        className,
      )}
      {...props}
    />
  );
}
