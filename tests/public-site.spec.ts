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
        name: "Au centre de l'interaction métier",
      }),
    ).toBeVisible();
    await expect(page.locator(".hero .hero-eyebrow")).toHaveCount(0);
    await expect(page.locator(".hero .hero-intro")).toHaveCount(0);
    await expect(page.locator(".hero .hero-actions")).toHaveCount(0);
    await expect(page.locator(".hero .proof-line")).toHaveCount(0);
    await expect(page.locator(".hero")).not.toContainText("Lualaba");
    await expect(page.locator(".hero")).not.toContainText("Kolwezi");
    await expect(page.locator(".hero")).not.toContainText("Qualification");
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
        name: "Your business gateway",
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
          opacity: styles.opacity,
          overflowY: styles.overflowY,
          position: styles.position,
          zIndex: Number(styles.zIndex),
          rect: node.getBoundingClientRect().toJSON(),
        };
      });

    expect(menuSurface.backgroundColor).toBe("rgb(5, 5, 5)");
    expect(menuSurface.opacity).toBe("1");
    expect(menuSurface.overflowY).toBe("auto");
    expect(menuSurface.position).toBe("fixed");
    expect(menuSurface.rect.width).toBe(390);
    expect(menuSurface.rect.height).toBe(844);
    expect(menuSurface.zIndex).toBeGreaterThan(0);
  });

  test("balances the landing page art direction", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/fr");

    await expect(page.locator(".hero-wave-field > span")).toHaveCount(3);
    await expect(page.locator("[data-hero-cube-animation]")).toBeVisible();
    await expect(page.locator("[data-hero-cube-animation]")).toHaveAttribute(
      "data-render-ready",
      "true",
      { timeout: 15_000 },
    );
    await expect(page.locator(".hero-cube-canvas")).toBeVisible();
    await expect(page.locator(".hero .scroll-cue")).toHaveCount(0);
    await expect(page.locator("[data-drc-map-art]")).toBeVisible();
    await expect(page.locator(".map-region")).toHaveCount(3);
    await expect(page.locator(".partner-dashboard")).toBeVisible();
    await expect(page.locator(".partner-signal")).toHaveCount(6);
    await expect(page.locator(".network-core")).toHaveCount(0);

    const layout = await page.evaluate(() => {
      const brand = document.querySelector(".brand-mark")!;
      const brandImage = brand.querySelector("img")!;
      const nav = document.querySelector(".desktop-nav a")!;
      const heroTitle = document.querySelector(".hero h1")!;
      const leftHand = document.querySelector(".hero-hand-left")!;
      const rightHand = document.querySelector(".hero-hand-right")!;
      const section = document.querySelector(".value-section")!;
      const wordmark = document.querySelector(".footer-wordmark")!;
      const waveField = document.querySelector(".hero-wave-field")!;
      const wave = document.querySelector(".hero-wave-field > span")!;
      const cubeStage = document.querySelector("[data-hero-cube-animation]")!;
      const firstPillar = document.querySelector(".pillar-card")!;
      const firstTab = document.querySelector(".orchestration-tabs button")!;
      const panelTitle = document.querySelector(".orchestration-panel h3")!;
      const brandBox = brand.getBoundingClientRect();
      const brandImageBox = brandImage.getBoundingClientRect();
      const leftBox = leftHand.getBoundingClientRect();
      const rightBox = rightHand.getBoundingClientRect();
      const navSize = Number.parseFloat(getComputedStyle(nav).fontSize);
      const heroSize = Number.parseFloat(getComputedStyle(heroTitle).fontSize);
      const tabSize = Number.parseFloat(getComputedStyle(firstTab).fontSize);
      const panelTitleSize = Number.parseFloat(
        getComputedStyle(panelTitle).fontSize,
      );
      const cubeBox = cubeStage.getBoundingClientRect();
      const heroBox = heroTitle.getBoundingClientRect();

      return {
        brandWidth: brandBox.width,
        brandHeight: brandBox.height,
        brandImageWidth: brandImageBox.width,
        brandImageHeight: brandImageBox.height,
        brandObjectFit: getComputedStyle(brandImage).objectFit,
        typeRatio: heroSize / navSize,
        panelTypeRatio: panelTitleSize / tabSize,
        tabSize,
        cubeBeforeTitle: cubeBox.bottom <= heroBox.top + 12,
        pillarHeight: firstPillar.getBoundingClientRect().height,
        handGap: rightBox.left - leftBox.right,
        sectionPadding: Number.parseFloat(getComputedStyle(section).paddingTop),
        wordmarkSize: Number.parseFloat(getComputedStyle(wordmark).fontSize),
        waveAnimation: getComputedStyle(wave).animationName,
        wavePerspective: getComputedStyle(waveField).perspective,
        waveTransformStyle: getComputedStyle(wave).transformStyle,
      };
    });

    expect(layout.brandWidth).toBeGreaterThanOrEqual(168);
    expect(layout.brandHeight).toBeGreaterThanOrEqual(56);
    expect(layout.brandImageWidth).toBe(layout.brandWidth);
    expect(layout.brandImageHeight).toBe(layout.brandHeight);
    expect(layout.brandObjectFit).toBe("cover");
    expect(layout.typeRatio).toBeLessThanOrEqual(4);
    expect(layout.panelTypeRatio).toBeLessThanOrEqual(4);
    expect(layout.tabSize).toBeGreaterThanOrEqual(15);
    expect(layout.cubeBeforeTitle).toBe(true);
    expect(layout.pillarHeight).toBeLessThanOrEqual(320);
    expect(layout.handGap).toBeLessThanOrEqual(140);
    expect(layout.sectionPadding).toBeLessThanOrEqual(128);
    expect(layout.wordmarkSize).toBeLessThanOrEqual(144);
    expect(layout.waveAnimation).toContain("hero-wave-swell");
    expect(layout.wavePerspective).not.toBe("none");
    expect(layout.waveTransformStyle).toBe("preserve-3d");
  });

  test("places readable regional spheres over the DRC map", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/fr");

    const map = page.locator(".territory-map");
    await map.scrollIntoViewIfNeeded();
    const expected = {
      Kinshasa: [0.332, 0.485],
      Lualaba: [0.585, 0.7],
      "Haut-Katanga": [0.675, 0.755],
    } as const;

    for (const [name, [expectedX, expectedY]] of Object.entries(expected)) {
      const region = page.getByRole("img", { name, exact: true });
      await expect(region).toBeVisible();
      const geometry = await region.evaluate((node) => {
        const mapBox = node.parentElement!.getBoundingClientRect();
        const box = node.getBoundingClientRect();
        return {
          x: (box.left + box.width / 2 - mapBox.left) / mapBox.width,
          y: (box.top + box.height / 2 - mapBox.top) / mapBox.height,
          size: box.width,
        };
      });
      expect(Math.abs(geometry.x - expectedX)).toBeLessThan(0.035);
      expect(Math.abs(geometry.y - expectedY)).toBeLessThan(0.035);
      expect(geometry.size).toBeGreaterThanOrEqual(52);
      await region.hover();
      await expect(region.locator(".map-region-label")).toBeVisible();
      await expect(region.locator(".map-region-label")).toHaveText(name);
    }
  });

  test("collapses the cube stage when its atlas cannot load", async ({
    page,
  }) => {
    await page.route("**/images/professions-atlas.webp", (route) =>
      route.abort(),
    );
    await page.goto("/fr");

    const stage = page.locator("[data-hero-cube-animation]");
    await expect(stage).toHaveAttribute("data-render-error", "true");
    await expect(stage).toBeHidden();
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
    expect(styles.atmosphereFilter).toMatch(
      /hue-rotate\((?:20[7-9]|21[0-4])(?:\.\d+)?deg\)/,
    );
  });
});
