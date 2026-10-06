import { Page, BrowserContext, expect } from "@playwright/test";
import credentials from "../../resources/testData.json" with { type: "json" };
import LoginPage from "../../pages/login.page.js";
import routes from "../../utils/routes.utils.js";
import BaseActions from "../main_actions/base.actions.js";

export default class LoginActions extends BaseActions {
  login: LoginPage;

  constructor(page: Page, context: BrowserContext) {
    super(page);
    this.login = new LoginPage(page);
  }

  async fillEmail(username: string) {
    const emailIn = this.login.usernameInputField;
    await emailIn.fill(username);
    expect(emailIn).not.toBe("");
  }

  async fillPassword(passwrod: string) {
    await this.login.passwordInputField.fill(passwrod);
  }

  async pressSubmitButton() {
    await this.login.loginButton.click();
  }

  async completeFormWithValidData() {
    await this.fillEmail(credentials.customerDetails.username_default);
    await this.fillPassword(credentials.customerDetails.password_default);
    await this.pressSubmitButton();
    await expect(this.page.url()).toBe(routes.successfullLoggedInPage);
  }

  async completeFormWithCustomData(username: string, password: string) {
    await this.fillEmail(username);
    await this.fillPassword(password);
    await this.pressSubmitButton();
  }
}
