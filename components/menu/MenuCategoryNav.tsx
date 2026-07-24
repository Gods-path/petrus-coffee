"use client";

import { useEffect, useState } from "react";
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
    <nav
      aria-label="Menu categories"
      className="sticky top-18 z-[90] -mx-[clamp(1rem,4vw,2.5rem)] border-y border-border bg-background/90 px-[clamp(1rem,4vw,2.5rem)] backdrop-blur-md"
    >
      <ul className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <li key={category}>
              <a
                href={`#${slugify(category)}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "inline-block whitespace-nowrap rounded-pill px-4 py-2 text-sm font-semibold transition-colors",
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
    </nav>
  );
}
