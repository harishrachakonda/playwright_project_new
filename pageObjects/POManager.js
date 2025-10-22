const { LoginPage } = require("./LoginPage");
const { AdminPage } = require("./AdminPage");

class POManager {
  constructor(page) {
    this.page = page;
  }

  /** @returns {import('./LoginPage').LoginPage} */
  getLoginPage() {
    return new LoginPage(this.page);
  }

  /** @returns {import('./AdminPage').AdminPage} */
  getAdminPage() {
    return new AdminPage(this.page);
  }
}
module.exports = { POManager };
// This POManager class serves as a central point to manage all page objects in your Playwright tests.
// It initializes the page objects with the current page context, allowing you to access them easily in your tests.
