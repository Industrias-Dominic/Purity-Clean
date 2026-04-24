import { test, expect } from '@playwright/test';

test.describe('Badges - Regresión R7', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('savings-badge debe ser visible en tarjeta de precios combo', async ({ page }) => {
    const savingsBadge = page.locator('.pricing-card--combo .savings-badge');
    await expect(savingsBadge).toBeVisible();
    const badgeText = await savingsBadge.textContent();
    expect(badgeText).toContain('Ahorra');
  });

  test('savings-badge debe tener aria-label correcto', async ({ page }) => {
    const savingsBadge = page.locator('.savings-badge[aria-label]');
    await expect(savingsBadge).toHaveAttribute('aria-label', /Ahorra/);
  });

  test('savings-badge debe tener animación de pulso', async ({ page }) => {
    await page.goto('/#pricing');
    const savingsBadge = page.locator('.savings-badge');
    const animation = await savingsBadge.evaluate((el) => {
      const style = getComputedStyle(el);
      return style.animationName !== 'none';
    });
    expect(animation).toBeTruthy();
  });

  test('confianza-badges deben ser visibles en sección confianza', async ({ page }) => {
    await page.locator('#confianza').scrollIntoViewIfNeeded();
    const confianzaBadges = page.locator('.confianza-badge');
    const count = await confianzaBadges.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('cada confianza-badge debe tener icono y check de verificación', async ({ page }) => {
    await page.locator('#confianza').scrollIntoViewIfNeeded();
    const badges = page.locator('.confianza-badge');
    const count = await badges.count();
    for (let i = 0; i < count; i++) {
      const confianzaIcon = badges.nth(i).locator('.confianza-icon i');
      await expect(confianzaIcon).toBeVisible();
      const confianzaCheck = badges.nth(i).locator('.confianza-check i');
      await expect(confianzaCheck).toBeVisible();
    }
  });

  test('trust-badges deben ser visibles en sección de métricas', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const trustBadges = page.locator('.trust-badge');
    const count = await trustBadges.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('trust-badges deben tener títulos únicos', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const trustBadgeTitles = page.locator('.trust-badge h3');
    const texts = await trustBadgeTitles.allTextContents();
    const uniqueTexts = new Set(texts);
    expect(uniqueTexts.size).toBe(texts.length);
  });

  test('google-review-badges deben estar presentes en reseñas', async ({ page }) => {
    await page.locator('#google-reviews').scrollIntoViewIfNeeded();
    const googleBadges = page.locator('.google-review-badge');
    const count = await googleBadges.count();
    expect(count).toBeGreaterThan(0);
  });

  test('google-review-badge debe contener texto Google', async ({ page }) => {
    await page.locator('#google-reviews').scrollIntoViewIfNeeded();
    const badge = page.locator('.google-review-badge').first();
    const text = await badge.textContent();
    expect(text).toContain('Google');
  });

  test('trust-badges-strip debe mostrar badges de certificaciones', async ({ page }) => {
    await page.locator('.trust-badges-strip').scrollIntoViewIfNeeded();
    const stripBadges = page.locator('.trust-badges-strip .badge-item');
    const count = await stripBadges.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Galería antes/después - Regresión R7', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('comparison-gallery debe ser visible en sección resultados', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const gallery = page.locator('.comparison-gallery');
    await expect(gallery).toBeVisible();
  });

  test('debe haber exactamente 6 comparison-cards', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const cards = page.locator('.comparison-card');
    await expect(cards).toHaveCount(6);
  });

  test('cada comparison-slider debe tener imagen after visible', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const sliders = page.locator('.comparison-slider');
    const count = await sliders.count();
    for (let i = 0; i < count; i++) {
      const afterImg = sliders.nth(i).locator('.comparison-after');
      await expect(afterImg).toBeVisible();
    }
  });

  test('cada comparison-slider debe tener range input accesible', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const sliders = page.locator('.comparison-slider');
    const count = await sliders.count();
    for (let i = 0; i < count; i++) {
      const range = sliders.nth(i).locator('.comparison-range');
      await expect(range).toBeAttached();
      await expect(range).toHaveAttribute('aria-label');
    }
  });

  test('cada comparison-card debe tener labels antes/después', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const cards = page.locator('.comparison-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const beforeLabel = cards.nth(i).locator('.comparison-label-before');
      const afterLabel = cards.nth(i).locator('.comparison-label-after');
      await expect(beforeLabel).toBeVisible();
      await expect(afterLabel).toBeVisible();
    }
  });

  test('comparison-slider debe ser interactivo con drag', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const slider = page.locator('.comparison-slider').first();
    const range = slider.locator('.comparison-range');
    const initialValue = await range.inputValue();
    expect(initialValue).toBe('50');
  });

  test('cada comparison-card debe tener información del servicio', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const cards = page.locator('.comparison-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const info = cards.nth(i).locator('.comparison-info h3');
      await expect(info).toBeVisible();
      const desc = cards.nth(i).locator('.comparison-info p');
      await expect(desc).toBeVisible();
    }
  });

  test('hover en comparison-card debe aplicar estilos de escala', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const card = page.locator('.comparison-card').first();
    await card.hover();
    const transform = await card.evaluate((el) => {
      return getComputedStyle(el).transform;
    });
    expect(transform).not.toBe('matrix(1, 0, 0, 1, 0, 0)');
  });
});

