import { LAYERS, type DiagramNode } from "@/content/projects";

const lane = {
  Sources: "bg-sand text-dim",
  Data: "bg-leaf/12 text-leaf-ink",
  Services: "bg-ink/5 text-ink",
  Interface: "bg-coral/10 text-coral-ink",
} as const;

// Layered architecture: one band per layer, top (sources) to bottom (interface).
export function FlowDiagram({ nodes }: { nodes: DiagramNode[] }) {
  const lanes = LAYERS.map((l) => ({ layer: l, items: nodes.filter((n) => n.layer === l) })).filter((l) => l.items.length);
  return (
    <ol aria-label="Architecture" className="space-y-1">
      {lanes.map(({ layer, items }, i) => (
        <li key={layer}>
          {i > 0 && (
            <span aria-hidden className="block py-0.5 font-mono font-bold text-leaf sm:pl-32">
              ↓
            </span>
          )}
          <div className={`grid items-center gap-2 rounded-xl p-3 sm:grid-cols-[7rem_1fr] ${lane[layer]}`}>
            <p className="font-mono text-[10px] font-bold tracking-widest uppercase">{layer}</p>
            <ul className="flex flex-wrap gap-3">
              {items.map((n) => (
                <li key={n.label} className="rounded-lg border-[1.5px] border-ink bg-white px-3 py-1.5 shadow-[3px_3px_0_#101010]">
                  <span className="block text-sm font-semibold text-ink">{n.label}</span>
                  {n.sub && <span className="block font-mono text-[11px] text-dim">{n.sub}</span>}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
