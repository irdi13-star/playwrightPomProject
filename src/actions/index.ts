import { Page, BrowserContext } from "@playwright/test";
import BaseActions from "./main_actions/base.actions.js";
import CommonActions from "./main_actions/common.actions.js";
import HomeActions from "./page_actions/home.actions.js";
import LoginActions from "./page_actions/login.actions.js";

export default class App {
  base: BaseActions;
  common: CommonActions;
  login: LoginActions;
  home: HomeActions;

  constructor(page: Page, context: BrowserContext) {
    this.base = new BaseActions(page);
    this.common = new CommonActions(page, context);
    this.login = new LoginActions(page, context);
    this.home = new HomeActions(page, context);
  }
}
