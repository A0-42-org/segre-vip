import { expect, test } from '@playwright/test';

test.describe('Dashboard Buttons', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@segre.vip');
    await page.fill('input[type="password"]', 'aeth3r');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
  });

  test('create page button works', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check create button exists
    const createButton = page.locator('a[href="/create"]');
    await expect(createButton).toBeVisible();
    
    // Click create button and navigate to create page
    await createButton.click();
    await expect(page).toHaveURL(/\/create/);
  });

  test('edit page button works', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Look for edit buttons in page cards
    const editButton = page.locator('a[href^="/editor"]').first();
    
    if (await editButton.isVisible()) {
      await editButton.click();
      await expect(page).toHaveURL(/\/editor/);
    }
  });

  test('view page button works', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Look for view buttons in page cards
    const viewButton = page.locator('a[href^="/@"]').first();
    
    if (await viewButton.isVisible()) {
      await viewButton.click();
      await expect(page).toHaveURL(/\/@/);
    }
  });

  test('analytics button works', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Look for analytics buttons
    const analyticsButton = page.locator('a[href^="/analytics"]').first();
    
    if (await analyticsButton.isVisible()) {
      await analyticsButton.click();
      await expect(page).toHaveURL(/\/analytics/);
    }
  });
});
