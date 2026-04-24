const { test, expect } = require('@playwright/test');

test.describe('Formulario de contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const contactSection = page.locator('#contacto');
    await contactSection.scrollIntoViewIfNeeded();
  });

  test('debe mostrar formulario de contacto', async ({ page }) => {
    const form = page.locator('#lead-form');
    await expect(form).toBeVisible();
  });

  test('debe tener campos obligatorios', async ({ page }) => {
    const nameInput = page.locator('#lead-name');
    const emailInput = page.locator('#lead-email');
    const phoneInput = page.locator('#lead-phone');
    const typeInput = page.locator('#lead-type');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(typeInput).toBeVisible();
  });

  test('debe mostrar error con email invalido', async ({ page }) => {
    const emailInput = page.locator('#lead-email');
    await emailInput.fill('correonovalido');
    await emailInput.blur();

    const errorEl = emailInput.locator('.field-error');
    await expect(errorEl).toContainText(/correo/i);
  });

  test('debe mostrar error con telefono invalido', async ({ page }) => {
    const phoneInput = page.locator('#lead-phone');
    await phoneInput.fill('abc');
    await phoneInput.blur();

    const errorEl = phoneInput.locator('.field-error');
    await expect(errorEl).toContainText(/telefono/i);
  });

  test('debe mostrar error si nombre esta vacio', async ({ page }) => {
    const nameInput = page.locator('#lead-name');
    await nameInput.fill('');
    await nameInput.blur();

    const errorEl = nameInput.locator('.field-error');
    await expect(errorEl).toContainText(/obligatorio/i);
  });

  test('debe limpiar error al corregir', async ({ page }) => {
    const nameInput = page.locator('#lead-name');
    await nameInput.fill('');
    await nameInput.blur();

    const errorEl = nameInput.locator('.field-error');
    await expect(errorEl).toContainText(/obligatorio/i);

    await nameInput.fill('Juan Perez');
    await nameInput.blur();
    await expect(errorEl).toHaveText('');
  });
});

test.describe('Reservas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#reservas');
    const reservasSection = page.locator('#reservas');
    if (await reservasSection.isVisible()) {
      await reservasSection.scrollIntoViewIfNeeded();
    }
  });

  test('debe tener campo de nombre', async ({ page }) => {
    const nameInput = page.locator('#booking-name');
    if (await nameInput.isVisible()) {
      await expect(nameInput).toBeVisible();
    }
  });

  test('debe tener campo de email', async ({ page }) => {
    const emailInput = page.locator('#booking-email');
    if (await emailInput.isVisible()) {
      await expect(emailInput).toBeVisible();
    }
  });

  test('debe tener campo de telefono', async ({ page }) => {
    const phoneInput = page.locator('#booking-phone');
    if (await phoneInput.isVisible()) {
      await expect(phoneInput).toBeVisible();
    }
  });

  test('debe tener selector de servicio', async ({ page }) => {
    const serviceInput = page.locator('#booking-service');
    if (await serviceInput.isVisible()) {
      await expect(serviceInput).toBeVisible();
    }
  });

  test('debe tener campo de fecha', async ({ page }) => {
    const dateInput = page.locator('#booking-date');
    if (await dateInput.isVisible()) {
      await expect(dateInput).toBeVisible();
    }
  });

  test('debe tener campo de hora', async ({ page }) => {
    const timeInput = page.locator('#booking-time');
    if (await timeInput.isVisible()) {
      await expect(timeInput).toBeVisible();
    }
  });

  test('debe tener campo de direccion', async ({ page }) => {
    const addressInput = page.locator('#booking-address');
    if (await addressInput.isVisible()) {
      await expect(addressInput).toBeVisible();
    }
  });
});