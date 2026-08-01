import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge ships with Tailwind's stock scales, so it has no way to know
 * about this project's `@theme` namespaces. Left untaught it reads
 * `text-display-lg` (a font size) and `text-heading` (a colour) as two
 * conflicting `text-*` utilities and silently drops the first — which quietly
 * rendered every SectionHeading at the 16px default. Registering the custom
 * values keeps size and colour in separate conflict groups.
 *
 * Any new `--text-*` or `--color-*` token added to tokens/theme.css must be
 * listed here too, or it will be liable to the same silent removal.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-2xl",
            "display-xl",
            "display-lg",
            "display-md",
            "2xs",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "heading",
            "text",
            "text-muted",
            "text-subtle",
            "on-inverse",
            "on-inverse-muted",
            "on-primary",
            "primary",
            "accent",
            "accent-strong",
            "link",
            "wood",
            "leaf",
            "success",
            "warning",
            "danger",
            "info",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
