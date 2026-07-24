import Link from "next/link";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { ReserveDialog } from "@/components/home/ReserveDialog";
import { site, nav } from "@/data/site";

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

        <nav aria-label="Footer" className="text-sm">
          <h2 className="text-2xs font-bold uppercase tracking-label text-on-inverse-muted">
            Explore
          </h2>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-on-inverse hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-2xs font-bold uppercase tracking-label text-on-inverse-muted">
            Follow
          </h2>
          <ul className="mt-4 flex gap-4 text-sm">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-on-inverse hover:text-white hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="text-2xs font-bold uppercase tracking-label text-on-inverse-muted">
            Visit us
          </h2>
          <ul className="mt-4 space-y-3 text-on-inverse-muted">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <span>{site.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
          <h2 className="mt-8 flex items-center gap-2 text-2xs font-bold uppercase tracking-label text-on-inverse-muted">
            <Clock size={14} aria-hidden /> Hours
          </h2>
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

      <div className="border-t border-[color:var(--color-border-inverse)]">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-on-inverse-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Made with care in Douala.</p>
          <p>Brewed with beans grown in Cameroon.</p>
        </Container>
      </div>
    </footer>
  );
}
