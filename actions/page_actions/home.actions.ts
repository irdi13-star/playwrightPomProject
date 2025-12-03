import BaseActions from "../main_actions/base.actions";
import credentials from "../../resources/testData.json" with { type: "json" };
import routes from "../../utils/routes.utils";
import HomePage from "../../pages/home.page";
import { BrowserContext, expect, Page } from "@playwright/test";

export default class HomeActions extends BaseActions {
  home: HomePage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.home = new HomePage(page, context);
  }

  async verifyPrimaryMenuList() {
    await expect(this.home.primaryMenuList).toHaveCount(5);
    await expect(this.home.primaryMenuList).toHaveText([
      "Home",
      "Practice",
      "Courses",
      "Blog",
      "Contact",
    ]);
  }
}
