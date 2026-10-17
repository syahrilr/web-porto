import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FlowDiagram } from "@/components/flow-diagram";
import type { Project } from "@/content/projects";

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t}>
          <Badge className="rounded-full bg-teal-400/10 font-mono text-[11px] text-teal-300">{t}</Badge>
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <li className="group relative grid gap-2 pb-1 transition-opacity motion-reduce:transition-none sm:grid-cols-8 sm:gap-6 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
      <div aria-hidden className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50" />
      <p className="z-10 mt-1 font-mono text-xs tracking-wide text-slate-400 uppercase sm:col-span-2">{p.period}</p>
      <div className="z-10 space-y-3 sm:col-span-6">
        <h3>
          <Link
            href={`/work/${p.slug}`}
            className="group/link inline-flex items-baseline gap-1 font-medium text-slate-200 before:absolute before:-inset-x-4 before:-inset-y-4 before:rounded-md hover:text-teal-300 focus-visible:text-teal-300 focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-teal-300 lg:before:-inset-x-6"
          >
            {p.title}
            <ArrowRight aria-hidden className="size-4 translate-y-0.5 transition-transform group-hover/link:translate-x-1 motion-reduce:transition-none" />
          </Link>
        </h3>
        <p className="text-sm">{p.summary}</p>
        <FlowDiagram nodes={p.diagram} compact />
        {p.prototype && <p className="text-xs text-slate-400 italic">{p.prototype}</p>}
        <Chips items={p.stack} />
      </div>
    </li>
  );
}
