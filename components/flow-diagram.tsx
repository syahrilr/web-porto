import type { DiagramNode } from "@/content/projects";

// ponytail: linear flow only; add branching when a diagram actually needs it
export function FlowDiagram({ nodes }: { nodes: DiagramNode[] }) {
  return (
    <ol aria-label="Architecture" className="flex flex-col items-stretch gap-1 font-mono text-xs sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
      {nodes.map((n, i) => (
        <li key={n.label} className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
          {i > 0 && (
            <span aria-hidden className="text-leaf">
              <span className="sm:hidden">↓</span>
              <span className="hidden sm:inline">→</span>
            </span>
          )}
          <span className="w-full rounded border border-sand bg-white/60 px-3 py-2 text-center text-ink sm:w-auto">
            {n.label}
            {n.sub && <span className="block text-[11px] text-dim">{n.sub}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
