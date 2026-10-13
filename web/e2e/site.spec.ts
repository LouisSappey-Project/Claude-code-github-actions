import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("l'accueil liste les articles et mène à un article", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Derniers articles");
  await page.getByRole("link", { name: "Le permis solidaire, comment ça marche ?" }).click();
  await expect(page).toHaveURL(/\/articles\/permis-solidaire$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Le permis solidaire, comment ça marche ?");
});

test("une page article a son SEO : title, description, canonical, JSON-LD", async ({ page }) => {
  await page.goto("/articles/permis-solidaire");
  await expect(page).toHaveTitle("Le permis solidaire, comment ça marche ? | Le Média Auto");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /permis de conduire/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/articles\/permis-solidaire$/);
  const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  expect(jsonLd).toMatchObject({ "@type": "Article", datePublished: "2026-09-15" });
  await expect(page.locator("time")).toHaveText("15 septembre 2026");
});

test("la page À propos a son h1, son SEO et un lien dans l'en-tête", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("banner").getByRole("link", { name: "À propos" }).click();
  await expect(page).toHaveURL(/\/a-propos$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("À propos");
  await expect(page).toHaveTitle("À propos | Le Média Auto");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /conseils pratiques/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/a-propos$/);
});

test("un article inconnu n'est pas indexable", async ({ page }) => {
  await page.goto("/articles/nexiste-pas");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
});

test("le sitemap et robots.txt listent les articles", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("/articles/permis-solidaire</loc>");
  expect(sitemap).toContain("/articles/entretien-voiture-hiver</loc>");
  expect(sitemap).toContain("/a-propos</loc>");
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
});

for (const path of ["/", "/a-propos", "/articles/permis-solidaire"]) {
  test(`aucune violation d'accessibilité sur ${path}`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
}
