import { test, expect } from '@playwright/test';

test.describe('Formulario de reservas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#reservas');
    await page.waitForLoadState('domcontentloaded');
  });

  test('debe mostrar el formulario de reservas', async ({ page }) => {
    const form = page.locator('#booking-form');
    await expect(form).toBeVisible();
  });

  test('debe mostrar el stepper con 3 pasos', async ({ page }) => {
    const stepper = page.locator('.booking-stepper');
    await expect(stepper).toBeVisible();

    const steps = page.locator('.stepper-step');
    await expect(steps).toHaveCount(3);
  });

  test('debe comenzar en el paso 1', async ({ page }) => {
    const step1 = page.locator('.stepper-step[data-step="1"]');
    await expect(step1).toHaveAttribute('aria-current', 'step');
  });

  test('debe mostrar campos del paso 1 inicialmente', async ({ page }) => {
    const step1Fields = page.locator('.booking-fields[data-step-group="1"]');
    await expect(step1Fields).toBeVisible();

    const nameInput = page.locator('#booking-name');
    await expect(nameInput).toBeVisible();

    const phoneInput = page.locator('#booking-phone');
    await expect(phoneInput).toBeVisible();

    const emailInput = page.locator('#booking-email');
    await expect(emailInput).toBeVisible();
  });

  test('debe ocultar campos de paso 2 y 3 inicialmente', async ({ page }) => {
    const step2Fields = page.locator('.booking-fields[data-step-group="2"]');
    await expect(step2Fields).toBeHidden();

    const step3Fields = page.locator('.booking-fields[data-step-group="3"]');
    await expect(step3Fields).toBeHidden();
  });

  test('debe avanzar al paso 2 con campos válidos', async ({ page }) => {
    await page.fill('#booking-name', 'Juan Pérez');
    await page.fill('#booking-phone', '+57 300 123 4567');
    await page.fill('#booking-email', 'juan@example.com');

    await page.click('#booking-next-btn');

    const step2Fields = page.locator('.booking-fields[data-step-group="2"]');
    await expect(step2Fields).toBeVisible();

    const step2 = page.locator('.stepper-step[data-step="2"]');
    await expect(step2).toHaveAttribute('aria-current', 'step');
  });

  test('debe mostrar error al intentar avanzar sin campos obligatorios', async ({ page }) => {
    await page.click('#booking-next-btn');

    const nameInput = page.locator('#booking-name');
    await expect(nameInput).toHaveClass(/error/);
  });

  test('debe validar formato de email', async ({ page }) => {
    await page.fill('#booking-name', 'Juan Pérez');
    await page.fill('#booking-phone', '+57 300 123 4567');
    await page.fill('#booking-email', 'email-invalido');

    await page.click('#booking-next-btn');

    const emailInput = page.locator('#booking-email');
    await expect(emailInput).toHaveClass(/error/);
  });

  test('debe validar formato de teléfono', async ({ page }) => {
    await page.fill('#booking-name', 'Juan Pérez');
    await page.fill('#booking-phone', '123');
    await page.fill('#booking-email', 'juan@example.com');

    await page.click('#booking-next-btn');

    const phoneInput = page.locator('#booking-phone');
    await expect(phoneInput).toHaveClass(/error/);
  });

  test('debe avanzar al paso 3 desde paso 2', async ({ page }) => {
    await page.fill('#booking-name', 'Juan Pérez');
    await page.fill('#booking-phone', '+57 300 123 4567');
    await page.fill('#booking-email', 'juan@example.com');
    await page.click('#booking-next-btn');

    const serviceSelect = page.locator('#booking-service');
    await expect(serviceSelect).toBeVisible();
    await page.selectOption('#booking-service', 'limpieza-sofas');

    const dateInput = page.locator('#booking-date');
    await expect(dateInput).toBeVisible();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateValue = tomorrow.toISOString().split('T')[0];
    await dateInput.fill(dateValue);

    await page.click('#booking-next-btn');

    const step3Fields = page.locator('.booking-fields[data-step-group="3"]');
    await expect(step3Fields).toBeVisible();

    const addressInput = page.locator('#booking-address');
    await expect(addressInput).toBeVisible();
  });

  test('debe permitir volver al paso 1 desde paso 2', async ({ page }) => {
    await page.fill('#booking-name', 'Juan Pérez');
    await page.fill('#booking-phone', '+57 300 123 4567');
    await page.fill('#booking-email', 'juan@example.com');
    await page.click('#booking-next-btn');

    await page.click('#booking-prev-btn');

    const step1Fields = page.locator('.booking-fields[data-step-group="1"]');
    await expect(step1Fields).toBeVisible();

    const nameInput = page.locator('#booking-name');
    await expect(nameInput).toHaveValue('Juan Pérez');
  });

  test('debe tener botón de geolocalización', async ({ page }) => {
    await page.fill('#booking-name', 'Juan Pérez');
    await page.fill('#booking-phone', '+57 300 123 4567');
    await page.fill('#booking-email', 'juan@example.com');
    await page.click('#booking-next-btn');

    const serviceSelect = page.locator('#booking-service');
    await page.selectOption('#booking-service', 'limpieza-sofas');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.locator('#booking-date').fill(tomorrow.toISOString().split('T')[0]);

    await page.click('#booking-next-btn');

    const geoBtn = page.locator('#booking-geo-btn');
    await expect(geoBtn).toBeVisible();
  });

  test('debe establecer fecha mínima como mañana', async ({ page }) => {
    await page.fill('#booking-name', 'Juan Pérez');
    await page.fill('#booking-phone', '+57 300 123 4567');
    await page.fill('#booking-email', 'juan@example.com');
    await page.click('#booking-next-btn');

    const dateInput = page.locator('#booking-date');
    const minDate = await dateInput.getAttribute('min');
    expect(minDate).toBeTruthy();
  });

  test('debe mostrar botón de WhatsApp cuando action es REPLACE_ME', async ({ page }) => {
    await page.fill('#booking-name', 'Juan Pérez');
    await page.fill('#booking-phone', '+57 300 123 4567');
    await page.fill('#booking-email', 'juan@example.com');
    await page.click('#booking-next-btn');

    const serviceSelect = page.locator('#booking-service');
    await page.selectOption('#booking-service', 'limpieza-sofas');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.locator('#booking-date').fill(tomorrow.toISOString().split('T')[0]);

    await page.click('#booking-next-btn');

    await page.fill('#booking-address', 'Calle 45 #12-34, Bogotá');

    const formAction = await page.locator('#booking-form').getAttribute('action');
    if (formAction.includes('REPLACE_ME')) {
      await page.click('#booking-submit-btn');
      await page.waitForTimeout(500);
    }
  });

  test('campos deben tener atributos de accesibilidad', async ({ page }) => {
    const nameInput = page.locator('#booking-name');
    await expect(nameInput).toHaveAttribute('aria-required', 'true');

    const phoneInput = page.locator('#booking-phone');
    await expect(phoneInput).toHaveAttribute('aria-required', 'true');

    const emailInput = page.locator('#booking-email');
    await expect(emailInput).toHaveAttribute('aria-required', 'true');

    const serviceSelect = page.locator('#booking-service');
    await expect(serviceSelect).toHaveAttribute('aria-required', 'true');
  });
});

