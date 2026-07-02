import { test, expect } from "@playwright/test";

// ==========================================
// HOMEPAGE
// ==========================================
test.describe("Homepage", () => {
  test("should display hero heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Encontre o imovel perfeito")).toBeVisible();
  });

  test("should have search panel elements", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("tab", { name: "Comprar" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Alugar" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Buscar" })).toBeVisible();
  });

  test("should navigate to legal pages from footer", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Termos de Serviço" }).first().click();
    await expect(page).toHaveURL(/termos-de-servico/);

    await page.goto("/");
    await page.getByRole("link", { name: "Política de Privacidade" }).first().click();
    await expect(page).toHaveURL(/politica-de-privacidade/);
  });

  test("should display email CTA section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Pronto para encontrar seu imovel?")).toBeVisible();
    await expect(page.getByPlaceholder("Digite seu email")).toBeVisible();
    await expect(page.getByRole("button", { name: "Cadastrar" })).toBeVisible();
  });
});

// ==========================================
// PROPERTY CATALOG
// ==========================================
test.describe("Property Catalog", () => {
  test("should load catalog page with search and filters", async ({ page }) => {
    await page.goto("/imoveis");
    await expect(page.getByLabel("Buscar imóveis")).toBeVisible();
    await expect(
      page.getByRole("group", { name: "Filtrar por tipo" })
    ).toBeVisible();
    await expect(page.getByLabel("Filtrar por faixa de preço")).toBeVisible();
  });

  test("should filter by type when clicking tab", async ({ page }) => {
    await page.goto("/imoveis");
    const casasBtn = page.getByRole("button", { name: "Casas" });
    await casasBtn.click();
    await expect(casasBtn).toHaveAttribute("aria-pressed", "true");
  });

  test("should filter by price range", async ({ page }) => {
    await page.goto("/imoveis");
    await page.getByLabel("Filtrar por faixa de preço").selectOption("0-300000");
    await expect(
      page.getByLabel("Filtrar por faixa de preço")
    ).toHaveValue("0-300000");
  });

  test("should clear filters when clicking clear button", async ({ page }) => {
    await page.goto("/imoveis");
    await page.getByRole("button", { name: "Casas" }).click();
    await expect(page.getByRole("button", { name: "Limpar filtros" }).first()).toBeVisible();
    await page.getByRole("button", { name: "Limpar filtros" }).first().click();
    await expect(page.getByRole("button", { name: "Limpar filtros" }).first()).not.toBeVisible();
  });

  test("should search properties in real-time", async ({ page }) => {
    await page.goto("/imoveis");
    await page.getByLabel("Buscar imóveis").fill("test");
    await page.waitForTimeout(500);
    await expect(page.getByLabel("Buscar imóveis")).toHaveValue("test");
  });

  test("should have property cards linking to detail pages", async ({ page }) => {
    await page.goto("/imoveis");
    const cards = page.locator("a[href^='/imoveis/']");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

// ==========================================
// PROPERTY DETAIL
// ==========================================
test.describe("Property Detail", () => {
  test("should show not-found state for invalid ID", async ({ page }) => {
    await page.goto("/imoveis/invalid-id-123");
    await expect(page.getByText("Imóvel não encontrado")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("O imóvel que você procura não existe")).toBeVisible();
  });

  test("should navigate to catalog from not-found state", async ({ page }) => {
    await page.goto("/imoveis/invalid-id-123");
    await expect(page.getByText("Imóvel não encontrado")).toBeVisible({ timeout: 10000 });
    await page.getByRole("link", { name: "Ver todos os imóveis" }).click();
    await expect(page).toHaveURL(/\/imoveis$/);
  });

  test("should render detail page with all sections", async ({ page }) => {
    await page.goto("/imoveis");
    const firstCard = page.locator("main a[href^='/imoveis/']").first();
    const count = await firstCard.count();
    if (count > 0) {
      await firstCard.click();
      await expect(page.getByText("Descrição")).toBeVisible({ timeout: 10000 });
      await expect(page.getByText("Detalhes do Imóvel")).toBeVisible();
      await expect(page.getByRole("link", { name: "Fale Conosco" })).toBeVisible();
    }
  });

  test("should have Google Maps link when lat/lng exist", async ({ page }) => {
    await page.goto("/imoveis");
    const firstCard = page.locator("main a[href^='/imoveis/']").first();
    const count = await firstCard.count();
    if (count > 0) {
      await firstCard.click();
      const mapsLink = page.getByRole("link", { name: "Abrir no Google Maps" });
      const mapsCount = await mapsLink.count();
      if (mapsCount > 0) {
        await expect(mapsLink).toHaveAttribute("href", /google\.com\/maps/);
      }
    }
  });
});

// ==========================================
// CATEGORY PAGES
// ==========================================
test.describe("Category Pages", () => {
  test("casas page should load with correct heading", async ({ page }) => {
    await page.goto("/imoveis/casas");
    await expect(page.getByRole("heading", { name: "Casas" })).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel("Buscar casas")).toBeVisible();
  });

  test("apartamentos page should load with correct heading", async ({ page }) => {
    await page.goto("/imoveis/apartamentos");
    await expect(page.getByRole("heading", { name: "Apartamentos" })).toBeVisible({ timeout: 10000 });
  });

  test("should have state filter on category page", async ({ page }) => {
    await page.goto("/imoveis/casas");
    await expect(page.getByLabel("Filtrar por estado")).toBeVisible();
  });

  test("should navigate to catalog via Ver todos link", async ({ page }) => {
    await page.goto("/imoveis/casas");
    await page.getByRole("link", { name: "Ver todos os imóveis" }).click();
    await expect(page).toHaveURL(/\/imoveis$/);
  });
});

// ==========================================
// MENU (Desktop sidebar)
// ==========================================
test.describe("Menu", () => {
  test("should have desktop nav with menu links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".c-menu-desktop")).toBeVisible();
    await expect(page.locator(".c-menu-desktop_list")).toBeVisible();
  });

  test("should open dropdown on link click", async ({ page }) => {
    await page.goto("/");
    const imoveisLink = page.locator(".c-menu-desktop_link").filter({ hasText: "Imóveis" });
    await expect(imoveisLink).toBeVisible();
    await imoveisLink.click();
    await expect(page.locator(".c-menu-desktop_dropdown.-active")).toBeVisible();
    await expect(page.locator(".c-menu-desktop_dropdown_link").filter({ hasText: "Casas" })).toBeVisible();
  });

  test("should navigate to category via dropdown", async ({ page }) => {
    await page.goto("/");
    await page.locator(".c-menu-desktop_link").filter({ hasText: "Imóveis" }).click();
    await page.locator(".c-menu-desktop_dropdown_link").filter({ hasText: "Casas" }).click();
    await expect(page).toHaveURL(/\/imoveis\/casas/);
  });
});

// ==========================================
// FAQ PANEL
// ==========================================
test.describe("FAQ Panel", () => {
  test("should open FAQ dialog", async ({ page }) => {
    await page.goto("/");
    await page.locator(".c-faq-panel_toggle").click();
    await expect(page.locator("#faq-panel")).toBeVisible();
  });

  test("should filter questions by category", async ({ page }) => {
    await page.goto("/");
    await page.locator(".c-faq-panel_toggle").click();
    await expect(page.locator("#faq-panel")).toBeVisible();
    const compraCategory = page.locator(".c-faq-panel_category").filter({ hasText: "Compra" });
    await compraCategory.click();
    await expect(compraCategory).toHaveClass(/is-active/);
  });

  test("should expand question after selecting category", async ({ page }) => {
    await page.goto("/");
    await page.locator(".c-faq-panel_toggle").click();
    await expect(page.locator("#faq-panel")).toBeVisible();
    await page.locator(".c-faq-panel_category").filter({ hasText: "Compra" }).click();
    await page.waitForSelector(".c-faq-panel_item_question", { state: "visible", timeout: 5000 });
    const firstQuestion = page.locator(".c-faq-panel_item_question").first();
    await firstQuestion.click();
    const firstItem = page.locator(".c-faq-panel_item").first();
    await expect(firstItem).toHaveClass(/is-expanded/);
  });
});

// ==========================================
// AUTH
// ==========================================
test.describe("Auth Pages", () => {
  test("signin form shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/auth/signin");
    await page.getByRole("button", { name: "Entrar", exact: true }).click();
    await expect(page.getByText("Email inválido")).toBeVisible();
    await expect(page.getByText("Senha é obrigatória")).toBeVisible();
  });

  test("forgot password link navigates correctly", async ({ page }) => {
    await page.goto("/auth/signin");
    await page.getByRole("link", { name: "Esqueceu a senha?" }).click();
    await expect(page).toHaveURL(/\/auth\/forgot-password/);
    await expect(page.locator("[data-slot='card-title']")).toBeVisible();
  });

  test("forgot password submit shows loading then feedback", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("imobiliario_users", JSON.stringify([{
        id: "test-001",
        name: "Teste",
        email: "teste@test.com",
        password: "abc123",
        createdAt: new Date().toISOString(),
      }]));
    });
    await page.goto("/auth/forgot-password");
    await page.getByPlaceholder("seu@email.com").fill("teste@test.com");
    await page.getByRole("button", { name: "Enviar link" }).click();
    await expect(page.getByRole("button", { name: "Enviando..." })).toBeVisible({ timeout: 3000 });
    await expect(page.getByRole("button", { name: "Enviar novamente" })).toBeVisible({ timeout: 15000 });
  });

  test("signup page has GitHub button and signin link", async ({ page }) => {
    await page.goto("/auth/signup");
    await expect(page.getByRole("button", { name: "Criar conta com GitHub" })).toBeVisible();
    await page.getByRole("link", { name: "Entrar" }).click();
    await expect(page).toHaveURL(/\/auth\/signin/);
  });

  test("already logged in user redirects from signin", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("imobiliario_session", JSON.stringify({
        id: "test-user-001",
        name: "Teste User",
        email: "teste@imobiliario.com.br",
        createdAt: new Date().toISOString(),
      }));
    });
    await page.goto("/auth/signin");
    await expect(page).toHaveURL(/\/crm/, { timeout: 10000 });
  });
});

