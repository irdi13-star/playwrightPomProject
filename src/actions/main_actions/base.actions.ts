import { Page } from "@playwright/test";
import BasePage from "../../pages/base.page.js";

export default class BaseActions extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}