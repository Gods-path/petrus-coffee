import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { buttonClasses } from "@/components/ui/Button";
import { getPopularItems } from "@/lib/menu";

export function PopularItems() {
  const items = getPopularItems(6);

  return (
    <Section tone="cream">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Loved by the neighbourhood"
          title="What everyone orders"
          intro="The cups and plates our regulars keep coming back for."
        />
        <Link href="/menu" className={buttonClasses("secondary", "md", "shrink-0")}>
          See full menu
        </Link>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <li key={`${item.category}-${item.name}`}>
            <MenuItemCard item={item} priority={i < 3} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
