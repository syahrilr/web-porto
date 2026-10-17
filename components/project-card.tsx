import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const tone = {
  teal: { stroke: "#2dd4bf", pill: "bg-teal-400/10 text-teal-300", num: "text-teal-300", hover: "hover:border-teal-400/40 hover:shadow-teal-500/15" },
  indigo: { stroke: "#a5b4fc", pill: "bg-indigo-400/15 text-indigo-300", num: "text-indigo-300", hover: "hover:border-indigo-400/40 hover:shadow-indigo-500/15" },
  rose: { stroke: "#fda4af", pill: "bg-rose-400/15 text-rose-300", num: "text-rose-300", hover: "hover:border-rose-400/40 hover:shadow-rose-500/15" },
};
const toneOf: Record<Project["art"], keyof typeof tone> = {
  contour: "teal", grid: "teal", radar: "teal", graph: "indigo", pulse: "rose", flow: "rose",
};

// ponytail: hand-drawn SVG per domain, no image assets (client screenshots are off-limits)
function Art({ kind, color }: { kind: Project["art"]; color: string }) {
  const svg = { className: "absolute inset-0 h-full w-full opacity-50", fill: "none", stroke: color, "aria-hidden": true } as const;
  switch (kind) {
    case "contour":
      return (
        <svg {...svg} viewBox="0 0 520 240" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} opacity={0.5 - i * 0.08} className={i === 4 ? "art-dash" : undefined} strokeDasharray={i === 4 ? "4 6" : undefined}
              d={`M-10 ${200 - i * 30} C${80 + i * 10} ${160 - i * 30} ${160 + i * 10} ${220 - i * 30} ${260 + i * 10} ${180 - i * 30} S${440 + i * 10} ${130 - i * 30} 540 ${170 - i * 30}`} />
          ))}
        </svg>
      );
    case "graph":
      return (
        <svg {...svg} viewBox="0 0 250 180" preserveAspectRatio="xMaxYMid slice">
          <g opacity=".6"><path d="M40 40 120 70 200 30M120 70 170 120M40 40 70 110 170 120" /></g>
          <g fill={color} stroke="none">{[[40, 40, 4], [120, 70, 6], [200, 30, 3], [170, 120, 4], [70, 110, 3]].map(([x, y, r]) => <circle key={x} cx={x} cy={y} r={r} />)}</g>
        </svg>
      );
    case "pulse":
      return (
        <svg {...svg} viewBox="0 0 250 180" preserveAspectRatio="xMaxYMid slice" strokeWidth="1.5">
          <path className="art-dash" strokeDasharray="400" opacity=".7" d="M0 95H70L85 60 100 130 115 40 130 95H250" />
        </svg>
      );
    case "radar":
      return (
        <svg {...svg} viewBox="0 0 520 240" preserveAspectRatio="xMaxYMid slice">
          {[25, 55, 85, 115].map((r, i) => <circle key={r} cx="430" cy="90" r={r} opacity={0.5 - i * 0.1} />)}
          <line className="art-sweep" x1="430" y1="90" x2="430" y2="-25" opacity=".8" style={{ transformOrigin: "430px 90px" }} />
        </svg>
      );
    case "grid":
      return (
        <svg {...svg} viewBox="0 0 250 180" preserveAspectRatio="xMaxYMid slice" fill={color} stroke="none">
          <g opacity=".35">{Array.from({ length: 16 }, (_, i) => <rect key={i} x={150 + (i % 4) * 16} y={20 + Math.floor(i / 4) * 16} width="10" height="10" rx="2" opacity={(i * 7) % 3 ? 1 : 0.4} />)}</g>
        </svg>
      );
    case "flow":
      return (
        <svg {...svg} viewBox="0 0 250 180" preserveAspectRatio="xMaxYMid slice">
          <g opacity=".55">{[20, 60, 100].map((y) => <rect key={y} x="150" y={y} width="70" height="22" rx="4" />)}</g>
          <path className="art-dash" strokeDasharray="4 6" opacity=".7" d="M185 42V60M185 82V100" />
        </svg>
      );
  }
}

export function ProjectTile({ project: p, wide }: { project: Project; wide?: boolean }) {
  const t = tone[toneOf[p.art]];
  const numbers = p.highlights.slice(0, wide ? 2 : 1);
  return (
    <li className={wide ? "sm:col-span-2" : undefined}>
      <Link
        href={`/work/${p.slug}`}
        className={`group relative flex h-full flex-col justify-end gap-2 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800/60 to-slate-900 p-5 shadow-2xl shadow-transparent transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${t.hover} ${wide ? "min-h-60" : "min-h-52"}`}
      >
        <Art kind={p.art} color={t.stroke} />
        <span className={`relative self-start rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest uppercase ${t.pill}`}>{p.tag}</span>
        <h3 className={`relative flex items-baseline gap-1 font-semibold text-slate-200 group-hover:text-white ${wide ? "text-xl" : "text-base"}`}>
          {p.title}
          <ArrowRight aria-hidden className="size-4 shrink-0 translate-y-0.5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </h3>
        {wide && <p className="relative max-w-sm text-sm">{p.summary}</p>}
        <div className="relative flex gap-6">
          {numbers.map((h) => (
            <p key={h.label}>
              <span className={`block font-mono text-3xl leading-none font-bold ${t.num}`}>{h.value}</span>
              <span className="text-xs text-slate-400">{h.label}</span>
            </p>
          ))}
        </div>
        {p.prototype && <p className="relative text-xs text-slate-400 italic">{p.prototype}</p>}
      </Link>
    </li>
  );
}
