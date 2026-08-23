import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Pin the project root so Next doesn't pick up a stray lockfile in a parent folder.
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
