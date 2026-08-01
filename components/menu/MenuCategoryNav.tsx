"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { slugify } from "@/lib/slug";

export function MenuCategoryNav({ categories }: { categories: string[] }) {
  const [active, setActive] = useState(categories[0]);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(slugify(c)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = categories.find((c) => slugify(c) === entry.target.id);
            if (match) setActive(match);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  return (
    // The band is full-bleed; the pills inside align to the 1200px column via
    // Container. The old `-mx-[clamp(...)]` was meant to break out of a
    // Container's gutter, but this nav is rendered outside one — so it pushed
    // past the viewport on both sides and gave the page a horizontal scrollbar.
    <nav
      aria-label="Menu categories"
      className="sticky top-18 z-[90] border-y border-border bg-background/90 backdrop-blur-md"
    >
      <Container>
        <ul className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const isActive = active === category;
            return (
              <li key={category}>
                <a
                  href={`#${slugify(category)}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center whitespace-nowrap rounded-pill px-4 py-2.5 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-on-primary"
                      : "bg-surface-cream text-text-muted hover:bg-surface-sunken hover:text-heading",
                  )}
                >
                  {category}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
