import { test, expect } from '@playwright/test';

test.describe('Búsqueda de servicios y productos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe mostrar el campo de búsqueda en el hero', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await expect(searchInput).toBeVisible();
  });

  test('debe tener placeholder correcto', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await expect(searchInput).toHaveAttribute('placeholder', 'Buscar servicios o productos...');
  });

  test('debe mostrar todos los elementos al buscar texto vacío', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('');
    await searchInput.dispatchEvent('input');

    const searchableItems = page.locator('.searchable-item');
    const count = await searchableItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe filtrar servicios al buscar "sofá"', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('sofá');
    await searchInput.dispatchEvent('input');

    await page.waitForTimeout(100);

    const visibleItems = page.locator('.searchable-item:not(.hidden)');
    const count = await visibleItems.count();
    expect(count).toBeGreaterThan(0);

    const hiddenItems = page.locator('.searchable-item.hidden');
    const hiddenCount = await hiddenItems.count();
    expect(hiddenCount).toBeGreaterThan(0);
  });

  test('debe encontrar productos al buscar "kit"', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('kit');
    await searchInput.dispatchEvent('input');

    await page.waitForTimeout(100);

    const visibleItems = page.locator('.searchable-item:not(.hidden)');
    const firstItem = await visibleItems.first();
    await expect(firstItem).toContainText(/kit/i);
  });

  test('debe mostrar mensaje de no resultados para búsqueda sin coincidencias', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('xyznonexistent123');
    await searchInput.dispatchEvent('input');

    await page.waitForTimeout(100);

    const status = page.locator('#search-status');
    await expect(status).toContainText('No se encontraron coincidencias');
  });

  test('debe ser case-insensitive', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('COLCHÓN');
    await searchInput.dispatchEvent('input');

    await page.waitForTimeout(100);

    const visibleItems = page.locator('.searchable-item:not(.hidden)');
    const count = await visibleItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe normalizar caracteres con tildes', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('colchon');
    await searchInput.dispatchEvent('input');

    await page.waitForTimeout(100);

    const visibleItems = page.locator('.searchable-item:not(.hidden)');
    const count = await visibleItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe restaurar todos los resultados al limpiar búsqueda', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('sofá');
    await searchInput.dispatchEvent('input');
    await page.waitForTimeout(100);

    await searchInput.fill('');
    await searchInput.dispatchEvent('input');
    await page.waitForTimeout(100);

    const hiddenItems = page.locator('.searchable-item.hidden');
    const count = await hiddenItems.count();
    expect(count).toBe(0);
  });
});

test.describe('Búsqueda - Segmentos y tipos', () => {
  test('debe filtrar por segmento "hogares"', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('hogares');
    await searchInput.dispatchEvent('input');

    await page.waitForTimeout(100);

    const visibleItems = page.locator('.searchable-item:not(.hidden)');
    const count = await visibleItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe encontrar servicios de empresas al buscar "corporativa"', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('corporativa');
    await searchInput.dispatchEvent('input');

    await page.waitForTimeout(100);

    const visibleItems = page.locator('.searchable-item:not(.hidden)');
    const count = await visibleItems.count();
    expect(count).toBeGreaterThan(0);
  });
});
