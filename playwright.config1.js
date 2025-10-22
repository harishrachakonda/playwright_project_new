// Disable TLS certificate validation for self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries:1,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers:3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  timeout: 300000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    
    /* Set default timeout for all actions */
    // timeout: 60000, // 60 seconds

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on',
    browserName : 'chromium', // Default browser to use
    headless: false, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Default viewport size
    screenshot: 'on', // Take a screenshot everytime
    timeout: 60000,
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        browserName : 'chromium', // Default browser to use
        headless: false, // Run tests in headless mode
        viewport: { width: 1366, height: 641 }, // Default viewport size
        screenshot: 'on', // Take a screenshot everytime
        timeout: 60000,
        trace: 'on',
        video: 'on', // Record video for each first retry
        // ignoreHTTPSErrors: true, // Ignore HTTPS errors
       },
    },

    {
      name: 'webkit',
      use: { 
        browserName : 'webkit', // Default browser to use
        headless: false, // Run tests in headless mode
        viewport: { width: 1280, height: 720 }, // Default viewport size
        screenshot: 'off', // Take a screenshot everytime
        timeout: 60000,
        trace: 'on',
        // ...devices['Galaxy Note 3 landscape']
       },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

