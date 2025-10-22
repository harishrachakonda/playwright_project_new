

class AdminPage {
    constructor(page) {
        this.page = page;
    }

    // -----------------Locators for Admin Page---------------------------//

    get myAdminNav() {
        return "//*text()='Admin']";
    }

    get userNameField() {
        return this.page.locator("//*[text()='Username']/parent::*/following-sibling::*/input");
    }

    get userRoleDropdown() {
        return this.page.locator("//*[text()='User Role']/parent::*/following-sibling::*/div");
    }

    userRoleSelect(userRole) {
        return this.page.locator(`//*[@role='option']/*[text()='${userRole}']`);
    }

    get userSearchBtn(){
        return this.page.locator("//*[text()='Search']");
    }


    // -------------------------Methods for Admin Page---------------------------------//
    async navigateToUserDetails(data) {
        await this.page.waitForSelector(this.myAdminNav, { timeout: 180000 }, { state: 'attached' });
        await this.myAdminNav.click();
        await this.userNameField().fill(data.username);
        await this.userRoleDropdown.click();
        await this.userRoleSelect(data.userRole).click();
        await this.userSearchBtn().click();
    }

    async checkUserExists(data) {
        
    }
}
module.exports = { AdminPage };