import test from "../e2e/test";
import credential from "../resources/testData.json" with { type: "json" };
import labels from "../resources/labels_and_strings.json" with { type: "json" };
import routes from "../utils/routes.utils";

test.afterEach(async ({ app }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.log(
      `${
        testInfo.title
      } -did not run as expected, ended up at ${app.base.page.url()}`,
    );
  }
  app.base.page.close();
});

test.describe(
  "Login test with POM",
  {
    tag: ["@first"],
  },
  () => {
    test("Login/Logout successfully", async ({ app }) => {
      await test.step("Access login page and fill the form with valid credentials", async () => {
        await app.base.navigateTo(routes.loginPageTests);
        await app.common.headingIsVisible(labels.loginPage.headerTitle);
        await app.login.completeFormWithValidData();
      });

      await test.step("Verify the successfully page", async () => {
        await app.common.headingIsVisible(
          labels.successfullyLoggedInPage.headerTitle,
        );
        await app.common.paragraphIsVisible(
          labels.successfullyLoggedInPage.descriptionLabel,
        );
        await app.common.linkedButtonIsVisible(
          labels.successfullyLoggedInPage.logoutButton,
        );
      });

      await test.step("Verify log out action", async () => {
        await app.common.clickLinkedNamedButton(
          labels.successfullyLoggedInPage.logoutButton,
        );
        await app.common.headingIsVisible(labels.loginPage.headerTitle);
      });
    });

    test("Incorrect credentials", async ({ app }) => {
      await test.step("Navigate to login page and fill form with invalid credentials", async () => {
        await app.base.navigateTo(routes.loginPageTests);
        await app.login.completeFormWithCustomData(
          credential.customerDetails.invalid_username,
          credential.customerDetails.invalid_passwrod,
        );
      });

      await test.step("Verify the error message", async () => {
        await app.common.headingIsVisible(labels.loginPage.headerTitle);
        await app.common.expectingError(labels.loginPage.invalidUsernameError);
      });
    });

    test("Incorrect password", async ({ app }) => {
      await test.step("Navigate to login page and fill form with invalid credentials", async () => {
        await app.base.navigateTo(routes.loginPageTests);
        await app.login.completeFormWithCustomData(
          credential.customerDetails.username_default,
          credential.customerDetails.invalid_passwrod,
        );
      });

      await test.step("Verify the error message", async () => {
        await app.common.headingIsVisible(labels.loginPage.headerTitle);
        await app.common.expectingError(labels.loginPage.invalidPasswordError);
      });
    });
  },
);
