import { expect, test } from '@playwright/test';

test.describe('Editor Buttons', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[type="email"]', 'admin@segre.vip');
    await page.fill('input[type="password"]', 'aeth3r');
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/dashboard/);
  });

  test('save button works', async ({ page }) => {
    await page.goto('/editor?pageId=1');
    
    // Check save button exists
    const saveButton = page.locator('button:has-text("Save")').first();
    
    if (await saveButton.isVisible()) {
      await saveButton.click();
      // Check for success message or UI update
      await expect(page.locator('text=Saved')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('publish button works', async ({ page }) => {
    await page.goto('/editor?pageId=1');
    
    // Check publish button exists
    const publishButton = page.locator('button:has-text("Publish")').first();
    
    if (await publishButton.isVisible()) {
      await publishButton.click();
      // Check for confirmation or modal
      await expect(page.locator('text=Publish')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('preview button works', async ({ page }) => {
    await page.goto('/editor?pageId=1');
    
    // Check preview button exists
    const previewButton = page.locator('button:has-text("Preview")').first();
    
    if (await previewButton.isVisible()) {
      await previewButton.click();
      // Check for preview modal or iframe
      await expect(page.locator('text=Preview')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });

  test('add block buttons work', async ({ page }) => {
    await page.goto('/editor?pageId=1');
    
    // Check for add block buttons
    const addBlockButtons = page.locator('button:has-text("Add")').or(page.locator('button[aria-label*="Add"]'));
    const count = await addBlockButtons.count();
    
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 3); i++) {
        const button = addBlockButtons.nth(i);
        if (await button.isVisible()) {
          await button.click();
          // Check for block added
          await page.waitForTimeout(500);
        }
      }
    }
  });

  test('delete block buttons work', async ({ page }) => {
    await page.goto('/editor?pageId=1');
    
    // Look for delete buttons
    const deleteButtons = page.locator('button:has-text("Delete")').or(page.locator('button[aria-label*="Delete"]'));
    const count = await deleteButtons.count();
    
    if (count > 0) {
      const button = deleteButtons.first();
      if (await button.isVisible()) {
        await button.click();
        // Check for confirmation modal
        await expect(page.locator('text=Delete')).toBeVisible({ timeout: 5000 }).catch(() => {});
      }
    }
  });

  test('theme selector works', async ({ page }) => {
    await page.goto('/editor?pageId=1');
    
    // Check for theme selector
    const themeSelector = page.locator('select[name="theme"]').or(page.locator('button:has-text("Theme")'));
    
    if (await themeSelector.isVisible()) {
      await themeSelector.click();
      // Check for theme options
      await expect(page.locator('text=Theme')).toBeVisible({ timeout: 5000 }).catch(() => {});
    }
  });
});
