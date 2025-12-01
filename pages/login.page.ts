import BasePage from "./base.page";

export default class LoginPage extends BasePage {
  get usernameInputField() {
    return this.page.locator("id=username");
  }

  get passwordInputField() {
    return this.page.locator("id=password");
  }
  get loginButton() {
    return this.page.getByRole("button", { name: "Submit" });
  }
}
