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

    const menuSurface = await page
      .getByRole("navigation", { name: "Navigation mobile" })
      .evaluate((node) => {
        const styles = getComputedStyle(node);
        return {
          backgroundColor: styles.backgroundColor,
          zIndex: Number(styles.zIndex),
        };
      });

    expect(menuSurface.backgroundColor).toBe("rgb(5, 5, 5)");
    expect(menuSurface.zIndex).toBeGreaterThan(0);
  });

  test("balances the landing page art direction", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/fr");

    await expect(page.locator(".hero-depth-waves > span")).toHaveCount(3);
    await expect(page.locator("[data-drc-map]")).toBeVisible();
    await expect(page.locator(".map-location")).toHaveCount(3);
    await expect(page.getByText("Kinshasa", { exact: true })).toBeVisible();

    const layout = await page.evaluate(() => {
      const brand = document.querySelector(".brand-mark")!;
      const brandImage = brand.querySelector("img")!;
      const nav = document.querySelector(".desktop-nav a")!;
      const heroTitle = document.querySelector(".hero h1")!;
      const leftHand = document.querySelector(".hero-hand-left")!;
      const rightHand = document.querySelector(".hero-hand-right")!;
      const section = document.querySelector(".value-section")!;
      const wordmark = document.querySelector(".footer-wordmark")!;
      const wave = document.querySelector(".hero-depth-waves > span")!;
      const brandBox = brand.getBoundingClientRect();
      const brandImageBox = brandImage.getBoundingClientRect();
      const leftBox = leftHand.getBoundingClientRect();
      const rightBox = rightHand.getBoundingClientRect();
      const navSize = Number.parseFloat(getComputedStyle(nav).fontSize);
      const heroSize = Number.parseFloat(getComputedStyle(heroTitle).fontSize);

      return {
        brandWidth: brandBox.width,
        brandHeight: brandBox.height,
        brandImageWidth: brandImageBox.width,
        brandImageHeight: brandImageBox.height,
        typeRatio: heroSize / navSize,
        handGap: rightBox.left - leftBox.right,
        sectionPadding: Number.parseFloat(getComputedStyle(section).paddingTop),
        wordmarkSize: Number.parseFloat(getComputedStyle(wordmark).fontSize),
        waveAnimation: getComputedStyle(wave).animationName,
      };
    });

    expect(layout.brandWidth).toBeGreaterThanOrEqual(48);
    expect(layout.brandImageWidth).toBe(layout.brandWidth);
    expect(layout.brandImageHeight).toBe(layout.brandHeight);
    expect(layout.typeRatio).toBeLessThanOrEqual(7);
    expect(layout.handGap).toBeLessThanOrEqual(280);
    expect(layout.sectionPadding).toBeLessThanOrEqual(128);
    expect(layout.wordmarkSize).toBeLessThanOrEqual(144);
    expect(layout.waveAnimation).toContain("underwater-wave");
  });

  test("honours reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/fr");

    const motionLayer = page.locator("[data-motion-layer]");
    await expect(motionLayer).toHaveAttribute("data-motion", "reduced");
  });

  test("uses the Deep Red template direction in blue and violet", async ({
    page,
  }) => {
    await page.goto("/fr");

    const site = page.locator(".public-site");
    await expect(site).toHaveAttribute(
      "data-art-direction",
      "deep-blue-violet",
    );
    await expect(page.locator(".hero-atmosphere")).toBeVisible();
    await expect(page.locator(".hero-hand")).toHaveCount(2);

    const styles = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      const title = getComputedStyle(document.querySelector(".hero h1")!);
      const firstCard = getComputedStyle(
        document.querySelector(".capability-card")!,
      );
      const atmosphere = getComputedStyle(
        document.querySelector(".hero-atmosphere")!,
      );

      return {
        background: body.backgroundColor,
        fontFamily: title.fontFamily,
        firstCardBackground: firstCard.backgroundColor,
        atmosphereFilter: atmosphere.filter,
      };
    });

    expect(styles.background).toBe("rgb(5, 5, 5)");
    expect(styles.fontFamily).toContain("Playfair Display");
    expect(styles.firstCardBackground).toBe("rgb(37, 99, 235)");
    expect(styles.atmosphereFilter).toContain("hue-rotate(210deg)");
  });
});
