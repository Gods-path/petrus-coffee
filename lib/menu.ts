import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type MenuItem = {
  category: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  image: string;
};

export type MenuGroup = {
  category: string;
  items: MenuItem[];
};

/** Display order for the Menu page and category navigation. */
export const CATEGORY_ORDER = [
  "Coffee",
  "Tea",
  "Fresh Juices",
  "Pastries",
  "Breakfast",
  "Light Lunches",
  "Local Specialties",
] as const;

type RawRow = {
  category: string;
  name: string;
  description: string;
  price: string;
  badge: string;
  image: string;
};

/** Read + parse the source menu CSV once, at build time. */
function readMenu(): MenuItem[] {
  const csvPath = path.join(process.cwd(), "docs", "menu-items.csv");
  const file = fs.readFileSync(csvPath, "utf8");
  const { data } = Papa.parse<RawRow>(file, {
    header: true,
    skipEmptyLines: true,
  });

  return data
    .filter((row) => row.name && row.category)
    .map((row) => ({
      category: row.category.trim(),
      name: row.name.trim(),
      description: row.description?.trim() ?? "",
      price: Number.parseInt(row.price, 10) || 0,
      badge: row.badge?.trim() ? row.badge.trim() : undefined,
      image: row.image?.trim() ?? "",
    }));
}

/** All menu items grouped by category, in CATEGORY_ORDER. */
export function loadMenu(): MenuGroup[] {
  const items = readMenu();
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);
}

/** The most-loved items (badged Popular / House Favourite) for the homepage. */
export function getPopularItems(limit = 6): MenuItem[] {
  const items = readMenu();
  const preferred = new Set(["Popular", "House Favourite"]);
  return items.filter((item) => item.badge && preferred.has(item.badge)).slice(0, limit);
}

/** Format an XAF amount the Cameroonian way, e.g. 4500 -> "4 500 FCFA". */
export function formatPrice(price: number): string {
  const grouped = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} FCFA`;
}
