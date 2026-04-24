import { test, expect } from '@playwright/test';

test.describe('Tema oscuro/claro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe tener toggle de tema visible', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toBeVisible();
  });

  test('debe tener icono de luna inicialmente (modo claro)', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    const icon = themeToggle.locator('i');
    await expect(icon).toHaveClass(/fa-moon/);
  });

  test('debe cambiar a tema oscuro al hacer click', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await themeToggle.click();

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('debe cambiar icono a sol cuando está en modo oscuro', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await themeToggle.click();

    const icon = themeToggle.locator('i');
    await expect(icon).toHaveClass(/fa-sun/);
  });

  test('debe persistir preferencia en localStorage', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await themeToggle.click();

    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('dark');
  });

  test('debe restaurar tema oscuro al recargar', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('debe alternar correctamente entre temas', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');

    await themeToggle.click();
    let html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    await themeToggle.click();
    html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'light');

    await themeToggle.click();
    html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });

  test('debe tener aria-label correcto para el toggle', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toHaveAttribute('aria-label', 'Alternar modo oscuro');
  });

  test('debe tener aria-pressed actualizado', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');

    await themeToggle.click();
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'true');
  });
});
