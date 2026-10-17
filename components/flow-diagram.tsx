import type { DiagramNode } from "@/content/projects";

// ponytail: linear flow only; add branching when a diagram actually needs it
export function FlowDiagram({ nodes, compact }: { nodes: DiagramNode[]; compact?: boolean }) {
  return (
    <ol
      aria-label="Architecture"
      className={`flex font-mono ${compact ? "flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px]" : "flex-col items-stretch gap-1 text-xs sm:flex-row sm:flex-wrap sm:items-center sm:gap-2"}`}
    >
      {nodes.map((n, i) => (
        <li key={n.label} className={`flex items-center ${compact ? "gap-1.5" : "flex-col gap-1 sm:flex-row sm:gap-2"}`}>
          {i > 0 && (
            <span aria-hidden className="text-teal-300/70">
              {compact ? "→" : <><span className="sm:hidden">↓</span><span className="hidden sm:inline">→</span></>}
            </span>
          )}
          <span className={`rounded border border-slate-700 bg-slate-800/60 text-slate-300 ${compact ? "px-1.5 py-0.5" : "w-full px-3 py-2 text-center sm:w-auto"}`}>
            {n.label}
            {!compact && n.sub && <span className="block text-[11px] text-slate-400">{n.sub}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