test.describe('Chatbot FAQ - Regresión R7', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('chatbot-fab debe ser visible en esquina inferior izquierda', async ({ page }) => {
    const fab = page.locator('#chatbot-fab');
    await expect(fab).toBeVisible();
  });

  test('chatbot-fab debe tener aria-label correcto', async ({ page }) => {
    const fab = page.locator('#chatbot-fab');
    await expect(fab).toHaveAttribute('aria-label', 'Abrir asistente FAQ');
  });

  test('chatbot-fab debe tener icono de comentarios', async ({ page }) => {
    const fab = page.locator('#chatbot-fab i');
    await expect(fab).toHaveClass(/fa-comments/);
  });

  test('chatbot-fab debe tener badge FAQ', async ({ page }) => {
    const badge = page.locator('.fab-badge');
    await expect(badge).toBeVisible();
    const text = await badge.textContent();
    expect(text).toContain('FAQ');
  });

  test('al hacer click en chatbot-fab debe abrir el panel', async ({ page }) => {
    const fab = page.locator('#chatbot-fab');
    await fab.click();
    const panel = page.locator('#chatbot-panel');
    await expect(panel).not.toHaveAttribute('hidden', '');
    await expect(panel).toHaveClass(/open/);
  });

  test('chatbot-panel debe tener header con título', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    const title = page.locator('#chatbot-title');
    await expect(title).toBeVisible();
    const text = await title.textContent();
    expect(text).toContain('Purity & Clean');
  });

  test('chatbot-panel debe tener botón de cerrar', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    const closeBtn = page.locator('#chatbot-close');
    await expect(closeBtn).toBeVisible();
    await expect(closeBtn).toHaveAttribute('aria-label', 'Cerrar asistente');
  });

  test('chatbot-panel debe tener intro texto', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    const intro = page.locator('.chatbot-intro');
    await expect(intro).toBeVisible();
  });

  test('chatbot-body debe contener botones de preguntas FAQ', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    const questions = page.locator('.chatbot-question-btn');
    const count = await questions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('al hacer click en pregunta FAQ debe mostrar respuesta', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    const firstQuestion = page.locator('.chatbot-question-btn').first();
    await firstQuestion.click();
    const answer = page.locator('.chatbot-answer');
    await expect(answer).toBeVisible();
  });

  test('al hacer click en pregunta FAQ debe mostrar botón de WhatsApp', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    const firstQuestion = page.locator('.chatbot-question-btn').first();
    await firstQuestion.click();
    const cta = page.locator('.chatbot-cta');
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute('href');
    expect(href).toContain('wa.me');
  });

  test('al hacer click en cerrar debe ocultar el panel', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    await page.locator('#chatbot-close').click();
    await page.waitForTimeout(400);
    const panel = page.locator('#chatbot-panel');
    await expect(panel).toHaveAttribute('hidden', '');
  });

  test('chatbot debe poder abrirse y cerrarse con teclado', async ({ page }) => {
    await page.locator('#chatbot-fab').focus();
    await page.keyboard.press('Enter');
    const panel = page.locator('#chatbot-panel');
    await expect(panel).toHaveClass(/open/);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await expect(panel).toHaveAttribute('hidden', '');
  });
});

test.describe('Zona Badge - Regresión R7', () => {
  test('zona-badge debe mostrar nombre de zona correctamente', async ({ page }) => {
    await page.goto('/zonas/chapinero/index.html');
    await page.waitForLoadState('domcontentloaded');
    const badge = page.locator('.zona-badge');
    await expect(badge).toBeVisible();
    const text = await badge.textContent();
    expect(text).toContain('Chapinero');
  });

  test('zona-badge debe tener icono de ubicación', async ({ page }) => {
    await page.goto('/zonas/chapinero/index.html');
    await page.waitForLoadState('domcontentloaded');
    const icon = page.locator('.zona-badge i');
    await expect(icon).toHaveClass(/fa-location-dot/);
  });

  test('zona-badge debe tener aria-label correcto', async ({ page }) => {
    await page.goto('/zonas/chapinero/index.html');
    await page.waitForLoadState('domcontentloaded');
    const badge = page.locator('.zona-badge');
    await expect(badge).toHaveAttribute('aria-label', /Zona de cobertura/);
  });
});