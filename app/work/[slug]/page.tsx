import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FlowDiagram } from "@/components/flow-diagram";
import { Chips } from "@/components/project-card";
import { featured, getProject } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return featured.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 font-mono text-xs font-bold tracking-widest text-ink uppercase">{title}</h2>
      {children}
    </section>
  );
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const i = featured.indexOf(p);
  const prev = featured[(i - 1 + featured.length) % featured.length];
  const next = featured[(i + 1) % featured.length];

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12 md:px-12 md:py-20">
      <Link href="/#work" className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-leaf-ink hover:underline">
        <ArrowLeft aria-hidden className="size-4" /> Back
      </Link>

      <header className="mt-8 space-y-4">
        <p className="font-mono text-xs tracking-wide text-dim uppercase">
          {p.period} · {p.role}
        </p>
        <h1 className="font-display text-5xl leading-none text-ink uppercase sm:text-6xl">{p.title}</h1>
        <p className="text-lg">{p.summary}</p>
        <p className="text-sm text-dim">Client: {p.client}</p>
        <Chips items={p.stack} />
      </header>

      <Section title="Problem">
        <p>{p.problem}</p>
      </Section>

      <Section title="What I built">
        <ul className="list-disc space-y-2 pl-4 marker:text-leaf">
          {p.built.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section title="Architecture">
        <FlowDiagram nodes={p.diagram} />
        <p className="mt-4 text-sm">{p.diagramNote}</p>
        {p.prototype && <p className="mt-2 text-xs text-dim italic">{p.prototype}</p>}
      </Section>

      {p.highlights.length > 0 && (
        <Section title="Highlights">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {p.highlights.map((h) => (
              <div key={h.label} className="rounded-md border border-sand px-3 py-2">
                <dt className="sr-only">{h.label}</dt>
                <dd className="font-display text-3xl text-leaf-ink">{h.value}</dd>
                <dd className="text-xs text-dim">{h.label}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <nav aria-label="More projects" className="mt-16 flex justify-between gap-4 border-t border-sand pt-6 text-sm">
        <Link href={`/work/${prev.slug}`} className="inline-flex items-center gap-2 text-ink hover:text-leaf-ink">
          <ArrowLeft aria-hidden className="size-4 shrink-0" /> {prev.title}
        </Link>
        <Link href={`/work/${next.slug}`} className="inline-flex items-center gap-2 text-right text-ink hover:text-leaf-ink">
          {next.title} <ArrowRight aria-hidden className="size-4 shrink-0" />
        </Link>
      </nav>
    </main>
  );
}
