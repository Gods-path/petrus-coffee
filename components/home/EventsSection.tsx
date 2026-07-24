import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { events } from "@/data/events";
import { Calendar, Clock } from "lucide-react";

export function EventsSection() {
  return (
    <Section tone="inverse">
      <SectionHeading
        tone="inverse"
        eyebrow="This week at Petrus"
        title="Nights and mornings worth showing up for"
        intro="Our week has a rhythm. Bring a friend, or come alone and leave with new ones."
      />

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <li key={event.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-xl bg-espresso-800/60 ring-1 ring-[color:var(--color-border-inverse)]">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  sizes="(min-width: 768px) 560px, 90vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-pill bg-accent px-3 py-1 text-2xs font-bold uppercase tracking-label text-espresso-900">
                  {event.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-semibold text-on-inverse">
                  {event.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-on-inverse-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={15} className="text-accent" aria-hidden />
                    {event.cadence}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={15} className="text-accent" aria-hidden />
                    {event.time}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-on-inverse-muted">
                  {event.description}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
