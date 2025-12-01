import { BrowserContext, expect, Page } from "@playwright/test";

import BaseActions from "../main_actions/base.actions";
import CommonPage from "../../pages/common.page";
import { Utils } from "../../utils/utils.type";
import exp from "constants";

export default class CommonActions extends BaseActions {
  commonPage: CommonPage;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.commonPage = new CommonPage(page, context);
  }
  async headingIsVisible(pageTitle: string) {
    await expect(this.commonPage.headingTitle(pageTitle)).toBeVisible({
      timeout: 3000,
    });
  }

  async pageUrlAsExpected(route: Utils.Routes) {
    await this.commonPage.page.waitForLoadState("load");
    await this.commonPage.page.waitForURL(`${route}*`, {
      timeout: 3000,
    });
    expect(
      this.commonPage.page.url(),
      `Expecting url to contain: '${route}'`,
    ).toContain(route);
  }

  async headingContainsAString(pageTitle: string) {
    await this.commonPage.page.waitForLoadState("domcontentloaded");
    const heading = this.commonPage.headingTitle(pageTitle);
    await expect(heading, "Waiting page heading to be visible").toBeVisible({
      timeout: 5000,
    });
  }

  async clickNamedButton(buttonTitle: string) {
    const button = await this.commonPage.namedButton(buttonTitle);
    await expect(
      button,
      `Wait for button with title '${buttonTitle}' to be visible`,
    ).toBeVisible();
    await button.click();
  }

  async namedButtonIsVisible(
    buttonTitle: string,
    checkClickable: boolean = false,
  ) {
    const button = this.commonPage.namedButton(buttonTitle);

    await expect(
      button,
      `Expecting to see a button '${buttonTitle}'`,
    ).toBeVisible();

    if (checkClickable) {
      await expect(
        button,
        `Expecting the button '${buttonTitle}' to be enabled`,
      ).toBeEnabled();
    }
  }

  async namedButtonIsNotVisible(buttonTitle: string) {
    await expect(
      this.commonPage.namedButton(buttonTitle),
      `Waiting the button '${buttonTitle}' to not be visible`,
    ).not.toBeVisible();
  }

  async stringGotByTextIsVisible(textToBeVisible: string) {
    await expect(
      this.commonPage.page.getByText(textToBeVisible),
      `Expecting to see text '${textToBeVisible}'`,
    ).toBeVisible();
  }

  async verifyLinkedLabel(
    labelText: string,
    linkText: string,
    expectedLink: string,
  ) {
    await this.stringGotByTextIsVisible(labelText);
    const link = this.commonPage.firstLinkedText(linkText);
    await expect(link, `Looking for link '${linkText}'`).toBeVisible();
    await expect(link).toHaveAttribute("href", expectedLink);
  }

  async verifyLinkFormatAndFunctionality(expectedLink: string, label: string) {
    const linkLocator = this.commonPage.linkOnPage(expectedLink);
    await linkLocator.scrollIntoViewIfNeeded();

    if (!(await linkLocator.isVisible())) {
      throw new Error(
        `❌ Link with given URL '${expectedLink}' was NOT found on page!`,
      );
    }
  }

  public async paragraphIsVisible(label: string) {
    await expect(
      this.commonPage.paragraphByText(label),
      `Expecting paragraph '${label}' to be visible`,
    ).toBeVisible();
  }

  async clickLinkedNamedButton(buttonTitle: string) {
    const button = await this.commonPage.linkedButton(buttonTitle);
    await expect(
      button,
      `Wait for button with title '${buttonTitle}' to be visible`,
    ).toBeVisible();
    await button.click();
  }

  async linkedButtonIsVisible(
    buttonTitle: string,
    checkClickable: boolean = false,
  ) {
    const button = this.commonPage.linkedButton(buttonTitle);

    await expect(
      button,
      `Expecting to see a button '${buttonTitle}'`,
    ).toBeVisible();

    if (checkClickable) {
      await expect(
        button,
        `Expecting the button '${buttonTitle}' to be enabled`,
      ).toBeEnabled();
    }
  }

  async linkedButtonIsNotVisible(buttonTitle: string) {
    await expect(
      this.commonPage.linkedButton(buttonTitle),
      `Waiting the button '${buttonTitle}' to not be visible`,
    ).not.toBeVisible();
  }

  async expectingError(errorLabel: string) {
    await expect(this.commonPage.errorLabel(errorLabel)).toBeVisible();
  }
}
