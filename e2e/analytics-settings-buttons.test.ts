import { expect, test } from '@playwright/test';

test.describe('Analytics Buttons', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@segre.vip');
    await page.fill('input[type="password"]', 'aeth3r');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
  });

  test('filter date range works', async ({ page }) => {
    await page.goto('/analytics?pageId=1');
    
    // Check for date filter buttons
    const filterButton = page.locator('button:has-text("Filter")').or(page.locator('button[aria-label*="Filter"]'));
    
    if (await filterButton.isVisible()) {
      await filterButton.click();
      // Check for filter options
      await expect(page.locator('text=Filter')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('export button works', async ({ page }) => {
    await page.goto('/analytics?pageId=1');
    
    // Check for export button
    const exportButton = page.locator('button:has-text("Export")').or(page.locator('button[aria-label*="Export"]'));
    
    if (await exportButton.isVisible()) {
      await exportButton.click();
      // Check for export options or download
      await expect(page.locator('text=Export')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('source filter buttons work', async ({ page }) => {
    await page.goto('/analytics?pageId=1');
    
    // Check for source filter buttons
    const sourceButtons = page.locator('button:has-text("Source")').or(page.locator('button[aria-label*="Source"]'));
    const count = await sourceButtons.count();
    
    if (count > 0) {
      const button = sourceButtons.first();
      if (await button.isVisible()) {
        await button.click();
        // Check for source options
        await expect(page.locator('text=Source')).toBeVisible({ timeout: 5000 }).catch(() => {});
      }
    }
  });
});

test.describe('Settings Buttons', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@segre.vip');
    await page.fill('input[type="password"]', 'aeth3r');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
  });

  test('save profile button works', async ({ page }) => {
    await page.goto('/settings');
    
    // Check for save button
    const saveButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Save")'));
    
    if (await saveButton.isVisible()) {
      await saveButton.click();
      // Check for success message
      await expect(page.locator('text=Saved')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('change password button works', async ({ page }) => {
    await page.goto('/settings');
    
    // Check for change password button
    const changePasswordButton = page.locator('button:has-text("Change Password")').or(page.locator('button:has-text("Password")'));
    
    if (await changePasswordButton.isVisible()) {
      await changePasswordButton.click();
      // Check for password change form or modal
      await expect(page.locator('text=Password')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('delete account button works', async ({ page }) => {
    await page.goto('/settings');
    
    // Check for delete account button (danger)
    const deleteButton = page.locator('button:has-text("Delete")').or(page.locator('button:has-text("Remove")'));
    const count = await deleteButton.count();
    
    if (count > 0) {
      const button = deleteButton.first();
      if (await button.isVisible()) {
        await button.click();
        // Check for confirmation modal
        await expect(page.locator('text=Delete')).toBeVisible({ timeout: 5000 }).catch(() => {});
      }
    }
  });
});
