const { test, expect } = require('@playwright/test');

test.describe('Busqueda rapida', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const searchInput = page.locator('#search-input');
    if (await searchInput.isVisible()) {
      await searchInput.scrollIntoViewIfNeeded();
    }
  });

  test('debe mostrar campo de busqueda en el hero', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', /Buscar servicios o productos/i);
  });

  test('debe filtrar servicios por nombre', async ({ page }) => {
    await page.fill('#search-input', 'sofás');
    await page.waitForTimeout(300);

    const visibleCards = page.locator('#servicios .searchable-item:not(.hidden)');
    const count = await visibleCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe mostrar todos los elementos cuando el campo esta vacio', async ({ page }) => {
    await page.fill('#search-input', '');
    await page.waitForTimeout(300);

    const allCards = page.locator('.searchable-item');
    const count = await allCards.count();
    const hiddenCards = page.locator('.searchable-item.hidden');
    const hiddenCount = await hiddenCards.count();
    expect(count).toBeGreaterThan(0);
    expect(hiddenCount).toBe(0);
  });

  test('debe mostrar mensaje cuando no hay coincidencias', async ({ page }) => {
    await page.fill('#search-input', 'xyz123noexiste');
    await page.waitForTimeout(300);

    const statusEl = page.locator('#search-status');
    if (await statusEl.isVisible()) {
      await expect(statusEl).toContainText(/no se encontraron/i);
    }

    const hiddenCards = page.locator('.searchable-item.hidden');
    const count = await hiddenCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe filtrar por tipo de servicio', async ({ page }) => {
    await page.fill('#search-input', 'servicio');
    await page.waitForTimeout(300);

    const visibleServices = page.locator('#servicios .searchable-item:not(.hidden)');
    const count = await visibleServices.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe filtrar productos correctamente', async ({ page }) => {
    await page.fill('#search-input', 'kit');
    await page.waitForTimeout(300);

    const visibleProducts = page.locator('#productos .searchable-item:not(.hidden)');
    const count = await visibleProducts.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe buscar con texto en mayusculas y minusculas', async ({ page }) => {
    await page.fill('#search-input', 'LIMPIEZA');
    await page.waitForTimeout(300);

    const visible1 = page.locator('.searchable-item:not(.hidden)');
    const count1 = await visible1.count();

    await page.fill('#search-input', 'limpieza');
    await page.waitForTimeout(300);

    const visible2 = page.locator('.searchable-item:not(.hidden)');
    const count2 = await visible2.count();

    expect(count1).toBe(count2);
  });
});

test.describe('Campo de busqueda accesible', () => {
  test('debe tener label accesible', async ({ page }) => {
    const label = page.locator('label[for="search-input"]');
    await expect(label).toBeAttached();
  });

  test('debe permitir borrado con backspace', async ({ page }) => {
    await page.fill('#search-input', 'sofás');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');

    const value = await page.inputValue('#search-input');
    expect(value.length).toBeLessThan(5);
  });
});