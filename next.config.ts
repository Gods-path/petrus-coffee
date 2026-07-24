import type { NextConfig } from "next";

// All site imagery now lives locally in public/images (optimized WebP), so no
// remote image hosts need to be allow-listed. See scripts/optimize-images.mjs.
const nextConfig: NextConfig = {};

export default nextConfig;
