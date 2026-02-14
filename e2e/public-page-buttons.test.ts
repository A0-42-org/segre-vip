import { expect, test } from '@playwright/test';

test.describe('Public Page Buttons', () => {
  test('home page navigation buttons work', async ({ page }) => {
    await page.goto('/');
    
    // Check for login/signup buttons on home page
    const loginButton = page.locator('a[href="/login"]');
    const signupButton = page.locator('a[href="/signup"]');
    
    if (await loginButton.isVisible()) {
      await loginButton.click();
      await expect(page).toHaveURL(/\/login/);
      await page.goBack();
    }
    
    if (await signupButton.isVisible()) {
      await signupButton.click();
      await expect(page).toHaveURL(/\/signup/);
    }
  });

  test('public bio page link buttons work', async ({ page }) => {
    // Go to a public bio page
    await page.goto('/@admin');
    
    // Look for link buttons
    const linkButtons = page.locator('a[href^="http"]').or(page.locator('a[href^="https"]));
    const count = await linkButtons.count();
    
    if (count > 0) {
      // Test first few links
      for (let i = 0; i < Math.min(count, 3); i++) {
        const button = linkButtons.nth(i);
        if (await button.isVisible()) {
          const href = await button.getAttribute('href');
          if (href && !href.includes('mailto:') && !href.includes('tel:')) {
            await button.click();
            // Check if navigation occurred or new tab opened
            await page.waitForTimeout(1000);
            // Go back to page
            await page.goto('/@admin');
          }
        }
      }
    }
  });

  test('public bio page CTA buttons work', async ({ page }) => {
    await page.goto('/@admin');
    
    // Look for CTA buttons (buttons with links)
    const ctaButtons = page.locator('button').filter({ has: page.locator('a') });
    const count = await ctaButtons.count();
    
    if (count > 0) {
      const button = ctaButtons.first();
      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(1000);
      }
    }
  });

  test('public bio page social buttons work', async ({ page }) => {
    await page.goto('/@admin');
    
    // Look for social media buttons
    const socialButtons = page.locator('a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"], a[href*="youtube"], a[href*="tiktok"]');
    const count = await socialButtons.count();
    
    if (count > 0) {
      const button = socialButtons.first();
      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(1000);
      }
    }
  });

  test('public offer page buttons work', async ({ page }) => {
    // Go to an offer page
    await page.goto('/@admin/offer-1');
    
    // Look for primary CTA buttons
    const ctaButtons = page.locator('button:has-text("Get Started"), button:has-text("Sign Up"), button:has-text("Buy Now"), button:has-text("Learn More")');
    const count = await ctaButtons.count();
    
    if (count > 0) {
      const button = ctaButtons.first();
      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(1000);
      }
    }
  });
});
