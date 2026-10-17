import { ArrowUpRight } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Chips, Timeline } from "@/components/project-card";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { featured, other } from "@/content/projects";

function Heading({ children }: { children: string }) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 bg-paper/85 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
      <h2 className="font-mono text-sm font-bold tracking-widest text-ink uppercase">{children}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:flex lg:justify-between lg:gap-4 lg:px-24 lg:py-0">
      <Sidebar />
      <main className="pt-24 lg:w-[56%] lg:py-24">
        <section id="work" aria-label="Selected work" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
          <Heading>Selected work</Heading>
          <Timeline projects={featured} />

          <h3 className="mt-16 mb-4 font-mono text-xs font-bold tracking-widest text-ink uppercase">Other work</h3>
          <ul className="divide-y divide-sand text-sm">
            {other.map((o) => (
              <li key={o.title} className="grid gap-1 py-3 sm:grid-cols-8 sm:gap-6">
                <span className="font-mono text-xs text-dim sm:col-span-1 sm:pt-0.5">{o.year}</span>
                <span className="sm:col-span-7">
                  {o.href ? (
                    <a href={o.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-ink hover:text-leaf-ink focus-visible:text-leaf-ink">
                      {o.title}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  ) : (
                    <span className="font-medium text-ink">{o.title}</span>
                  )}
                  <span className="block font-mono text-xs text-dim">{o.stack}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="experience" aria-label="Experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
          <Heading>Experience</Heading>
          <ol className="space-y-12">
            {experience.map((j) => (
              <li key={j.company} className="grid gap-2 sm:grid-cols-8 sm:gap-6">
                <p className="mt-1 font-mono text-xs tracking-wide text-dim uppercase sm:col-span-2">{j.period}</p>
                <div className="space-y-3 sm:col-span-6">
                  <h3 className="font-medium text-ink">
                    {j.title} · <span className="text-leaf-ink">{j.company}</span>
                  </h3>
                  <p className="text-sm">{j.summary}</p>
                  <ul className="list-disc space-y-1 pl-4 text-sm marker:text-dim">
                    {j.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <Chips items={j.stack} />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="about" aria-label="About" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
          <Heading>About</Heading>
          <div className="space-y-4">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <footer className="max-w-md pb-16 text-sm text-dim sm:pb-0">
          <p>Built with Next.js &amp; Tailwind CSS, deployed on Vercel.</p>
          <a href={`mailto:${profile.email}`} className="font-medium text-dim hover:text-leaf-ink focus-visible:text-leaf-ink">
            {profile.email}
          </a>
        </footer>
      </main>
    </div>
  );
}
