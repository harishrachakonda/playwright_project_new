// @ts-check
import { test, expect } from '@playwright/test';

test('@smoke has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('@smoke get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Sample R2R Flow', async ({page}) => {
  await page.goto('https://cfotech-fit.highradius.com/workspaceui/#/');
  await page.waitForSelector("//*[@id='username']")
  await page.locator("//*[@id='username']").fill('auto.serviceadmin@autoqa.com');
  await page.locator("//*[@id='password']").describe("Enter password").fill('Auto@21525');
  await page.locator("//*[@name='login']").click();
  await expect(page).toHaveTitle("LiveCube")
  await page.waitForSelector("//*[contains(@data-testid,'My Workspaces:LeftNav:IconMenuItem')]")
  await page.waitForSelector("//*[text()='Harish WS']")
  await page.locator("//*[text()='Harish WS']").click();
  await page.waitForSelector("//*[@class='artifact-icon']/following-sibling::*[text()='Test Folder']")
  await page.locator("//*[@class='artifact-icon']/following-sibling::*[text()='Test Folder']").click();
  await page.waitForSelector("//*[text()='SampleWB1']")
  // await page.locator("//*[text()='SampleWB1']").click();

  const [workbookPage] = await Promise.all([
    page.context().waitForEvent("page"), // Wait for a new page to be created in the context
    page.locator("//*[text()='SampleWB1']").click(), // Click the Workbook link
  ]);

  workbookPage.on('load', () => {
    console.log('Workbook page loaded successfully');
  });
  await workbookPage.waitForSelector("//*[contains(@data-testid,'Tables:LeftNav:IconMenuItem')]", {timeout: 180000});
  await workbookPage.waitForLoadState('networkidle'); // Wait for network activity to idle
  await workbookPage.waitForSelector("//*[text()='Test123']/ancestor::div[2]/following-sibling::*", {timeout: 240000});
  await workbookPage.waitForTimeout(10000);
  await workbookPage.close()

  await page.waitForSelector("//*[contains(@data-testid,'serviceAdmin:LeftNav:IconMenuItem')]")
  await page.locator("//*[contains(@data-testid,'serviceAdmin:LeftNav:IconMenuItem')]").click();
  await page.waitForSelector("//*[text()='Logout']")
  await page.locator("//*[text()='Logout']").click();
  await page.waitForTimeout(3000);
  await expect(page).toHaveTitle("Sign in to Autonomous Software");
});
