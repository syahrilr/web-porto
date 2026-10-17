import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { groupByYear, type Project } from "@/content/projects";

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li key={t}>
          <Badge className="rounded-full bg-sand font-mono text-[11px] text-leaf-ink">{t}</Badge>
        </li>
      ))}
    </ul>
  );
}

const tone = {
  leaf: { stroke: "#10935b", label: "text-leaf-ink", num: "text-leaf" },
  ink: { stroke: "#101010", label: "text-dim", num: "text-ink" },
  coral: { stroke: "#e8465e", label: "text-coral-ink", num: "text-coral" },
};
const toneOf: Record<Project["art"], keyof typeof tone> = {
  contour: "leaf", grid: "leaf", radar: "leaf", graph: "ink", pulse: "coral", flow: "coral",
};

// ponytail: hand-drawn SVG per domain, no image assets (client screenshots are off-limits)
function Art({ kind, color }: { kind: Project["art"]; color: string }) {
  const svg = { className: "absolute inset-y-0 right-20 hidden h-full w-2/5 opacity-30 sm:block", viewBox: "0 0 160 80", preserveAspectRatio: "xMidYMid meet", fill: "none", stroke: color, "aria-hidden": true } as const;
  switch (kind) {
    case "contour":
      return (
        <svg {...svg}>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} className={i === 3 ? "art-dash" : undefined} strokeDasharray={i === 3 ? "4 6" : undefined} d={`M0 ${66 - i * 14} C40 ${50 - i * 14} 70 ${74 - i * 14} 100 ${58 - i * 14} S140 ${44 - i * 14} 160 ${54 - i * 14}`} />
          ))}
        </svg>
      );
    case "graph":
      return (
        <svg {...svg}>
          <path d="M40 20 90 42 140 14M90 42 120 68M40 20 60 62 120 68" />
          <g fill={color} stroke="none">{[[40, 20, 3], [90, 42, 5], [140, 14, 3], [120, 68, 4], [60, 62, 3]].map(([x, y, r]) => <circle key={x} cx={x} cy={y} r={r} />)}</g>
        </svg>
      );
    case "pulse":
      return (
        <svg {...svg} strokeWidth="1.5">
          <path className="art-dash" strokeDasharray="300" d="M0 44H60L70 20 80 64 90 10 100 44H160" />
        </svg>
      );
    case "radar":
      return (
        <svg {...svg}>
          {[10, 22, 34].map((r) => <circle key={r} cx="110" cy="40" r={r} />)}
          <line className="art-sweep" x1="110" y1="40" x2="110" y2="4" style={{ transformOrigin: "110px 40px" }} />
        </svg>
      );
    case "grid":
      return (
        <svg {...svg} fill={color} stroke="none">
          {Array.from({ length: 12 }, (_, i) => <rect key={i} x={70 + (i % 4) * 14} y={16 + Math.floor(i / 4) * 14} width="9" height="9" rx="2" opacity={(i * 7) % 3 ? 1 : 0.4} />)}
        </svg>
      );
    case "flow":
      return (
        <svg {...svg}>
          {[8, 32, 56].map((y) => <rect key={y} x="80" y={y} width="50" height="16" rx="3" />)}
          <path className="art-dash" strokeDasharray="3 5" d="M105 24V32M105 48V56" />
        </svg>
      );
  }
}

function Entry({ project: p }: { project: Project }) {
  const t = tone[toneOf[p.art]];
  const h = p.highlights[0];
  return (
    <li>
      <Link
        href={`/work/${p.slug}`}
        className="group relative grid grid-cols-[1fr_auto] items-center gap-4 overflow-hidden rounded-xl border border-sand bg-white/50 px-4 py-3 transition hover:-translate-y-0.5 hover:border-ink hover:bg-white/80 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <Art kind={p.art} color={t.stroke} />
        <div className="relative">
          <p className={`font-mono text-[10px] font-semibold tracking-widest uppercase ${t.label}`}>
            {p.period} · {p.tag}
          </p>
          <h3 className="mt-0.5 flex items-baseline gap-1 font-semibold text-ink">
            {p.title}
            <ArrowRight aria-hidden className="size-4 shrink-0 translate-y-0.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </h3>
          {p.prototype && <p className="text-xs text-dim italic">{p.prototype}</p>}
        </div>
        {h && (
          <p className="relative text-right">
            <span className={`block font-display leading-none ${h.value.length > 6 ? "text-2xl" : "text-3xl"} ${t.num}`}>{h.value}</span>
            <span className="text-[11px] text-dim">{h.label}</span>
          </p>
        )}
      </Link>
    </li>
  );
}

export function Timeline({ projects }: { projects: Project[] }) {
  return (
    <ol className="border-b-2 border-ink">
      {groupByYear(projects).map((g) => (
        <li key={g.year} className="grid gap-4 border-t-2 border-ink py-5 sm:grid-cols-[8rem_1fr]">
          <p>
            <span className="block font-display text-6xl leading-none text-ink">{g.year}</span>
            <span className="mt-2 block font-mono text-[10px] font-bold tracking-widest text-dim uppercase">
              {g.items.length} {g.items.length === 1 ? "project" : "projects"}
            </span>
          </p>
          <ul className="space-y-2">
            {g.items.map((p) => (
              <Entry key={p.slug} project={p} />
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
