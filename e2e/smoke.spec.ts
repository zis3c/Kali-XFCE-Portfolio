import { test, expect } from '@playwright/test';

/**
 * End-to-end smoke test for the Kali XFCE Portfolio.
 *
 * Verifies the critical user journey:
 *   1. Boot chooser renders and is navigable
 *   2. Kali mode boots → login screen appears
 *   3. Login with demo password → desktop loads
 *   4. Terminal can be opened
 *
 * Run with: npx playwright test e2e/smoke.spec.ts
 */

const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || '1234';
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:8888';

test.describe('Portfolio smoke test', () => {
  test('boot chooser renders', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('text=Boot Menu')).toBeVisible();
    await expect(page.locator('text=Portfolio Mode')).toBeVisible();
    await expect(page.locator('text=Kali Linux XFCE Mode')).toBeVisible();
  });

  test('full kali boot -> login -> desktop -> terminal flow', async ({
    page,
  }) => {
    await page.goto(BASE_URL);

    // Select Kali Linux XFCE Mode
    await page.locator('text=Kali Linux XFCE Mode').click();

    // Wait for boot sequence to complete and login to appear
    await expect(page.locator('text=zis3c')).toBeVisible({ timeout: 15_000 });

    // Type password and log in
    await page.locator('input[type="password"]').fill(DEMO_PASSWORD);
    await page.locator('text=Log In').click();

    // Wait for desktop
    await expect(page.locator('text=Applications')).toBeVisible({
      timeout: 10_000,
    });

    // Open terminal via double-click
    const terminalIcon = page.locator('text=Terminal');
    await terminalIcon.dblclick();

    // Verify terminal window opened
    await expect(page.locator('text=zis3c@kali')).toBeVisible({
      timeout: 5_000,
    });
  });
});
