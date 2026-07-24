"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { ReserveDialog } from "@/components/home/ReserveDialog";
import { nav } from "@/data/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-pill px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-surface-cream hover:text-heading",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <ReserveDialog size="md" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-pill text-heading hover:bg-surface-cream md:hidden"
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </Container>

      {/* Mobile navigation */}
      {open && (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-4 py-3 text-base font-semibold",
                    active ? "bg-primary/10 text-primary" : "text-text hover:bg-surface-cream",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="px-1 pt-2">
              <ReserveDialog size="lg" className="w-full" />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
