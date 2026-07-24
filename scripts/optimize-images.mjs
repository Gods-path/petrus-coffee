// One-off: download the Pexels stock photos used across the site, resize them for
// web use, and write WebP versions into public/images. Re-runnable and idempotent.
//
//   node scripts/optimize-images.mjs
//
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.join(process.cwd(), "public", "images");
const QUALITY = 80;

// Per-image target width (longest edge). Chosen for how each is displayed.
const HERO = 1920;
const WIDE = 1600;
const FEATURE = 1280;
const CARD = 900;
const THUMB = 480;

const widthFor = new Map([
  [2079448, HERO], // home hero background
  [6612572, WIDE], // menu page header
  [30444143, THUMB], // small bean detail
  // large feature images (events + about/story)
  [14715215, FEATURE],
  [22938072, FEATURE],
  [1855214, FEATURE],
  [35516348, FEATURE],
  [7601665, FEATURE],
  [7125419, FEATURE],
  [36729801, FEATURE],
]);

// All unique photo IDs referenced in the app.
const IDS = [
  997670, 1855214, 2067432, 2079448, 2616164, 3850374, 3850992, 4299700, 4869428,
  6169449, 6612572, 6747870, 7125419, 7601665, 7660433, 7773671, 8352785, 9136977,
  9452278, 9822688, 11009205, 13915043, 13915068, 13994299, 14715215, 15362507,
  17581159, 17612807, 17612822, 17952745, 18805640, 19202829, 19873648, 22938072,
  28617425, 29843061, 30444143, 30900665, 31822992, 31823001, 32542054, 33376829,
  33739660, 34759311, 34835064, 35516348, 36729801, 37538487,
];

const pexelsUrl = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const failures = [];
  let totalBytes = 0;

  for (const id of IDS) {
    const width = widthFor.get(id) ?? CARD;
    // Fetch slightly larger than the target so the downscale stays crisp.
    const url = pexelsUrl(id, Math.round(width * 1.5));
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (image-optimize script)" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const input = Buffer.from(await res.arrayBuffer());
      const output = await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer();
      const outPath = path.join(OUT_DIR, `photo-${id}.webp`);
      await writeFile(outPath, output);
      totalBytes += output.length;
      console.log(
        `ok   photo-${id}.webp  ${String(width).padStart(4)}w  ${(output.length / 1024).toFixed(0)} KB`,
      );
    } catch (err) {
      console.error(`FAIL photo-${id}  ${err.message}`);
      failures.push(id);
    }
  }

  console.log(
    `\nDone. ${IDS.length - failures.length}/${IDS.length} images, ${(totalBytes / 1024 / 1024).toFixed(2)} MB total.`,
  );
  if (failures.length) {
    console.error(`Failures: ${failures.join(", ")}`);
    process.exit(1);
  }
}

run();
