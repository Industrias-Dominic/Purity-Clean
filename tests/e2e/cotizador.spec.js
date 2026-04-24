import { test, expect } from '@playwright/test';

test.describe('Cotizador instantáneo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#cotizador').scrollIntoViewIfNeeded();
  });

  test('debe mostrar el cotizador', async ({ page }) => {
    const cotizador = page.locator('#cotizador');
    await expect(cotizador).toBeVisible();
  });

  test('debe mostrar las 4 opciones de servicio', async ({ page }) => {
    const options = page.locator('.cotizador-option');
    await expect(options).toHaveCount(4);
  });

  test('debe mostrar precios para sofás por defecto', async ({ page }) => {
    const priceLow = page.locator('#cotizador-price-low');
    await expect(priceLow).toContainText('$80.000');

    const priceHigh = page.locator('#cotizador-price-high');
    await expect(priceHigh).toContainText('$180.000');
  });

  test('debe seleccionar servicio de colchones', async ({ page }) => {
    await page.locator('.cotizador-option[data-service="colchones"]').click();

    const priceLow = page.locator('#cotizador-price-low');
    await expect(priceLow).toContainText('$60.000');

    const priceHigh = page.locator('#cotizador-price-high');
    await expect(priceHigh).toContainText('$120.000');
  });

  test('debe seleccionar servicio de alfombras', async ({ page }) => {
    await page.locator('.cotizador-option[data-service="alfombras"]').click();

    const priceLow = page.locator('#cotizador-price-low');
    await expect(priceLow).toContainText('$200.000');

    const priceHigh = page.locator('#cotizador-price-high');
    await expect(priceHigh).toContainText('$450.000');
  });

  test('debe seleccionar servicio de sillas', async ({ page }) => {
    await page.locator('.cotizador-option[data-service="sillas"]').click();

    const priceLow = page.locator('#cotizador-price-low');
    await expect(priceLow).toContainText('$30.000');

    const priceHigh = page.locator('#cotizador-price-high');
    await expect(priceHigh).toContainText('$55.000');
  });

  test('debe aumentar cantidad con el stepper', async ({ page }) => {
    const qtyOutput = page.locator('#cotizador-qty-output');
    await expect(qtyOutput).toContainText('1');

    await page.click('#cotizador-increase');
    await expect(qtyOutput).toContainText('2');

    await page.click('#cotizador-increase');
    await expect(qtyOutput).toContainText('3');
  });

  test('debe disminuir cantidad con el stepper', async ({ page }) => {
    await page.click('#cotizador-increase');
    await page.click('#cotizador-increase');
    const qtyOutput = page.locator('#cotizador-qty-output');
    await expect(qtyOutput).toContainText('3');

    await page.click('#cotizador-decrease');
    await expect(qtyOutput).toContainText('2');
  });

  test('debe deshabilitar botón decrease en cantidad 1', async ({ page }) => {
    const decreaseBtn = page.locator('#cotizador-decrease');
    await expect(decreaseBtn).toBeDisabled();
  });

  test('debe deshabilitar botón increase en cantidad máxima', async ({ page }) => {
    for (let i = 0; i < 19; i++) {
      await page.click('#cotizador-increase');
    }
    const increaseBtn = page.locator('#cotizador-increase');
    await expect(increaseBtn).toBeDisabled();
  });

  test('debe usar el slider de cantidad', async ({ page }) => {
    const rangeInput = page.locator('#cotizador-range');
    await rangeInput.fill('5');

    const qtyOutput = page.locator('#cotizador-qty-output');
    await expect(qtyOutput).toContainText('5');
  });

  test('debe calcular total para múltiples unidades', async ({ page }) => {
    await page.locator('.cotizador-option[data-service="sofas"]').click();
    await page.locator('#cotizador-increase');
    await page.locator('#cotizador-increase');

    const totalValue = page.locator('#cotizador-total-value');
    await expect(totalValue).toContainText('$240.000');
    await expect(totalValue).toContainText('$540.000');
  });

  test('debe mostrar botón de WhatsApp', async ({ page }) => {
    const whatsappBtn = page.locator('#cotizador-whatsapp-btn');
    await expect(whatsappBtn).toBeVisible();
    await expect(whatsappBtn).toContainText('WhatsApp');
  });

  test('debe mostrar CTA para reservas', async ({ page }) => {
    const ctaLink = page.locator('#cotizador-cta');
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', '#reservas');
  });

  test('debe tener disclaimer de precio referencial', async ({ page }) => {
    const disclaimer = page.locator('.cotizador-disclaimer');
    await expect(disclaimer).toBeVisible();
    await expect(disclaimer).toContainText('Precio referencial');
  });

  test('debe actualizar precios al cambiar cantidad via range', async ({ page }) => {
    const rangeInput = page.locator('#cotizador-range');
    await rangeInput.fill('10');

    const priceLow = page.locator('#cotizador-price-low');
    await expect(priceLow).toContainText('$800.000');
  });
});

test.describe('Cotizador - Cambio de servicio', () => {
  test('debe mantener cantidad al cambiar servicio', async ({ page }) => {
    await page.click('#cotizador-increase');
    await page.click('#cotizador-increase');
    const qtyOutput = page.locator('#cotizador-qty-output');
    expect(await qtyOutput.textContent()).toBe('3');

    await page.locator('.cotizador-option[data-service="colchones"]').click();

    await expect(qtyOutput).toContainText('3');
  });

  test('debe actualizar precios al cambiar de sofás a colchones con cantidad 2', async ({ page }) => {
    await page.locator('.cotizador-option[data-service="sofas"]').click();
    await page.click('#cotizador-increase');

    await page.locator('.cotizador-option[data-service="colchones"]').click();

    const priceLow = page.locator('#cotizador-price-low');
    await expect(priceLow).toContainText('$120.000');

    const priceHigh = page.locator('#cotizador-price-high');
    await expect(priceHigh).toContainText('$240.000');
  });
});
