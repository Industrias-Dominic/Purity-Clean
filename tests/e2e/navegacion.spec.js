const { test, expect } = require('@playwright/test');

test.describe('Navegacion principal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debe cargar la pagina principal sin errores', async ({ page }) => {
    await expect(page).toHaveTitle(/Purity & Clean/);
  });

  test('debe mostrar el header con navegacion', async ({ page }) => {
    const header = page.locator('header.site-header');
    await expect(header).toBeVisible();

    const menu = page.locator('#main-menu');
    await expect(menu).toBeVisible();
  });

  test('debe mostrar todos los links de navegacion', async ({ page }) => {
    const navLinks = page.locator('#main-menu li a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    const linkTexts = await navLinks.allTextContents();
    expect(linkTexts).toContain('Inicio');
    expect(linkTexts).toContain('Servicios');
    expect(linkTexts).toContain('Productos');
    expect(linkTexts).toContain('FAQ');
    expect(linkTexts).toContain('Reservas');
    expect(linkTexts).toContain('Contactanos');
  });

  test('debe tener skip link para accesibilidad', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('debe mostrar hero section con CTA', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    const ctaButton = page.locator('.hero .btn-primary');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Pedir Cita');
  });

  test('debe navegar a la seccion de servicios al hacer click en menu', async ({ page }) => {
    await page.click('#main-menu a[href="#servicios"]');
    await expect(page.locator('#servicios')).toBeInViewport();
  });

  test('debe tener toggle de tema oscuro', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute('aria-label', 'Alternar modo oscuro');
  });

  test('debe tener menu movil', async ({ page }) => {
    const menuToggle = page.locator('.menu-toggle');
    await expect(menuToggle).toBeVisible();

    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
  });
});

test.describe('Secciones principales', () => {
  test('debe mostrar seccion de lineas de negocio', async ({ page }) => {
    await page.goto('/');
    const businessLines = page.locator('.business-lines');
    await expect(businessLines).toBeVisible();

    const cards = page.locator('.business-lines .line-card');
    await expect(cards).toHaveCount(2);
  });

  test('debe mostrar mapa de zonas de cobertura', async ({ page }) => {
    await page.goto('/');
    const mapSection = page.locator('.section-map');
    await expect(mapSection).toBeVisible();

    const mapContainer = page.locator('#coverage-map');
    await expect(mapContainer).toBeVisible();
  });

  test('debe mostrar lista de zonas clickeables', async ({ page }) => {
    await page.goto('/');
    const zoneCards = page.locator('.map-zone-card');
    const count = await zoneCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe mostrar estadisticas', async ({ page }) => {
    await page.goto('/');
    const statsSection = page.locator('.section-estadisticas');
    await expect(statsSection).toBeVisible();

    const statsCards = page.locator('.stats-card');
    const count = await statsCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe mostrar servicios', async ({ page }) => {
    await page.goto('/');
    await page.locator('#servicios').scrollIntoViewIfNeeded();

    const serviciosSection = page.locator('#servicios');
    await expect(serviciosSection).toBeVisible();

    const cards = page.locator('#servicios .card');
    await expect(cards).toHaveCount(4);
  });

  test('debe mostrar seccion de precios', async ({ page }) => {
    await page.goto('/');
    await page.locator('#pricing').scrollIntoViewIfNeeded();

    const pricingSection = page.locator('#pricing');
    await expect(pricingSection).toBeVisible();

    const pricingCards = page.locator('.pricing-card');
    const count = await pricingCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe mostrar testimonios', async ({ page }) => {
    await page.goto('/');
    await page.locator('#testimonios').scrollIntoViewIfNeeded();

    const testimoniosSection = page.locator('#testimonios');
    await expect(testimoniosSection).toBeVisible();

    const testimonialCards = page.locator('.testimonial-card');
    const count = await testimonialCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe mostrar FAQ', async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq').scrollIntoViewIfNeeded();

    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();

    const faqItems = page.locator('.faq-item');
    const count = await faqItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('debe tener footer con informacion de contacto', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const whatsappLink = page.locator('footer a[href*="wa.me"]');
    await expect(whatsappLink.first()).toBeVisible();
  });
});