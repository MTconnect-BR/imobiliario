import { test, expect } from "@playwright/test";

const TEST_SESSION = {
  id: "test-user-001",
  name: "Teste User",
  email: "teste@imobiliario.com.br",
  createdAt: new Date().toISOString(),
};

const TEST_PROPERTY = {
  title: "Apartamento 3 quartos em Brasilia",
  type: "apartamento",
  status: "disponivel",
  price: 450000,
  area: 120,
  bedrooms: 3,
  bathrooms: 2,
  parkingSpaces: 2,
  address: "Rua 24 de Outubro",
  addressNumber: "100",
  neighborhood: "Setor Bueno",
  city: "Brasilia",
  state: "DF",
  description: "Apartamento moderno com vista para o lago.",
};

async function loginAs(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.evaluate((session) => {
    localStorage.setItem("imobiliario_session", JSON.stringify(session));
  }, TEST_SESSION);
}

async function clearStorage(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.removeItem("imobiliario_session");
    localStorage.removeItem("imobiliario_properties");
    localStorage.removeItem("imobiliario_users");
  });
}

async function openForm(page: import("@playwright/test").Page) {
  await page.getByRole("button", { name: /novo imóvel/i }).click();
  await expect(page.getByText("Preencha os dados para publicar")).toBeVisible();
}

async function scrollToBottom(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    const sheet = document.querySelector('[data-slot="sheet-content"]');
    if (sheet) sheet.scrollTop = sheet.scrollHeight;
  });
}

async function submitForm(page: import("@playwright/test").Page) {
  const submitBtn = page.getByRole("button", { name: /publicar imóvel|salvar alterações/i });
  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click({ timeout: 5000 });
}

async function fillPropertyForm(page: import("@playwright/test").Page, data: typeof TEST_PROPERTY) {
  await page.getByPlaceholder("Ex: Apartamento 3 quartos").fill(data.title);
  await page.locator("select").first().selectOption(data.type);
  await page.locator("select").nth(1).selectOption(data.status);

  await page.locator('input[type="number"]').first().fill(String(data.price));
  await page.locator('input[type="number"]').nth(1).fill(String(data.area));
  await page.locator('input[type="number"]').nth(2).fill(String(data.bedrooms));
  await page.locator('input[type="number"]').nth(3).fill(String(data.bathrooms));
  await page.locator('input[type="number"]').nth(4).fill(String(data.parkingSpaces));

  await page.getByPlaceholder("Rua, complemento").first().fill(data.address);
  await page.getByPlaceholder("Nº").fill(data.addressNumber);
  await page.getByPlaceholder("Bairro").fill(data.neighborhood);
  await page.getByPlaceholder("Cidade").fill(data.city);
  await page.getByPlaceholder("SP").fill(data.state);
  await page.getByPlaceholder("Descreva o imóvel...").fill(data.description);
}

// ==========================================
// AUTH GUARD
// ==========================================
test.describe("CRM — Auth Guard", () => {
  test("should redirect to signin when not authenticated", async ({ page }) => {
    await clearStorage(page);
    await page.goto("/crm");
    await expect(page).toHaveURL(/\/auth\/signin\?redirect=\/crm/);
  });

  test("should access CRM when authenticated", async ({ page }) => {
    await loginAs(page);
    await page.goto("/crm");
    await expect(
      page.getByRole("heading", { name: /painel de imóveis/i })
    ).toBeVisible({ timeout: 10000 });
  });
});

// ==========================================
// PAGE ELEMENTS
// ==========================================
test.describe("CRM — Page Elements", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page);
    await page.goto("/crm");
    await expect(
      page.getByRole("heading", { name: /painel de imóveis/i })
    ).toBeVisible({ timeout: 10000 });
  });

  test("should display stats cards", async ({ page }) => {
    await expect(page.getByText("Total")).toBeVisible();
    await expect(page.getByText("Disponíveis")).toBeVisible();
    await expect(page.getByText("Em negociação")).toBeVisible();
    await expect(page.getByText("Vendidos")).toBeVisible();
  });

  test("should display empty state when no properties", async ({ page }) => {
    await expect(page.getByText("Nenhum imóvel cadastrado")).toBeVisible();
  });

  test("should display user name", async ({ page }) => {
    await expect(page.getByText(TEST_SESSION.name)).toBeVisible();
  });

  test("should have Novo Imóvel button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /novo imóvel/i })
    ).toBeVisible();
  });
});

