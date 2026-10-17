import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { template: "%s · Syahril Ramadhan", default: "Syahril Ramadhan — Full-Stack & AI Engineer" },
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}>
      <body>{children}</body>
    </html>
  );
}
