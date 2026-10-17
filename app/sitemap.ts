import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { featured } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...featured.map((p) => `/work/${p.slug}`)].map((path) => ({ url: `${profile.siteUrl}${path}` }));
}
