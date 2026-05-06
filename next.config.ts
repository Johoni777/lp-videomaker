import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Allow LAN devices (e.g. phone on the same Wi-Fi) to load /_next/* dev resources.
  // Add the laptop's local IP here. Reflect-discovers nothing — must be explicit.
  allowedDevOrigins: ["192.168.0.126", "*.local"],
};

export default nextConfig;
