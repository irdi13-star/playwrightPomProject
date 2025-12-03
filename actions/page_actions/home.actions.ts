import BaseActions from "../main_actions/base.actions";
import labels from "../../resources/labels_and_strings.json" with { type: "json" };
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
      labels.homePgae.menuListLabels.home,
      labels.homePgae.menuListLabels.practice,
      labels.homePgae.menuListLabels.courses,
      labels.homePgae.menuListLabels.blog,
      labels.homePgae.menuListLabels.contact,
    ]);
  }
}
