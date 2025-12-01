import BasePage from "./base.page";

export default class HomePage extends BasePage {
  postLoginHeader() {
    return this.page.getByRole("heading", { name: "Logged In Successfully" });
  }
}
