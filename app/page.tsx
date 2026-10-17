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
          {/* ponytail: native <details> accordion, no JS */}
          <ul className="border-t-2 border-ink text-sm">
            {other.map((o) => (
              <li key={o.title} className="border-b border-sand">
                <details className="group">
                  <summary className="grid cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-baseline gap-2 py-3 hover:text-leaf-ink [&::-webkit-details-marker]:hidden">
                    <span className="font-mono text-xs text-dim">{o.year}</span>
                    <span>
                      <span className="font-semibold text-ink">{o.title}</span>
                      <span className="block font-mono text-xs text-dim">{o.stack}</span>
                    </span>
                    <span aria-hidden className="font-mono text-base font-bold text-leaf-ink group-open:hidden">+</span>
                    <span aria-hidden className="hidden font-mono text-base font-bold text-leaf-ink group-open:inline">−</span>
                  </summary>
                  <div className="space-y-2 pb-4 pl-14">
                    <p>{o.summary}</p>
                    <ul className="list-disc space-y-1 pl-4 marker:text-leaf">
                      {o.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    {o.href && (
                      <a href={o.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-leaf-ink hover:underline">
                        View on GitHub
                        <ArrowUpRight aria-hidden className="size-3.5" />
                      </a>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" aria-label="Skills" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
          <Heading>Skills</Heading>
          <dl className="border-y border-sand">
            {profile.skills.map((g) => (
              <div key={g.group} className="grid gap-2 border-t border-sand py-3 first:border-t-0 sm:grid-cols-[9rem_1fr]">
                <dt className="font-mono text-[11px] font-bold tracking-widest text-dim uppercase sm:pt-1">{g.group}</dt>
                <dd>
                  <Chips items={g.items} />
                </dd>
              </div>
            ))}
          </dl>
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
