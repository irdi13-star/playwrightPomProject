import { BrowserContext, Page } from "@playwright/test";

import BasePage from "./base.page";

export default class CommonPage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, context);
  }

  headingTitle(headingTitle: string) {
    return this.page
      .locator(
        `span:has-text("${headingTitle}"), h4:has-text("${headingTitle}"), h1:has-text("${headingTitle}")`
      )
      .first();
  }

  namedButton(buttonTitle: string) {
    return this.page.getByRole("button", { name: `${buttonTitle}` });
  }

  stringGotByText(labelText: string) {
    return this.page.getByText(`${labelText}`);
  }

  firstLinkedText(linkText: string) {
    return this.page.locator(`a:has-text("${linkText}")`).first();
  }

  linkOnPage(expectedLink: string) {
    return this.page.locator(`a[href="${expectedLink}"]`);
  } 
}