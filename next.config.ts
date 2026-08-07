import type { NextConfig } from "next";

function apiImageHosts(): { protocol: "http" | "https"; hostname: string }[] {
  const hosts: { protocol: "http" | "https"; hostname: string }[] = [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "cdn.sanity.io" },
    { protocol: "http", hostname: "localhost" },
    { protocol: "http", hostname: "127.0.0.1" },
  ];

  const apiUrl = process.env.NEXT_PUBLIC_HOTEL_API_URL;
  if (apiUrl) {
    try {
      const parsed = new URL(apiUrl);
      const protocol = parsed.protocol === "http:" ? "http" : "https";
      if (
        !hosts.some(
          (h) => h.hostname === parsed.hostname && h.protocol === protocol
        )
      ) {
        hosts.push({ protocol, hostname: parsed.hostname });
      }
    } catch {
      // ignore invalid env URL
    }
  }

  const imageHost = process.env.NEXT_PUBLIC_API_IMAGE_HOST;
  if (imageHost) {
    const protocol = imageHost.startsWith("http://") ? "http" : "https";
    const hostname = imageHost.replace(/^https?:\/\//, "").split("/")[0];
    if (hostname && !hosts.some((h) => h.hostname === hostname)) {
      hosts.push({ protocol, hostname });
    }
  }

  return hosts;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: apiImageHosts().map(({ protocol, hostname }) => ({
      protocol,
      hostname,
      pathname: "/**",
    })),
    qualities: [75, 90],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
