import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { ReserveDialog } from "./ReserveDialog";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* full-width background image */}
      <Image
        src="/images/photo-2079448.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* warm legibility overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-espresso-900/85 via-espresso-900/65 to-espresso-900/35"
      />

      <Container className="flex min-h-[88vh] flex-col justify-center py-24 text-on-inverse">
        <p className="animate-rise flex items-center gap-2 text-2xs font-bold uppercase tracking-label text-cream-300">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-pill bg-accent" />
          {site.neighbourhood}
        </p>

        <h1 className="animate-rise mt-5 max-w-4xl font-display text-display-2xl font-semibold text-white [animation-delay:80ms]">
          Your cosy corner of Douala.
        </h1>

        <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-cream-200 [animation-delay:160ms]">
          Specialty coffee grown in Cameroon, fresh pastries, and warm local dishes —
          served in a room built for lingering. Come for the cup, stay for the company.
        </p>

        {/* Booking is the business goal, so it takes the one cream fill on this
            band (components.md: `inverse` is the primary action on dark/imagery).
            Browsing the menu is the low-commitment alternative and is demoted to
            an outline — previously it out-shouted the CTA it sits beside. */}
        <div className="animate-rise mt-9 flex flex-wrap items-center gap-3 [animation-delay:240ms]">
          <ReserveDialog size="lg" variant="inverse" />
          <Link
            href="/menu"
            className={buttonClasses(
              "inverse",
              "lg",
              "border border-cream-100/70 bg-transparent text-white shadow-none hover:bg-white/10",
            )}
          >
            View the menu
          </Link>
        </div>

        <dl className="animate-rise mt-14 flex flex-wrap gap-x-10 gap-y-4 [animation-delay:320ms]">
          {[
            { v: "100%", l: "Cameroonian beans" },
            { v: "Fri", l: "Live acoustic nights" },
            { v: "Sat", l: "Coffee tastings" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-display text-2xl font-semibold text-white">{s.v}</dt>
              <dd className="text-2xs font-bold uppercase tracking-label text-cream-300">
                {s.l}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
