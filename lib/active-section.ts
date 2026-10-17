// Last section whose top has crossed 45% of the viewport; at page bottom, the last section.
export function activeSection(ids: readonly string[], tops: number[], viewportHeight: number, atBottom: boolean) {
  if (atBottom) return ids[ids.length - 1];
  let active = ids[0];
  tops.forEach((top, i) => {
    if (top <= viewportHeight * 0.45) active = ids[i];
  });
  return active;
}
