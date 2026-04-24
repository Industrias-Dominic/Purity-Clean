const { test, expect } = require('@playwright/test');

test.describe('Tema oscuro', () => {
  test('debe tener boton de toggle de tema', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toBeVisible();
  });

  test('debe tener icono de luna por defecto', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');
    const icon = themeToggle.locator('i');
    const iconClass = await icon.getAttribute('class');
    expect(iconClass).toContain('moon');
  });

  test('debe cambiar a tema claro al hacer click', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');

    await themeToggle.click();

    const htmlTheme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    expect(htmlTheme).toBe('light');
  });

  test('debe cambiar icono a sol cuando esta en modo claro', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');

    await themeToggle.click();

    const icon = themeToggle.locator('i');
    const iconClass = await icon.getAttribute('class');
    expect(iconClass).toContain('sun');
  });

  test('debe alternar entre claro y oscuro', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');

    await themeToggle.click();
    let theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('light');

    await themeToggle.click();
    theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('dark');

    await themeToggle.click();
    theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(theme).toBe('light');
  });

  test('debe persistir preferencia en localStorage', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');

    await themeToggle.click();
    await page.waitForTimeout(100);

    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe('light');
  });

  test('debe recordar preferencia al recargar', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');

    await themeToggle.click();
    await themeToggle.click();
    await page.waitForTimeout(100);

    await page.reload();

    const htmlTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(htmlTheme).toBe('dark');
  });

  test('debe tener aria-label correcto', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toHaveAttribute('aria-label', 'Alternar modo oscuro');
  });

  test('debe tener aria-pressed actualizado', async ({ page }) => {
    await page.goto('/');
    const themeToggle = page.locator('.theme-toggle');

    let ariaPressed = await themeToggle.getAttribute('aria-pressed');
    expect(ariaPressed).toBe('false');

    await themeToggle.click();
    ariaPressed = await themeToggle.getAttribute('aria-pressed');
    expect(ariaPressed).toBe('true');
  });
});

test.describe('Menu responsive', () => {
  test('debe tener boton de menu toggle en movil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toBeVisible();
  });

  test('debe abrir menu al hacer click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    const menu = page.locator('#main-menu');

    await menuToggle.click();
    await expect(menu).toHaveClass(/open/);
  });

  test('debe cerrar menu al hacer click de nuevo', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    const menu = page.locator('#main-menu');

    await menuToggle.click();
    await expect(menu).toHaveClass(/open/);

    await menuToggle.click();
    await expect(menu).not.toHaveClass(/open/);
  });

  test('debe actualizar aria-expanded al abrir', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');

    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
  });

  test('debe mostrar todos los links del menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('.menu-toggle');
    await menuToggle.click();

    const menuLinks = page.locator('#main-menu li a');
    const count = await menuLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});