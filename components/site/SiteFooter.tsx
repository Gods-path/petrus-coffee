import Link from "next/link";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { ReserveDialog } from "@/components/home/ReserveDialog";
import { site, nav } from "@/data/site";
import { cn } from "@/lib/cn";

const groupLabel = "text-2xs font-bold uppercase tracking-label text-on-inverse-muted";
// min-h-11 so footer links clear the 44px target floor — they were ~19px tall,
// and on mobile this is exactly where people reach for the phone number.
const footerLink = "inline-flex min-h-11 items-center text-on-inverse";

export function SiteFooter() {
  return (
    <footer className="bg-surface-inverse text-on-inverse">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo tone="inverse" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-inverse-muted">
            A cosy corner of {site.neighbourhood} pouring specialty Cameroonian coffee,
            fresh pastries, and local dishes — for friends, families, students, and
            everyone in between.
          </p>
          <div className="mt-6">
            <ReserveDialog variant="inverse" size="md" />
          </div>
        </div>

        {/* These group labels are <p>, not <h2>: as headings they injected four
            same-level entries into every page's outline, flattening the document
            structure for anyone navigating by heading. aria-labelledby keeps the
            list/label association without touching the outline. */}
        <nav aria-label="Footer" className="text-sm">
          <p id="footer-explore" className={groupLabel}>
            Explore
          </p>
          <ul aria-labelledby="footer-explore" className="mt-2 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={cn(footerLink, "hover:underline")}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p id="footer-follow" className={cn(groupLabel, "mt-7")}>
            Follow
          </p>
          <ul aria-labelledby="footer-follow" className="mt-2 flex flex-wrap gap-x-4 text-sm">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={cn(footerLink, "hover:underline")}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <p id="footer-visit" className={groupLabel}>
            Visit us
          </p>
          <ul aria-labelledby="footer-visit" className="mt-2 space-y-1 text-on-inverse-muted">
            <li className="flex gap-3 py-1.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <span>{site.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-accent" aria-hidden />
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className={cn(footerLink, "hover:text-white")}
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-accent" aria-hidden />
              <a href={`mailto:${site.email}`} className={cn(footerLink, "hover:text-white")}>
                {site.email}
              </a>
            </li>
          </ul>
          <p className={cn(groupLabel, "mt-7 flex items-center gap-2")}>
            <Clock size={14} aria-hidden /> Hours
          </p>
          <ul className="mt-4 space-y-2">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span className="text-on-inverse">{h.days}</span>
                <span className="text-on-inverse-muted">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border-inverse">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-on-inverse-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Made with care in Douala.</p>
          <p>Brewed with beans grown in Cameroon.</p>
        </Container>
      </div>
    </footer>
  );
}
