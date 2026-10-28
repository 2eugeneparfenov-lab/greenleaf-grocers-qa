import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

async function openCheckout(page) {
  await page.goto(BASE_URL);
  await page.getByRole('button', { name: 'Add to Cart' }).first().click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
}

// GL-TC-001: Guest checkout happy path
test('GL-TC-001: Guest checkout is successful', async ({ page }) => {
  await openCheckout(page);

  await page.getByPlaceholder('Full name').fill('QA Tester');
  await page.getByPlaceholder('Email').fill('qa@example.test');
  await page.getByPlaceholder('Address').fill('123 Test Street');

  await page.getByRole('button', { name: 'Place Order' }).click();

  await expect(
    page.getByText('Order placed successfully')
  ).toBeVisible();
});

// GL-TC-002: Checkout without signing in
test('GL-TC-002: Guest can open checkout without login', async ({ page }) => {
  await openCheckout(page);

  await expect(page.getByPlaceholder('Full name')).toBeVisible();
  await expect(page).toHaveURL(/checkout/);
});

// GL-TC-004 / GL-B01: Mobile checkout must remain clickable
test('GL-TC-004: Place Order button is clickable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openCheckout(page);

  await page.getByPlaceholder('Full name').fill('QA Tester');
  await page.getByPlaceholder('Email').fill('qa@example.test');
  await page.getByPlaceholder('Address').fill('123 Test Street');

  await page.getByRole('button', { name: 'Place Order' }).click({ trial: true });
});

// GL-TC-005: Valid promo code
test('GL-TC-005: Valid promo code is accepted', async ({ page }) => {
  await openCheckout(page);

  await page.getByPlaceholder('Promo code').fill('SAVE10');
  await page.getByRole('button', { name: 'Apply Promo' }).click();

  await expect(page.getByText('Discount applied')).toBeVisible();
});

// GL-TC-006 / GL-B02: Expired promo must produce a handled 4xx response
test('GL-TC-006: Expired promo returns a 4xx response', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/api/promo/validate`, {
    data: { code: 'EXPIRED20' },
  });

  expect(response.status()).toBeGreaterThanOrEqual(400);
  expect(response.status()).toBeLessThan(500);
});

// GL-TC-007: Required name
test('GL-TC-007: Name is required at checkout', async ({ page }) => {
  await openCheckout(page);

  await page.getByPlaceholder('Email').fill('qa@example.test');
  await page.getByPlaceholder('Address').fill('123 Test Street');
  await page.getByRole('button', { name: 'Place Order' }).click();

  await expect(page.getByText('Name is required')).toBeVisible();
});

// GL-TC-008: Required email
test('GL-TC-008: Email is required at checkout', async ({ page }) => {
  await openCheckout(page);

  await page.getByPlaceholder('Full name').fill('QA Tester');
  await page.getByPlaceholder('Address').fill('123 Test Street');
  await page.getByRole('button', { name: 'Place Order' }).click();

  await expect(page.getByText('Email is required')).toBeVisible();
});

// GL-TC-009: Invalid email
test('GL-TC-009: Invalid email is rejected at checkout', async ({ page }) => {
  await openCheckout(page);

  await page.getByPlaceholder('Full name').fill('QA Tester');
  await page.getByPlaceholder('Email').fill('wrong-email');
  await page.getByPlaceholder('Address').fill('123 Test Street');
  await page.getByRole('button', { name: 'Place Order' }).click();

  await expect(page.getByText('Invalid email')).toBeVisible();
});

// GL-TC-010: Required address
test('GL-TC-010: Address is required at checkout', async ({ page }) => {
  await openCheckout(page);

  await page.getByPlaceholder('Full name').fill('QA Tester');
  await page.getByPlaceholder('Email').fill('qa@example.test');
  await page.getByRole('button', { name: 'Place Order' }).click();

  await expect(page.getByText('Address is required')).toBeVisible();
});