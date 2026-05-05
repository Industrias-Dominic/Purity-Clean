import { test, expect } from '@playwright/test';

test.describe('Newsletter - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('newsletter-section debe ser visible', async ({ page }) => {
    const section = page.locator('#newsletter');
    await expect(section).toBeVisible();
  });

  test('newsletter-heading debe tener texto correcto', async ({ page }) => {
    const heading = page.locator('#newsletter-heading');
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text).toContain('ofertas exclusivas');
  });

  test('newsletter-form debe tener campos name y email', async ({ page }) => {
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
    const nameInput = page.locator('#newsletter-name');
    const emailInput = page.locator('#newsletter-email');
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('required');
  });

  test('newsletter-email debe tener tipo email y autocomplete', async ({ page }) => {
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
    const emailInput = page.locator('#newsletter-email');
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('autocomplete', 'email');
  });

  test('newsletter-submit-btn debe ser visible y tener texto', async ({ page }) => {
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
    const submitBtn = page.locator('#newsletter-form button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    const text = await submitBtn.textContent();
    expect(text).toContain('Suscribirme');
  });

  test('newsletter-benefits debe mostrar lista de beneficios', async ({ page }) => {
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
    const benefits = page.locator('.newsletter-benefits');
    await expect(benefits).toBeVisible();
    const items = page.locator('.newsletter-benefits li');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('newsletter-note debe indicar que no hay spam', async ({ page }) => {
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
    const note = page.locator('.newsletter-note');
    await expect(note).toBeVisible();
    const text = await note.textContent();
    expect(text.toLowerCase()).toContain('spam');
  });

  test('newsletter-form debe reject invalid email', async ({ page }) => {
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
    const emailInput = page.locator('#newsletter-email');
    const submitBtn = page.locator('#newsletter-form button[type="submit"]');
    await emailInput.fill('correo-invalido');
    await submitBtn.click();
    const validity = await emailInput.evaluate((el) => el.validity.valid);
    expect(validity).toBe(false);
  });

  test('newsletter-close-btn debe existir y tener clase btn-referido', async ({ page }) => {
    await page.locator('#newsletter').scrollIntoViewIfNeeded();
    const closeBtn = page.locator('#newsletter-close-btn');
    await expect(closeBtn).toBeVisible();
    const className = await closeBtn.getAttribute('class');
    expect(className).toContain('btn-referido');
  });
});

test.describe('Programa de Referidos - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('referidos-section debe ser visible', async ({ page }) => {
    const section = page.locator('#referidos');
    await expect(section).toBeVisible();
  });

  test('referidos-header debe mostrar titulo y lead', async ({ page }) => {
    await page.locator('#referidos').scrollIntoViewIfNeeded();
    const eyebrow = page.locator('.referidos-header .eyebrow');
    const lead = page.locator('.referidos-lead');
    await expect(eyebrow).toBeVisible();
    await expect(lead).toBeVisible();
    const leadText = await lead.textContent();
    expect(leadText).toContain('codigo unico');
  });

  test('referidos-steps debe mostrar 3 pasos', async ({ page }) => {
    await page.locator('#referidos').scrollIntoViewIfNeeded();
    const steps = page.locator('.referidos-step');
    const count = await steps.count();
    expect(count).toBe(3);
  });

  test('referidos-form debe tener campos requeridos', async ({ page }) => {
    await page.locator('#referidos').scrollIntoViewIfNeeded();
    const form = page.locator('#referidos-form');
    await expect(form).toBeVisible();
    const nameInput = page.locator('#referidos-name');
    const phoneInput = page.locator('#referidos-phone');
    const emailInput = page.locator('#referidos-email');
    await expect(nameInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(emailInput).toBeVisible();
  });

  test('referidos-email debe tener validacion de tipo', async ({ page }) => {
    await page.locator('#referidos').scrollIntoViewIfNeeded();
    const emailInput = page.locator('#referidos-email');
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('referidos-submit-btn debe ser visible', async ({ page }) => {
    await page.locator('#referidos').scrollIntoViewIfNeeded();
    const submitBtn = page.locator('#referidos-form button[type="submit"]');
    await expect(submitBtn).toBeVisible();
  });

  test('referidos-benefits debe mostrar beneficios', async ({ page }) => {
    await page.locator('#referidos').scrollIntoViewIfNeeded();
    const benefits = page.locator('.referidos-benefits');
    await expect(benefits).toBeVisible();
  });
});

test.describe('PWA Install Banner - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('manifest-link debe existir en head', async ({ page }) => {
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toBeAttached();
    const href = await manifestLink.getAttribute('href');
    expect(href).toBe('manifest.json');
  });

  test('pwa-install-banner debe estar oculto inicialmente', async ({ page }) => {
    const banner = page.locator('#pwa-install-banner');
    const hidden = await banner.getAttribute('hidden');
    expect(hidden).not.toBeNull();
  });

  test('pwa-install-banner debe tener titulo y descripcion', async ({ page }) => {
    await page.evaluate(() => {
      const banner = document.getElementById('pwa-install-banner');
      banner.removeAttribute('hidden');
    });
    const banner = page.locator('#pwa-install-banner');
    await expect(banner).toBeVisible();
    const title = page.locator('#pwa-install-title');
    await expect(title).toBeVisible();
    const text = await title.textContent();
    expect(text).toContain('Instala');
  });

  test('pwa-install-banner debe tener botones aceptar y rechazar', async ({ page }) => {
    await page.evaluate(() => {
      const banner = document.getElementById('pwa-install-banner');
      banner.removeAttribute('hidden');
    });
    const acceptBtn = page.locator('#pwa-install-accept');
    const declineBtn = page.locator('#pwa-install-decline');
    await expect(acceptBtn).toBeVisible();
    await expect(declineBtn).toBeVisible();
  });

  test('pwa-install-decline debe ocultar el banner', async ({ page }) => {
    await page.evaluate(() => {
      const banner = document.getElementById('pwa-install-banner');
      banner.removeAttribute('hidden');
    });
    const declineBtn = page.locator('#pwa-install-decline');
    await declineBtn.click();
    await page.waitForTimeout(300);
    const banner = page.locator('#pwa-install-banner');
    const hidden = await banner.getAttribute('hidden');
    expect(hidden).not.toBeNull();
  });

  test('pwa-install-banner debe tener rol dialog', async ({ page }) => {
    await page.evaluate(() => {
      const banner = document.getElementById('pwa-install-banner');
      banner.removeAttribute('hidden');
    });
    const banner = page.locator('#pwa-install-banner');
    const role = await banner.getAttribute('role');
    expect(role).toBe('dialog');
  });
});

