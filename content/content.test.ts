import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { profile } from "./profile.ts";
import { featured, other, getProject } from "./projects.ts";
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

test("tile headline numbers", () => {
  assert.deepEqual(getProject("water-rag")!.highlights.slice(0, 2).map((h) => h.value), ["5", "460+"]);
  assert.equal(getProject("flood-knowledge-graph")!.highlights[0].value, "154");
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
