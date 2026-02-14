import { expect, test } from '@playwright/test';

test.describe('Authentication Buttons', () => {
  test('signup page has working buttons', async ({ page }) => {
    await page.goto('/signup');
    
    // Check signup form exists
    await expect(page.locator('form')).toBeVisible();
    
    // Check login link button exists and works
    const loginLink = page.locator('a[href="/login"]');
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('login page has working buttons', async ({ page }) => {
    await page.goto('/login');
    
    // Check login form exists
    await expect(page.locator('form')).toBeVisible();
    
    // Check signup link button exists and works
    const signupLink = page.locator('a[href="/signup"]');
    await expect(signupLink).toBeVisible();
    await signupLink.click();
    await expect(page).toHaveURL(/\/signup/);
  });

  test('forgot password page has working buttons', async ({ page }) => {
    await page.goto('/forgot-password');
    
    // Check forgot password form exists
    await expect(page.locator('form')).toBeVisible();
    
    // Check back to login link exists and works
    const backLink = page.locator('a[href="/login"]');
    await expect(backLink).toBeVisible();
    await backLink.click();
    await expect(page).toHaveURL(/\/login/);
  });
});
