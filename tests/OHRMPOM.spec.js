const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
// convert JSON Data to string and then convert it into a javascript object
// This is to ensure that the JSON data is properly formatted and can be used in the tests.
const { loginDetails, userDetails } = require("../testdata/AdminFlow.data.json");


/** @typedef {import('../pageObjects/LoginPage').LoginPage} LoginPage */
/** @typedef {import('../pageObjects/AdminPage').AdminPage} AdminPage */

let poManager;
/** @type {LoginPage} */
let loginPage;
/** @type {AdminPage} */
let adminPage;

test.beforeEach(async ({ page }) => {
  poManager = new POManager(page);
  loginPage = poManager.getLoginPage();
  adminPage = poManager.getAdminPage();
});

test("Sample R2R Flow", async () => {
  await loginPage.goTo(dataset.url);
  await loginPage.validLogin(loginDetails);
  await adminPage.navigateToUserDetails(userDetails);
  await adminPage.checkUserExists(userDetails)
  await loginPage.logout();
});
