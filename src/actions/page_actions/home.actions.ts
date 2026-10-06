import labels from "../../resources/labels_and_strings.json" with { type: "json" };
import { BrowserContext, expect, Page } from "@playwright/test";
import BaseActions from "../main_actions/base.actions.js";
import HomePage from "../../pages/home.page.js";

export default class HomeActions extends BaseActions {
  home: HomePage;

  constructor(page: Page, context: BrowserContext) {
    super(page);
    this.home = new HomePage(page);
  }

  async verifyPrimaryMenuList() {
    await expect(this.home.primaryMenuList).toHaveCount(6);
    await expect(this.home.primaryMenuList).toHaveText([
      labels.homePgae.menuListLabels.home,
      labels.homePgae.menuListLabels.practice,
      labels.homePgae.menuListLabels.courses,
      labels.homePgae.menuListLabels.aiWorkshop,
      labels.homePgae.menuListLabels.blog,
      labels.homePgae.menuListLabels.contact,
    ]);
  }
}
