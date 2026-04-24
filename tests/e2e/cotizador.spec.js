const { test, expect } = require('@playwright/test');

test.describe('Cotizador instantaneo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const cotizadorSection = page.locator('#cotizador');
    await cotizadorSection.scrollIntoViewIfNeeded();
  });

  test('debe mostrar seccion del cotizador', async ({ page }) => {
    const cotizador = page.locator('.cotizador-wrap');
    await expect(cotizador).toBeVisible();
  });

  test('debe mostrar opciones de servicio', async ({ page }) => {
    const options = page.locator('.cotizador-option');
    const count = await options.count();
    expect(count).toBe(4);
  });

  test('debe permitir seleccionar tipo de servicio', async ({ page }) => {
    const option = page.locator('.cotizador-option[data-service="colchones"]');
    await option.click();

    const input = page.locator('input[name="cotizador-service"][value="colchones"]');
    await expect(input).toBeChecked();
  });

  test('debe mostrar precios por unidad', async ({ page }) => {
    const priceLow = page.locator('#cotizador-price-low');
    const priceHigh = page.locator('#cotizador-price-high');

    await expect(priceLow).toBeVisible();
    await expect(priceHigh).toBeVisible();

    const lowText = await priceLow.textContent();
    const highText = await priceHigh.textContent();
    expect(lowText).toContain('$');
    expect(highText).toContain('$');
  });

  test('debe permitir aumentar cantidad', async ({ page }) => {
    const increaseBtn = page.locator('#cotizador-increase');
    await increaseBtn.click();

    const qtyOutput = page.locator('#cotizador-qty-output');
    const qty = await qtyOutput.textContent();
    expect(parseInt(qty)).toBeGreaterThan(1);
  });

  test('debe permitir disminuir cantidad', async ({ page }) => {
    const increaseBtn = page.locator('#cotizador-increase');
    await increaseBtn.click();
    await increaseBtn.click();

    const decreaseBtn = page.locator('#cotizador-decrease');
    await decreaseBtn.click();

    const qtyOutput = page.locator('#cotizador-qty-output');
    const qty = await qtyOutput.textContent();
    expect(parseInt(qty)).toBe(2);
  });

  test('debe deshabilitar btn decrease en cantidad minima', async ({ page }) => {
    const decreaseBtn = page.locator('#cotizador-decrease');
    await expect(decreaseBtn).toBeDisabled();
  });

  test('debe calcular total correctamente', async ({ page }) => {
    const priceLow = page.locator('#cotizador-price-low');
    const lowText = await priceLow.textContent();
    const lowValue = parseInt(lowText.replace(/[$.]/g, ''));

    const increaseBtn = page.locator('#cotizador-increase');
    await increaseBtn.click();

    const newLowText = await priceLow.textContent();
    const newLowValue = parseInt(newLowText.replace(/[$.]/g, ''));

    expect(newLowValue).toBe(lowValue * 2);
  });

  test('debe tener boton de WhatsApp', async ({ page }) => {
    const whatsappBtn = page.locator('#cotizador-whatsapp-btn');
    await expect(whatsappBtn).toBeVisible();
    await expect(whatsappBtn).toContainText(/whatsapp/i);
  });

  test('debe tener boton de ir a reservas', async ({ page }) => {
    const ctaBtn = page.locator('#cotizador-cta');
    await expect(ctaBtn).toBeVisible();
  });

  test('debe cambiar precios al cambiar tipo de servicio', async ({ page }) => {
    const colchonesOption = page.locator('.cotizador-option[data-service="colchones"]');
    await colchonesOption.click();

    await page.waitForTimeout(100);

    const priceLow = page.locator('#cotizador-price-low');
    const lowText = await priceLow.textContent();
    expect(lowText).toContain('60');
  });
});