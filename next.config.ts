import type { NextConfig } from "next";

function supabaseImageHost(): string | undefined {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!u?.trim()) return undefined;
  try {
    return new URL(u).hostname;
  } catch {
    return undefined;
  }
}

const supabaseHost = supabaseImageHost();

const nextConfig: NextConfig = {
  images: {
    ...(supabaseHost
      ? {
          remotePatterns: [
            {
              protocol: "https",
              hostname: supabaseHost,
              pathname: "/storage/v1/object/public/**",
            },
          ],
        }
      : {}),
  },
};

export default nextConfig;
