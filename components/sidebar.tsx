import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionNav } from "@/components/section-nav";
import { profile } from "@/content/profile";

const sections = ["work", "skills", "experience", "about"] as const;

export function Sidebar() {
  const links = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "Email", href: `mailto:${profile.email}` },
  ].filter((l) => l.href);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[44%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-3 py-1 font-mono text-[11px] font-semibold text-leaf-ink">
          <span className="size-2 rounded-full bg-leaf" aria-hidden />
          {profile.status}
        </p>
        <h1 className="mt-5 font-display text-6xl leading-[0.92] text-ink uppercase sm:text-7xl">{profile.name}</h1>
        <p className="mt-4 text-lg font-semibold text-ink">{profile.role}</p>
        <p className="mt-3 max-w-sm">{profile.tagline}</p>

        <dl className="mt-8 grid max-w-sm grid-cols-3 gap-3">
          {profile.stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-sand px-3 py-2">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl text-leaf-ink">{s.value}</dd>
              <dd className="text-xs text-dim">{s.label}</dd>
            </div>
          ))}
        </dl>

        <SectionNav ids={sections} />
      </div>

      <ul className="mt-8 flex flex-wrap items-center gap-5 text-sm" aria-label="Links">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-ink hover:text-leaf-ink">
              {l.label}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </li>
        ))}
        {profile.resumeUrl && (
          <li>
            <a href={profile.resumeUrl} className={buttonVariants({ variant: "outline", size: "sm" })}>
              Résumé
            </a>
          </li>
        )}
      </ul>
    </header>
  );
}
