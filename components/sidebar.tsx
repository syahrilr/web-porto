import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionNav } from "@/components/section-nav";
import { profile } from "@/content/profile";

const sections = ["work", "experience", "about"] as const;

export function Sidebar() {
  const links = [
    { label: "GitHub", href: profile.links.github },
    { label: "LinkedIn", href: profile.links.linkedin },
    { label: "Email", href: `mailto:${profile.email}` },
  ].filter((l) => l.href);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-teal-400/10 px-3 py-1 font-mono text-xs text-teal-300">
          <span className="size-2 rounded-full bg-green-400" aria-hidden />
          {profile.status}
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">{profile.name}</h1>
        <h2 className="mt-3 text-lg font-medium text-slate-200 sm:text-xl">{profile.role}</h2>
        <p className="mt-4 max-w-sm">{profile.tagline}</p>

        <dl className="mt-8 grid max-w-sm grid-cols-3 gap-3">
          {profile.stats.map((s) => (
            <div key={s.label} className="rounded-md border border-slate-800 px-3 py-2">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-xl font-semibold text-teal-300">{s.value}</dd>
              <dd className="text-xs text-slate-400">{s.label}</dd>
            </div>
          ))}
        </dl>

        <SectionNav ids={sections} />
      </div>

      <ul className="mt-8 flex flex-wrap items-center gap-5 text-sm" aria-label="Links">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-slate-300 hover:text-teal-300 focus-visible:text-teal-300">
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
