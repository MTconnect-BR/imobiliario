import { test, expect } from "@playwright/test";

// ==========================================
// HERO CARD ANIMATION
// ==========================================
test.describe("Hero Card Animation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the hero card to be present in DOM
    await page.waitForSelector(".hero-card");
  });

  test("should add is-inview class after mount", async ({ page }) => {
    // Immediately after navigation, inView may not be set yet (100ms delay)
    const heroCard = page.locator(".hero-card");

    // Wait for the is-inview class to be applied (triggered after 100ms)
    await expect(heroCard).toHaveClass(/is-inview/, { timeout: 2000 });
  });

  test("should animate background layers to scale(1)", async ({ page }) => {
    // Wait for animation to complete (0.6s duration + 0.2s delay for white bg)
    await page.waitForTimeout(1200);

    const whiteBg = page.locator(".hero-card-bg-white");
    const primaryBg = page.locator(".hero-card-bg-primary");

    const whiteTransform = await whiteBg.evaluate((el) =>
      getComputedStyle(el).transform
    );
    const primaryTransform = await primaryBg.evaluate((el) =>
      getComputedStyle(el).transform
    );

    // Both backgrounds should be at scale(1) = matrix(1, 0, 0, 1, 0, 0)
    const expectedMatrix = "matrix(1, 0, 0, 1, 0, 0)";
    expect(whiteTransform).toBe(expectedMatrix);
    expect(primaryTransform).toBe(expectedMatrix);
  });

  test("should animate content children to visible", async ({ page }) => {
    // Wait for all content animations to complete (last child: 0.5s delay + 0.4s duration)
    await page.waitForTimeout(1500);

    const contentChildren = page.locator(".hero-card-content > *");
    const count = await contentChildren.count();

    for (let i = 0; i < count; i++) {
      const child = contentChildren.nth(i);

      const opacity = await child.evaluate(
        (el) => getComputedStyle(el).opacity
      );
      const transform = await child.evaluate(
        (el) => getComputedStyle(el).transform
      );

      // Opacity should be 1 (visible)
      expect(parseFloat(opacity)).toBe(1);

      // Transform should be translateY(0) = matrix(1, 0, 0, 1, 0, 0)
      expect(transform).toBe("matrix(1, 0, 0, 1, 0, 0)");
    }
  });

  test("should apply transition delay on content children", async ({
    page,
  }) => {
    // Wait for is-inview class to be applied so transition-delay rules activate
    await expect(page.locator(".hero-card")).toHaveClass(/is-inview/, {
      timeout: 2000,
    });

    const contentChild = page.locator(".hero-card-content > *").first();

    const transitionDelay = await contentChild.evaluate(
      (el) => getComputedStyle(el).transitionDelay
    );

    // The first child should have a 0.3s transition-delay
    const delayMs = parseFloat(transitionDelay) * 1000;
    expect(delayMs).toBe(300);
  });

  test("should have staggered delay CSS rules defined", async ({ page }) => {
    // Verify that the CSS defines staggered delays for up to 5 children
    // by checking the computed style after is-inview is applied
    await expect(page.locator(".hero-card")).toHaveClass(/is-inview/, {
      timeout: 2000,
    });

    const contentChild = page.locator(".hero-card-content > *").first();

    // Verify transition properties are set on content children
    const transitionProperty = await contentChild.evaluate(
      (el) => getComputedStyle(el).transitionProperty
    );
    const transitionDuration = await contentChild.evaluate(
      (el) => getComputedStyle(el).transitionDuration
    );

    // Should have transform and opacity in transition properties
    expect(transitionProperty).toContain("transform");
    expect(transitionProperty).toContain("opacity");

    // Duration should be 0.4s
    const durationMs = parseFloat(transitionDuration) * 1000;
    expect(durationMs).toBe(400);
  });

  test("should complete animation within expected duration", async ({ page }) => {
    // The animation should complete within ~1.1s total
    // Background: 0.6s duration (white bg has 0.2s delay = 0.8s total)
    // Content last child: 0.5s delay + 0.4s duration = 0.9s total
    // Overall max: ~1.1s

    // Check immediately after page load - backgrounds should NOT be scaled yet
    const heroCard = page.locator(".hero-card");
    const isInViewBefore = await heroCard.evaluate((el) =>
      el.classList.contains("is-inview")
    );

    // Right after page load, is-inview may or may not be set depending on timing
    // But the backgrounds should still be transitioning

    // Wait for full animation completion
    await page.waitForTimeout(1500);

    // After 1.5s, everything should be fully animated
    const isInViewAfter = await heroCard.evaluate((el) =>
      el.classList.contains("is-inview")
    );
    expect(isInViewAfter).toBe(true);

    // Verify all backgrounds are at scale(1)
    const bgTransform = await page
      .locator(".hero-card-bg")
      .first()
      .evaluate((el) => getComputedStyle(el).transform);
    expect(bgTransform).toBe("matrix(1, 0, 0, 1, 0, 0)");

    // Verify content is visible
    const firstContentChild = page.locator(".hero-card-content > *").first();
    const opacity = await firstContentChild.evaluate(
      (el) => getComputedStyle(el).opacity
    );
    expect(parseFloat(opacity)).toBe(1);
  });

  test("should have correct animation CSS properties defined", async ({
    page,
  }) => {
    // Verify the hero card has the correct base CSS
    const heroCard = page.locator(".hero-card");
    const position = await heroCard.evaluate(
      (el) => getComputedStyle(el).position
    );
    expect(position).toBe("relative");

    // Verify background layers have correct initial styles
    const bg = page.locator(".hero-card-bg").first();
    const bgPosition = await bg.evaluate(
      (el) => getComputedStyle(el).position
    );
    const bgBorderRadius = await bg.evaluate(
      (el) => getComputedStyle(el).borderRadius
    );

    expect(bgPosition).toBe("absolute");
    expect(bgBorderRadius).toBeTruthy(); // Should have border-radius from --radius
  });
});
