import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";

export function StoryTeaser() {
  return (
    <Section tone="surface">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/photo-1855214.webp"
              alt="The warm, wood-lined counter at Petrus Coffee"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
          {/* small overlapping bean detail */}
          <div className="absolute -bottom-6 -right-4 hidden h-28 w-28 overflow-hidden rounded-xl shadow-lg ring-4 ring-surface sm:block">
            <Image
              src="/images/photo-30444143.webp"
              alt="Close-up of freshly roasted coffee beans"
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Our story"
            title="Built by two neighbours who love coffee"
            intro="Nadège and Georges opened Petrus to give Douala a warm place to gather —
              and to put Cameroonian coffee where it belongs: front and centre. Every bean
              we pour is grown here, at home."
          />
          <Link href="/about" className={buttonClasses("primary", "md", "mt-8")}>
            Read our story
          </Link>
        </div>
      </div>
    </Section>
  );
}
