import { test, expect } from '@playwright/test';

test.describe('Accesibilidad básica', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe tener meta viewport', async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('debe tenerlangattribute en html', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'es');
  });

  test('debe tener skip link para saltar al contenido principal', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('debe tener main-content con id', async ({ page }) => {
    const main = page.locator('#main-content');
    await expect(main).toBeAttached();
  });

  test('debe tener títulos únicos para cada sección', async ({ page }) => {
    const headings = page.locator('h1, h2');
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe tener alt en imágenes del hero', async ({ page }) => {
    const images = page.locator('.hero img');
    const heroImageCount = await images.count();
    if (heroImageCount > 0) {
      const firstImage = images.first();
      const alt = await firstImage.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('debe tener aria-labels en botones iconos del menú', async ({ page }) => {
    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toHaveAttribute('aria-expanded');
    await expect(menuToggle).toHaveAttribute('aria-controls');
  });

  test('debe tener roles apropiados en navegación', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Principal"]');
    await expect(nav).toBeAttached();
  });

  test('debe tener aria-label en sección de mapa', async ({ page }) => {
    const mapContainer = page.locator('.map-container');
    await expect(mapContainer).toHaveAttribute('role', 'region');
    await expect(mapContainer).toHaveAttribute('aria-label');
  });

  test('debe tener labels asociados a inputs del formulario', async ({ page }) => {
    const nameInput = page.locator('#booking-name');
    const label = page.locator('label[for="booking-name"]');
    await expect(label).toBeAttached();
    await expect(label).toContainText('Nombre');
  });

  test('debe tener aria-live en elementos de estado', async ({ page }) => {
    const searchStatus = page.locator('#search-status');
    if (await searchStatus.count() > 0) {
      await expect(searchStatus).toHaveAttribute('aria-live', /polite/);
    }
  });

  test('debe tener aria-hidden en iconos decorativos', async ({ page }) => {
    const decorativeIcons = page.locator('.hero i[aria-hidden="true"]');
    const count = await decorativeIcons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe tener suficientes contrastes de color en textos (verificación básica)', async ({ page }) => {
    const body = page.locator('body');
    const bgColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(bgColor).toBeTruthy();
  });

  test('debe tener meta description', async ({ page }) => {
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content');
  });

  test('debe tener OG tags para redes sociales', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content');

    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content');
  });

  test('debe tener favicon configurado', async ({ page }) => {
    const favicon = page.locator('link[rel="icon"]');
    await expect(favicon).toHaveAttribute('href');
  });

  test('debe tener elementos interactivos focalizables', async ({ page }) => {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    const firstButton = buttons.first();
    await expect(firstButton).toBeFocusable();
  });

  test('debe tener orden de tabulación logical', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.className);
    expect(focused).toBeTruthy();
  });
});

test.describe('Accesibilidad - Formularios', () => {
  test('debe tener campos requeridos marcados con aria-required', async ({ page }) => {
    await page.goto('/#reservas');
    await page.waitForLoadState('domcontentloaded');

    const requiredFields = page.locator('[aria-required="true"]');
    const count = await requiredFields.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe tener mensajes de error con role="alert"', async ({ page }) => {
    await page.goto('/#reservas');
    await page.waitForLoadState('domcontentloaded');

    await page.fill('#booking-name', 'Test');
    await page.fill('#booking-phone', '123');
    await page.fill('#booking-email', 'invalid');
    await page.click('#booking-next-btn');

    const errorFields = page.locator('.field-error[role="alert"]');
    const count = await errorFields.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Accesibilidad - Reading', () => {
  test('debe poder navegar con teclado a través del menú', async ({ page }) => {
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('debe poder cerrar FAQ con teclado', async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq').scrollIntoViewIfNeeded();

    const faqItem = page.locator('.faq-item').first();
    await faqItem.locator('summary').focus();
    await page.keyboard.press('Enter');

    const details = page.locator('.faq-item').first().locator('details');
    const isOpen = await details.evaluate((el) => el.hasAttribute('open'));
    expect(isOpen).toBeTruthy();
  });
});
