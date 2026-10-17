import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { profile } from "./profile.ts";
import { featured, other, getProject, groupByYear, LAYERS } from "./projects.ts";
import { experience } from "./experience.ts";

test("featured slugs in spec order", () =>
  assert.deepEqual(
    featured.map((p) => p.slug),
    ["water-rag", "flood-knowledge-graph", "visual-etl", "scada-tag-master", "clinical-decision-support", "rainfall-nowcasting"],
  ));

test("featured project shape", () => {
  for (const p of featured) {
    assert.ok(p.diagram.length >= 3 && p.diagram.length <= 6, p.slug);
    assert.ok(p.built.length >= 1 && p.built.length <= 6, p.slug);
    assert.ok(p.stack.length > 0 && p.highlights.length <= 4, p.slug);
    assert.equal(getProject(p.slug), p);
  }
});

test("bento tile fields", () => {
  for (const p of featured) {
    assert.ok(p.tag.length > 0, p.slug);
    assert.ok(["contour", "graph", "flow", "grid", "pulse", "radar"].includes(p.art), p.slug);
  }
  assert.deepEqual(featured.map((p) => p.art), ["contour", "graph", "flow", "grid", "pulse", "radar"]);
});

test("timeline starts from git history", () =>
  assert.deepEqual(
    Object.fromEntries(featured.map((p) => [p.slug, p.start])),
    {
      "water-rag": "2025-11",
      "flood-knowledge-graph": "2026-06",
      "visual-etl": "2026-04",
      "scada-tag-master": "2026-07",
      "clinical-decision-support": "2026-03",
      "rainfall-nowcasting": "2025-10",
    },
  ));

test("groupByYear: newest year first, newest start first", () =>
  assert.deepEqual(
    groupByYear(featured).map((g) => [g.year, g.items.map((p) => p.slug)]),
    [
      ["2026", ["scada-tag-master", "flood-knowledge-graph", "visual-etl", "clinical-decision-support"]],
      ["2025", ["water-rag", "rainfall-nowcasting"]],
    ],
  ));

test("tile headline numbers", () => {
  assert.deepEqual(getProject("water-rag")!.highlights.slice(0, 2).map((h) => h.value), ["5", "460+"]);
  assert.equal(getProject("flood-knowledge-graph")!.highlights[0].value, "154");
});

test("diagram layers match approved mapping", () => {
  const byLayer = (slug: string) =>
    Object.fromEntries(LAYERS.map((l) => [l, getProject(slug)!.diagram.filter((n) => n.layer === l).map((n) => n.label)]));
  assert.deepEqual(byLayer("water-rag"), {
    Sources: ["SCADA & historians"], Data: ["Ingest", "Stores"], Services: ["Router", "LLM"], Interface: ["Chat UI"],
  });
  assert.deepEqual(byLayer("flood-knowledge-graph"), {
    Sources: ["SCADA HMI"], Data: ["MongoDB historian", "Neo4j graph"], Services: ["Express API"], Interface: ["Next.js dashboard"],
  });
  assert.deepEqual(byLayer("visual-etl"), {
    Sources: ["CSV / API sources"], Data: ["Neo4j"], Services: ["Cypher generator", "LLM copilot"], Interface: ["Visual mapper"],
  });
  assert.deepEqual(byLayer("scada-tag-master"), {
    Sources: ["Tag workbook"], Data: ["MongoDB master data"], Services: ["Express API", "Historian lookup"], Interface: ["React dashboard"],
  });
  assert.deepEqual(byLayer("clinical-decision-support"), {
    Sources: ["SIMPUS records"], Data: ["Neo4j clinical graph"], Services: ["MCP server", "CDSS API"], Interface: ["Clinic web app"],
  });
  assert.deepEqual(byLayer("rainfall-nowcasting"), {
    Sources: ["BMKG radar"], Data: ["MongoDB"], Services: ["Rain detection", "Optical-flow nowcast"], Interface: ["Dashboard"],
  });
});

test("skills grouped by approved categories", () =>
  assert.deepEqual(profile.skills.map((g) => g.group), ["Languages", "AI & Retrieval", "Data", "Backend", "Frontend", "Ops & Tools"]));

test("every skill group has items, no duplicates", () => {
  const all = profile.skills.flatMap((g) => g.items);
  assert.ok(profile.skills.every((g) => g.items.length > 0));
  assert.equal(new Set(all).size, all.length);
});

test("other work has accordion details", () => {
  for (const o of other) {
    assert.ok(o.summary.length > 20, o.title);
    assert.ok(o.bullets.length >= 1 && o.bullets.length <= 3, o.title);
  }
});

test("unknown slug", () => assert.equal(getProject("nope"), undefined));

test("hero stats exact", () =>
  assert.deepEqual(profile.stats, [
    { value: "1,000+", label: "commits in 2026" },
    { value: "25+", label: "projects built" },
    { value: "3", label: "industries" },
  ]));

// ponytail: term list lives in a gitignored file so the repo itself never names clients
const termsFile = new URL("./confidential.txt", import.meta.url);
const terms = existsSync(termsFile) ? readFileSync(termsFile, "utf8").split(/\r?\n/).filter(Boolean) : [];
const leaks = (text: string) => terms.filter((t) => new RegExp(`\\b${t}\\b`, "i").test(text));

test("content has no confidential terms", { skip: !terms.length && "content/confidential.txt missing" }, () =>
  assert.deepEqual(leaks(JSON.stringify({ profile, featured, other, experience })), []));

test("tracked files have no confidential terms", { skip: !terms.length && "content/confidential.txt missing" }, () => {
  const files = execFileSync("git", ["ls-files"], { encoding: "utf8" }).split("\n").filter(Boolean);
  const hits = files.flatMap((f) => leaks(readFileSync(f, "utf8")).map((t) => `${f}: ${t}`));
  assert.deepEqual(hits, []);
});

test("no phone number", () =>
  assert.doesNotMatch(JSON.stringify({ profile, experience }), /\+62|0895/));
