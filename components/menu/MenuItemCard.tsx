import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, type MenuItem } from "@/lib/menu";

export function MenuItemCard({
  item,
  priority = false,
}: {
  item: MenuItem;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-surface shadow-sm transition-shadow duration-[260ms] hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          priority={priority}
          className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
        />
        {item.badge && (
          <div className="absolute left-3 top-3">
            <Badge className="shadow-sm backdrop-blur-sm">{item.badge}</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight text-heading">
            {item.name}
          </h3>
          <p className="shrink-0 whitespace-nowrap pt-1 text-sm font-bold text-primary">
            {formatPrice(item.price)}
          </p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
      </div>
    </article>
  );
}