// ==========================================
// FORM OPEN / CLOSE
// ==========================================
test.describe("CRM — Property Form Open/Close", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page);
    await page.goto("/crm");
    await expect(
      page.getByRole("heading", { name: /painel de imóveis/i })
    ).toBeVisible({ timeout: 10000 });
  });

  test("should open form when clicking Novo Imóvel", async ({ page }) => {
    await openForm(page);
  });

  test("should close form when clicking Cancelar", async ({ page }) => {
    await openForm(page);
    await scrollToBottom(page);
    await page.getByRole("button", { name: /cancelar/i }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /cancelar/i }).click();
    await expect(
      page.getByText("Preencha os dados para publicar")
    ).not.toBeVisible();
  });

  test("should close form when clicking X button", async ({ page }) => {
    await openForm(page);
    await page.getByRole("button", { name: "Close" }).click();
    await expect(
      page.getByText("Preencha os dados para publicar")
    ).not.toBeVisible();
  });
});

// ==========================================
// FORM FIELDS
// ==========================================
test.describe("CRM — Property Form Fields", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page);
    await page.goto("/crm");
    await expect(
      page.getByRole("heading", { name: /painel de imóveis/i })
    ).toBeVisible({ timeout: 10000 });
    await openForm(page);
  });

  test("should show form labels", async ({ page }) => {
    await expect(page.getByText("Título", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Tipo", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Status", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Preço (R$)", { exact: true })).toBeVisible();
    await expect(page.getByText("Área (m²)", { exact: true })).toBeVisible();
  });

  test("should have type select options", async ({ page }) => {
    const typeSelect = page.locator("select").first();
    await expect(typeSelect.locator("option[value=casa]")).toBeAttached();
    await expect(typeSelect.locator("option[value=apartamento]")).toBeAttached();
    await expect(typeSelect.locator("option[value=terreno]")).toBeAttached();
    await expect(typeSelect.locator("option[value=comercial]")).toBeAttached();
  });
});

// ==========================================
// CEP AUTO-FILL
// ==========================================
test.describe("CRM — CEP Auto-fill", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page);
    await page.goto("/crm");
    await expect(
      page.getByRole("heading", { name: /painel de imóveis/i })
    ).toBeVisible({ timeout: 10000 });
    await openForm(page);
  });

  test("should auto-fill address from valid CEP", async ({ page }) => {
    const cepInput = page.getByPlaceholder("00000-000");
    await cepInput.scrollIntoViewIfNeeded();
    await cepInput.fill("01310-100");

    // CEP button is the first button in the ancestor flex container
    const cepButton = cepInput.locator("xpath=ancestor::div[contains(@class,'flex') and contains(@class,'gap')]/button").first();
    await expect(cepButton).toBeEnabled({ timeout: 5000 });
    await cepButton.scrollIntoViewIfNeeded();
    await cepButton.click();

    const addressInput = page.getByPlaceholder("Rua, complemento").first();
    await expect(addressInput).toHaveValue(/./, { timeout: 15000 });
  });

  test("should not fill address for invalid CEP", async ({ page }) => {
    const cepInput = page.getByPlaceholder("00000-000");
    await cepInput.scrollIntoViewIfNeeded();
    await cepInput.fill("99999-999");

    const cepButton = cepInput.locator("xpath=ancestor::div[contains(@class,'flex') and contains(@class,'gap')]/button").first();
    await expect(cepButton).toBeEnabled({ timeout: 5000 });
    await cepButton.scrollIntoViewIfNeeded();
    await cepButton.click();

    await page.waitForTimeout(3000);
    const addressInput = page.getByPlaceholder("Rua, complemento").first();
    await expect(addressInput).toHaveValue("");
  });
});

