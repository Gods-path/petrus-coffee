import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonClasses } from "@/components/ui/Button";
import { ReserveDialog } from "@/components/home/ReserveDialog";
import { Coffee, Users, Sprout, HandHeart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story of Petrus Coffee — founded by Nadège Mbella and Georges Ewané to champion Cameroonian coffee and give Douala a warm place to gather.",
};

const values = [
  {
    icon: Sprout,
    title: "Cameroonian first",
    body: "Every bean is grown here — from the slopes of Mount Cameroon to the Western Highlands. We buy direct and pay fairly.",
  },
  {
    icon: Coffee,
    title: "Made with care",
    body: "Beans roasted in small batches, pastries baked at dawn, dishes cooked to order. No shortcuts, no rushing.",
  },
  {
    icon: Users,
    title: "A place to gather",
    body: "Students revising, friends catching up, professionals meeting — there's a seat and a warm welcome for everyone.",
  },
  {
    icon: HandHeart,
    title: "Rooted in Douala",
    body: "We hire from the neighbourhood, host local musicians, and pour back into the community that fills our room.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-surface">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h1 className="mt-3 font-display text-display-xl font-semibold text-heading">
              Two neighbours, one warm room, and a love for Cameroonian coffee.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-text-muted">
              Petrus Coffee began with a simple frustration: some of the world&apos;s
              finest coffee grows in Cameroon, yet so many of us grew up drinking it
              instant, from a tin. Nadège and Georges set out to change that — one
              honest cup, and one long conversation, at a time.
            </p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/photo-35516348.webp"
              alt="Two friends sharing coffee at a café table"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* The founders */}
      <Section tone="cream">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-md lg:order-1">
            <Image
              src="/images/photo-7601665.webp"
              alt="The cosy, wood-lined interior of Petrus Coffee"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Nadège & Georges" title="How Petrus came to be" />
            <div className="mt-6 space-y-4 text-text-muted">
              <p>
                Georges Ewané trained as an agronomist and spent years alongside coffee
                farmers in the Western Highlands and around Buea. He knew the beans were
                extraordinary — he just couldn&apos;t find anywhere in Douala serving them
                with the care they deserved.
              </p>
              <p>
                Nadège Mbella grew up in Bonapriso, baking with her grandmother and
                feeding whoever happened to be in the house. For her, a café was never
                only about coffee — it was about making people feel at home.
              </p>
              <p>
                They named the café after Georges&apos; grandfather, Petrus, a carpenter
                whose workshop was always full of neighbours, laughter, and the smell of
                fresh wood. That&apos;s the room they set out to rebuild — this time, with
                coffee at the centre.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* From farm to cup */}
      <Section tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="From farm to cup"
              title="Cameroonian coffee, given its due"
              intro="We work directly with growers in the West region and along the Mount
                Cameroon foothills, choosing lots by hand and roasting them in small
                batches. When you order a pour-over, you&apos;re tasting a specific farm —
                and supporting the family that tends it."
            />
            <Link href="/menu" className={buttonClasses("primary", "md", "mt-8")}>
              Explore the menu
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/photo-7125419.webp"
              alt="A farmer harvesting ripe red coffee cherries"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="inverse">
        <SectionHeading
          tone="inverse"
          align="center"
          eyebrow="What we stand for"
          title="Four things we never compromise on"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="rounded-xl bg-espresso-800/60 p-6 ring-1 ring-[color:var(--color-border-inverse)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-pill bg-accent/20 text-accent">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-on-inverse">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-inverse-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Community + closing */}
      <Section tone="cream">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/images/photo-36729801.webp"
              alt="Friends laughing together over coffee at Petrus"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Come say hello"
              title="The door is open"
              intro="Friday nights, local musicians play until late. Saturday mornings, we
                taste coffee together and talk about where it&apos;s grown. The rest of the
                week, we simply keep the pot warm — for friends, families, students, and
                anyone who needs a good seat."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ReserveDialog size="md" />
              <Link href="/menu" className={buttonClasses("secondary", "md")}>
                See the menu
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
