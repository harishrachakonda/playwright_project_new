const { expect } = require('@playwright/test');
class LoginPage {
    constructor(page) {
        this.page = page;
    }

    get userName() {
        return this.page.locator("//*[@name='username']");
    }

    get password() {
        return this.page.locator("//*[@name='password']");
    }

    get signInButton() {
        return this.page.locator("//*[@type='submit']");
    }

    get serviceAdminNav() {
        return this.page.locator("//*[contains(@data-testid,'serviceAdmin:LeftNav:IconMenuItem')]");
    }

    get logoutLink() {
        return this.page.locator("//*[text()='Logout']");
    }

    async goTo(url) {
        await this.page.goto(url);
    }

    async validLogin(data) {
        await this.userName.fill(data.username);
        await this.password.fill(data.password);
        await this.signInButton.click();
        await expect(this.page).toHaveTitle(data.title)

    }

    async logout() {
        await this.serviceAdminNav.click();
        await this.logoutLink.click();
        await this.page.waitForTimeout(3000);
        await expect(this.page).toHaveTitle("Sign in to Autonomous Softwar");
    }
}
module.exports = { LoginPage };