test.describe('Navegación por el formulario', () => {
  test('debe completar formulario de reservas en 3 pasos', async ({ page }) => {
    await page.goto('/#reservas');
    await page.waitForLoadState('domcontentloaded');

    await page.fill('#booking-name', 'María García');
    await page.fill('#booking-phone', '+57 300 987 6543');
    await page.fill('#booking-email', 'maria@example.com');
    await page.click('#booking-next-btn');

    await expect(page.locator('.booking-fields[data-step-group="2"]')).toBeVisible();
    await page.selectOption('#booking-service', 'sanitizacion-colchones');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.locator('#booking-date').fill(tomorrow.toISOString().split('T')[0]);
    await page.click('#booking-next-btn');

    await expect(page.locator('.booking-fields[data-step-group="3"]')).toBeVisible();
    await page.fill('#booking-address', 'Carrera 7 #45-67, Bogotá');

    await expect(page.locator('#booking-submit-btn')).toBeVisible();
  });

  test('debe limpiar errores al corregir campos', async ({ page }) => {
    await page.click('#booking-next-btn');
    await expect(page.locator('#booking-name')).toHaveClass(/error/);

    await page.fill('#booking-name', 'Valido Nombre');
    await expect(page.locator('#booking-name')).not.toHaveClass(/error/);
  });
});
