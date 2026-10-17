"use client";

import { useEffect, useState } from "react";
import { activeSection } from "@/lib/active-section";

export function SectionNav({ ids }: { ids: readonly string[] }) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      const tops = ids.map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity);
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      setActive(activeSection(ids, tops, innerHeight, atBottom));
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [ids]);

  return (
    <nav aria-label="In-page" className="hidden lg:block">
      <ul className="mt-12 w-max space-y-1">
        {ids.map((id) => {
          const on = id === active;
          return (
            <li key={id}>
              <a href={`#${id}`} aria-current={on || undefined} className="group flex items-center py-2">
                <span className={`mr-4 h-px bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 motion-reduce:transition-none ${on ? "w-16 bg-slate-200" : "w-8"}`} />
                <span className={`font-mono text-xs font-bold tracking-widest uppercase group-hover:text-slate-200 ${on ? "text-slate-200" : "text-slate-400"}`}>
                  {id}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
