import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { MenuCategoryNav } from "@/components/menu/MenuCategoryNav";
import { loadMenu } from "@/lib/menu";
import { slugify } from "@/lib/slug";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Coffee, tea, fresh juices, pastries, breakfast, light lunches, and Cameroonian specialties at Petrus Coffee in Douala.",
};

export default function MenuPage() {
  const groups = loadMenu();
  const categories = groups.map((g) => g.category);

  return (
    <>
      {/* Page header */}
      <section className="relative isolate overflow-hidden bg-surface-inverse">
        <Image
          src="/images/photo-6612572.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-25"
        />
        <Container className="py-20 text-on-inverse sm:py-24">
          <Eyebrow tone="inverse">Our menu</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-display-xl font-semibold text-white">
            From the first espresso to the last plate of ndolé.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-cream-200">
            Everything is made fresh through the day. Prices are in CFA francs (FCFA).
            Ask our team about today&apos;s single-origin pour-over.
          </p>
        </Container>
      </section>

      <MenuCategoryNav categories={categories} />

      <Container className="py-14 sm:py-20">
        <div className="space-y-16 sm:space-y-24">
          {groups.map((group) => (
            <section key={group.category} id={slugify(group.category)} aria-labelledby={`${slugify(group.category)}-h`}>
              <div className="mb-8 flex items-baseline gap-4">
                <h2
                  id={`${slugify(group.category)}-h`}
                  className="font-display text-display-md font-semibold text-heading"
                >
                  {group.category}
                </h2>
                <span aria-hidden className="h-px flex-1 bg-border" />
                <span className="text-sm font-medium text-text-subtle">
                  {group.items.length} {group.items.length === 1 ? "item" : "items"}
                </span>
              </div>

              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <MenuItemCard item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
