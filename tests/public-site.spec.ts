import { expect, test } from "@playwright/test";

test.describe("public website", () => {
  test("renders the locale in the server document", async ({ request }) => {
    const response = await request.get("/en");
    const html = await response.text();

    expect(response.ok()).toBe(true);
    expect(html).toMatch(/<html[^>]+lang="en"/);
  });

  test("explains the French positioning and exposes all conversions", async ({
    page,
  }) => {
    await page.goto("/fr");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /structure chaque besoin, mobilise les partenaires/i,
      }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("link", { name: "Confier un besoin", exact: true })
        .first(),
    ).toBeVisible();
    await expect(
      page
        .getByRole("link", { name: "Rejoindre le réseau", exact: true })
        .first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Nous contacter", exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByText("info@octopusexpertise.com")).toBeVisible();
    await expect(page.getByText("+32 485 36 88 03")).toBeVisible();
    await expect(page.getByText("+243 974 849 528")).toBeVisible();
  });

  test("switches to complete English content", async ({ page }) => {
    await page.goto("/fr");
    await page.getByRole("link", { name: "EN", exact: true }).click();

    await expect(page).toHaveURL(/\/en$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /structures every need, mobilises the most relevant partners/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Submit a need", exact: true }).first(),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("reveals contextual orchestration details", async ({ page }) => {
    await page.goto("/fr");
    await page
      .getByRole("tab", { name: "Capacités requises", exact: true })
      .click();

    await expect(
      page.getByRole("tabpanel").getByText(/compétences nécessaires/i),
    ).toBeVisible();
  });

  test("serves specified public pages without invented platform evidence", async ({
    page,
  }) => {
    await page.goto("/fr/methode");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "De l’expression du besoin à la validation du résultat.",
      }),
    ).toBeVisible();

    await page.goto("/fr/plateforme");
    await expect(page.getByText(/aucune démonstration fictive/i)).toBeVisible();
  });

  test("keeps mobile navigation usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/fr");
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();

    await expect(
      page.getByRole("navigation", { name: "Navigation mobile" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Méthode", exact: true }).last(),
    ).toBeVisible();
  });

  test("honours reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/fr");

    const motionLayer = page.locator("[data-motion-layer]");
    await expect(motionLayer).toHaveAttribute("data-motion", "reduced");
  });
});
