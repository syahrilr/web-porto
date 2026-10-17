import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Spotlight } from "@/components/spotlight";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { template: "%s · Syahril Ramadhan", default: "Syahril Ramadhan — Full-Stack & AI Engineer" },
  description: profile.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Spotlight />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
