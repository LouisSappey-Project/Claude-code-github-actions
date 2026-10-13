import { test } from "node:test";
import assert from "node:assert/strict";
import { parse } from "./articles.ts";

const ok = "---\ntitle: T\ndescription: D\n\ndate: 2026-10-01\n---\n## Titre\n";

test("parse un article valide, ignore les lignes sans ':'", () => {
  const a = parse("a", ok);
  assert.equal(a.title, "T");
  assert.equal(a.date, "2026-10-01");
  assert.match(a.html, /<h2>Titre<\/h2>/);
});

test("accepte les fins de ligne Windows", () => {
  assert.equal(parse("a", ok.replace(/\n/g, "\r\n")).title, "T");
});

test("refuse une date invalide ou un champ manquant", () => {
  assert.throws(() => parse("a", ok.replace("2026-10-01", "1er octobre")), /Date invalide/);
  assert.throws(() => parse("a", ok.replace("title: T\n", "")), /title/);
});
