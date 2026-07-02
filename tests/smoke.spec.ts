import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should display the hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("should have search panel", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /buscar/i })).toBeVisible();
  });
});

test.describe("Imóveis Page", () => {
  test("should display the catalog page", async ({ page }) => {
    await page.goto("/imoveis");
    await expect(
      page.getByRole("heading", { name: /imóvel perfeito/i })
    ).toBeVisible();
  });

  test("should have search input", async ({ page }) => {
    await page.goto("/imoveis");
    await expect(page.getByPlaceholder(/buscar/i)).toBeVisible();
  });

  test("should have type filter buttons", async ({ page }) => {
    await page.goto("/imoveis");
    await expect(page.getByRole("button", { name: /todos/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /casas/i })).toBeVisible();
  });
});

test.describe("Contato Page", () => {
  test("should display contact cards", async ({ page }) => {
    await page.goto("/contato");
    await expect(
      page.getByRole("heading", { name: /fale conosco/i })
    ).toBeVisible();
  });
});

test.describe("Auth Pages", () => {
  test("signin page should render", async ({ page }) => {
    await page.goto("/auth/signin");
    await expect(
      page.getByText("Entrar na sua conta")
    ).toBeVisible();
  });

  test("forgot-password page should render", async ({ page }) => {
    await page.goto("/auth/forgot-password");
    await expect(
      page.getByText("Redefinir senha", { exact: true })
    ).toBeVisible();
  });
});

test.describe("Legal Pages", () => {
  test("terms of service page should render", async ({ page }) => {
    await page.goto("/termos-de-servico");
    await expect(
      page.getByRole("heading", { name: /termos de serviço/i })
    ).toBeVisible();
  });

  test("privacy policy page should render", async ({ page }) => {
    await page.goto("/politica-de-privacidade");
    await expect(
      page.getByRole("heading", { name: /política de privacidade/i })
    ).toBeVisible();
  });
});
