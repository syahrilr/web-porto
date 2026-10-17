import { test } from "node:test";
import assert from "node:assert/strict";
import { activeSection } from "./active-section.ts";

const ids = ["work", "experience", "about"];

test("top of page → first section", () => assert.equal(activeSection(ids, [96, 2400, 3600], 900, false), "work"));
test("section past 45% line becomes active", () => assert.equal(activeSection(ids, [-1500, 300, 1500], 900, false), "experience"));
test("tall viewport at page bottom → last section even if its top is low", () =>
  assert.equal(activeSection(ids, [-3000, -900, 1000], 1600, true), "about"));
test("nothing reached yet → first section", () => assert.equal(activeSection(ids, [600, 2000, 3000], 900, false), "work"));