test.describe('Pricing CTAs - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('pricing-section debe ser visible', async ({ page }) => {
    await page.goto('/#pricing');
    await page.waitForLoadState('domcontentloaded');
    const pricing = page.locator('#pricing');
    await expect(pricing).toBeVisible();
  });

  test('pricing-cards deben tener botones CTA', async ({ page }) => {
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    const ctaButtons = page.locator('.pricing-card .btn');
    const count = await ctaButtons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(ctaButtons.nth(i)).toBeVisible();
    }
  });

  test('pricing-card-combo debe tener savings-badge', async ({ page }) => {
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    const comboCard = page.locator('.pricing-card--combo');
    await expect(comboCard).toBeVisible();
    const savingsBadge = page.locator('.pricing-card--combo .savings-badge');
    await expect(savingsBadge).toBeVisible();
  });

  test('pricing-cta-buttons deben tener aria-label', async ({ page }) => {
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    const ctaButtons = page.locator('.pricing-card .btn');
    const count = await ctaButtons.count();
    for (let i = 0; i < count; i++) {
      const btn = ctaButtons.nth(i);
      const ariaLabel = await btn.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });

  test('pricing-tagline debe mencionar descuentos', async ({ page }) => {
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    const tagline = page.locator('.pricing-tagline');
    await expect(tagline).toBeVisible();
    const text = await tagline.textContent();
    expect(text.toLowerCase()).toContain('descuento');
  });

  test('pricing-features deben listar caracteristicas', async ({ page }) => {
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    const features = page.locator('.pricing-features');
    await expect(features).toBeVisible();
    const items = page.locator('.pricing-features li');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Comparison Sliders - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('comparison-gallery debe tener 6 sliders', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const sliders = page.locator('.comparison-slider');
    const count = await sliders.count();
    expect(count).toBe(6);
  });

  test('cada slider debe tener imagen before y after', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const sliders = page.locator('.comparison-slider');
    const count = await sliders.count();
    for (let i = 0; i < count; i++) {
      const beforeImg = sliders.nth(i).locator('.comparison-before');
      const afterImg = sliders.nth(i).locator('.comparison-after');
      await expect(beforeImg).toBeVisible();
      await expect(afterImg).toBeVisible();
    }
  });

  test('cada slider debe tener range input con valor inicial 50', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const sliders = page.locator('.comparison-slider');
    const count = await sliders.count();
    for (let i = 0; i < count; i++) {
      const range = sliders.nth(i).locator('.comparison-range');
      await expect(range).toBeAttached();
      const value = await range.inputValue();
      expect(value).toBe('50');
    }
  });

  test('slider range debe ser interactivo con drag', async ({ page }) => {
    await page.locator('#resultados').scrollIntoViewIfNeeded();
    const slider = page.locator('.comparison-slider').first();
    const range = slider.locator('.comparison-range');
    const box = await range.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width, box.y + box.height / 2);
    await page.mouse.up();
    const newValue = await range.inputValue();
    expect(newValue).not.toBe('50');
  });

  test('comparison-cards deben tener labels antes/despues', async ({ page }) => {
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
});

test.describe('Chatbot FAQ - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('chatbot-fab debe abrir panel al hacer click', async ({ page }) => {
    const fab = page.locator('#chatbot-fab');
    await fab.click();
    const panel = page.locator('#chatbot-panel');
    await expect(panel).toHaveClass(/open/);
  });

  test('chatbot-panel debe tener preguntas FAQ', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    const questions = page.locator('.chatbot-question-btn');
    const count = await questions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('al clickear pregunta debe mostrar respuesta y CTA WhatsApp', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    const firstQ = page.locator('.chatbot-question-btn').first();
    await firstQ.click();
    const answer = page.locator('.chatbot-answer');
    await expect(answer).toBeVisible();
    const cta = page.locator('.chatbot-cta');
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute('href');
    expect(href).toContain('wa.me');
  });

  test('chatbot debe cerrarse con boton cerrar', async ({ page }) => {
    await page.locator('#chatbot-fab').click();
    await page.locator('#chatbot-close').click();
    await page.waitForTimeout(400);
    const panel = page.locator('#chatbot-panel');
    const hidden = await panel.getAttribute('hidden');
    expect(hidden).not.toBeNull();
  });

  test('chatbot debe ser accesible por teclado', async ({ page }) => {
    await page.locator('#chatbot-fab').focus();
    await page.keyboard.press('Enter');
    const panel = page.locator('#chatbot-panel');
    await expect(panel).toHaveClass(/open/);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await expect(panel).toHaveAttribute('hidden', '');
  });
});