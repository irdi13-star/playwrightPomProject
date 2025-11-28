import { BrowserContext, Page } from "@playwright/test";
import BaseActions from "../actions/base.actions";
import LoginActions from "./login.actions";
import CommonActions from "./common.actions";

export default class App {
  base: BaseActions;
  login: LoginActions;
  common: CommonActions;

  constructor(page: Page, context: BrowserContext) {
    this.base = new BaseActions(page, context);
    this.login = new LoginActions(page, context);
    this.common = new CommonActions(page,context)
  }
}
