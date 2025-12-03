import { BrowserContext, Page } from "@playwright/test";
import BaseActions from "../actions/main_actions/base.actions";
import LoginActions from "./page_actions/login.actions";
import CommonActions from "./main_actions/common.actions";
import HomeActions from "./page_actions/home.actions";

export default class App {
  base: BaseActions;
  common: CommonActions;
  login: LoginActions;
  home: HomeActions;

  constructor(page: Page, context: BrowserContext) {
    this.base = new BaseActions(page, context);
    this.common = new CommonActions(page, context);
    this.login = new LoginActions(page, context);
    this.home = new HomeActions(page, context);
  }
}