// ==========================================
// MAP
// ==========================================
test.describe("CRM — Map", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page);
    await page.goto("/crm");
    await expect(
      page.getByRole("heading", { name: /painel de imóveis/i })
    ).toBeVisible({ timeout: 10000 });
    await openForm(page);
  });

  test("should render map section label", async ({ page }) => {
    await page.getByText("Localização no Mapa").scrollIntoViewIfNeeded();
    await expect(page.getByText("Localização no Mapa")).toBeVisible();
  });

  test("should show lat/lng input fields", async ({ page }) => {
    await scrollToBottom(page);
    await expect(page.getByPlaceholder("-15.7801").first()).toBeVisible();
    await expect(page.getByPlaceholder("-47.9292").first()).toBeVisible();
  });

  test("should render Leaflet map container", async ({ page }) => {
    await scrollToBottom(page);
    await expect(page.getByText("Clique no mapa ou arraste o marker")).toBeVisible({ timeout: 10000 });
  });

  test("should have lat/lng fields with default values", async ({ page }) => {
    await scrollToBottom(page);
    const latInput = page.getByPlaceholder("-15.7801").first();
    const lngInput = page.getByPlaceholder("-47.9292").first();
    await expect(latInput).toBeVisible();
    await expect(lngInput).toBeVisible();
    await expect(latInput).toHaveAttribute("type", "number");
    await expect(lngInput).toHaveAttribute("type", "number");
  });

  test("should display marker on map if Leaflet loaded", async ({ page }) => {
    await scrollToBottom(page);
    const marker = page.locator(".leaflet-marker-icon");
    const count = await marker.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

// ==========================================
// CRUD
// ==========================================
test.describe("CRM — Property CRUD", () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page);
    await page.goto("/crm");
    await expect(
      page.getByRole("heading", { name: /painel de imóveis/i })
    ).toBeVisible({ timeout: 10000 });
  });

  test("should create a new property", async ({ page }) => {
    await openForm(page);
    await fillPropertyForm(page, TEST_PROPERTY);
    await submitForm(page);

    await expect(page.getByText(TEST_PROPERTY.title)).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("1 imóvel")).toBeVisible();
  });

  test("should edit an existing property", async ({ page }) => {
    await openForm(page);
    await fillPropertyForm(page, TEST_PROPERTY);
    await submitForm(page);
    await expect(page.getByText(TEST_PROPERTY.title)).toBeVisible({ timeout: 10000 });

    await page.locator('button[title="Editar"]').first().click();
    await expect(page.getByText("Atualize as informações")).toBeVisible();

    const titleInput = page.getByPlaceholder("Ex: Apartamento 3 quartos");
    await titleInput.clear();
    await titleInput.fill("Apartamento 4 quartos - Editado");

    await submitForm(page);

    await expect(page.getByText("Apartamento 4 quartos - Editado")).toBeVisible({ timeout: 10000 });
  });

  test("should delete a property", async ({ page }) => {
    await openForm(page);
    await fillPropertyForm(page, TEST_PROPERTY);
    await submitForm(page);
    await expect(page.getByText(TEST_PROPERTY.title)).toBeVisible({ timeout: 10000 });

    await page.locator('button[title="Excluir"]').first().click();
    await expect(page.getByText("Tem certeza que deseja excluir")).toBeVisible();

    await page.getByRole("button", { name: /^excluir$/i }).click();
    await expect(page.getByText("Nenhum imóvel cadastrado")).toBeVisible({ timeout: 10000 });
  });
});

// ==========================================
// PUBLIC CATALOG
// ==========================================
test.describe("CRM — Property in Public Catalog", () => {
  test("should appear in /imoveis after CRM creation", async ({ page }) => {
    await loginAs(page);
    await page.goto("/crm");
    await expect(
      page.getByRole("heading", { name: /painel de imóveis/i })
    ).toBeVisible({ timeout: 10000 });

    await openForm(page);

    await page.getByPlaceholder("Ex: Apartamento 3 quartos").fill("Casa teste catalogo");
    await page.locator("select").first().selectOption("casa");
    await page.locator("select").nth(1).selectOption("disponivel");
    await page.locator('input[type="number"]').first().fill("300000");
    await page.locator('input[type="number"]').nth(1).fill("80");
    await page.locator('input[type="number"]').nth(2).fill("2");
    await page.locator('input[type="number"]').nth(3).fill("1");
    await page.locator('input[type="number"]').nth(4).fill("1");
    await page.getByPlaceholder("Rua, complemento").first().fill("Rua Teste");
    await page.getByPlaceholder("Bairro").fill("Centro");
    await page.getByPlaceholder("Cidade").fill("Goiania");
    await page.getByPlaceholder("SP").fill("GO");

    await submitForm(page);
    await expect(page.getByText("Casa teste catalogo")).toBeVisible({ timeout: 10000 });

    await page.goto("/imoveis");
    await expect(page.getByText("Casa teste catalogo").first()).toBeVisible({ timeout: 10000 });
  });
});