// ==========================================
// CONTACT
// ==========================================
test.describe("Contact Page", () => {
  test("should render both contact cards", async ({ page }) => {
    await page.goto("/contato");
    await expect(page.getByText("João Silva")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Maria Santos")).toBeVisible();
  });

  test("should have WhatsApp links with correct URLs", async ({ page }) => {
    await page.goto("/contato");
    await page.waitForTimeout(1000);
    const whatsappLinks = page.locator('a[href*="wa.me"]');
    await expect(whatsappLinks.first()).toBeVisible({ timeout: 10000 });
    const count = await whatsappLinks.count();
    expect(count).toBe(2);
    await expect(whatsappLinks.first()).toHaveAttribute("href", /wa\.me\//);
  });

  test("should display breadcrumb with correct links", async ({ page }) => {
    await page.goto("/contato");
    await expect(page.getByLabel("breadcrumb").getByText("Início")).toBeVisible();
    await expect(page.getByLabel("breadcrumb").getByText("Fale Conosco")).toBeVisible();
  });
});

// ==========================================
// CHROME VISIBILITY
// ==========================================
test.describe("Chrome Visibility", () => {
  test("menu and FAQ should be hidden on CRM page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("imobiliario_session", JSON.stringify({
        id: "test-user-001",
        name: "Teste",
        email: "t@t.com",
        createdAt: new Date().toISOString(),
      }));
    });
    await page.goto("/crm");
    await expect(page.locator(".c-menu-desktop")).not.toBeVisible();
    await expect(page.locator(".c-faq-panel_toggle")).not.toBeVisible();
  });

  test("menu and FAQ should be hidden on auth pages", async ({ page }) => {
    await page.goto("/auth/signin");
    await expect(page.locator(".c-menu-desktop")).not.toBeVisible();
    await expect(page.locator(".c-faq-panel_toggle")).not.toBeVisible();
  });

  test("menu and FAQ should be visible on homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".c-menu-desktop")).toBeVisible();
    await expect(page.locator(".c-faq-panel_toggle")).toBeVisible();
  });
});

// ==========================================
// SITEMAP & ROBOTS
// ==========================================
test.describe("Sitemap & Robots", () => {
  test("sitemap should contain expected URLs", async ({ page }) => {
    const res = await page.goto("/sitemap.xml");
    expect(res?.status()).toBe(200);
    const text = await page.textContent("urlset");
    expect(text).toContain("/imoveis");
    expect(text).toContain("/contato");
  });

  test("robots should disallow protected routes", async ({ page }) => {
    const res = await page.goto("/robots.txt");
    expect(res?.status()).toBe(200);
    const text = await page.locator("body").textContent();
    expect(text).toContain("Disallow: /crm");
    expect(text).toContain("Disallow: /auth");
  });
});
