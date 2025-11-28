import test from "../e2e/test";
import credential from "../resources/testData.json" with { type: "json" };
import strings from "../resources/strings.json"
import routes from "../utils/routes.utils"

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

// test.describe(
//   "Login test without PON",
//   {
//     tag: ["@first"],
//   },
//   () => {
//     test("login successfully", async ({ page }) => {
//       await page.goto("https://letcode.in/signin");
//       await page
//         .getByRole("textbox", { name: "Enter registered email" })
//         .fill(credential.customerDetails.username_default);
//       await page
//         .getByPlaceholder("Password")
//         .fill(credential.customerDetails.password_default);
//       await page.getByRole("button", { name: "LOGIN" }).click();
//       await page.waitForURL("https://letcode.in/");
//       await expect(page).toHaveTitle("LetCode with Koushik");
//       await expect(page.getByRole("link", { name: "Sign out" })).toBeVisible();
//     });

//     test("Login Page - ValidCredentials", async ({ page, app }) => {
//       await app.base.navigateTo("https://letcode.in");
//       await page.getByRole("link", { name: "Log in" }).click();
//       await app.login.completeFormWithValidData();
//       await expect(page.getByRole("link", { name: "Sign out" })).toBeEnabled();
//     });
//   },
// );

test.describe(
  "Login test with PON",
  {
    tag: ["@first"],
  },
  () => {
    test("login successfully", async ({ app }) => {
      await app.base.navigateTo(routes.loginPageTests)
      await app.common.headingIsVisible(strings.loginPage.headerTitle)
      await app.login.completeFormWithValidData();
      await app.common.headingIsVisible(strings.successfullyLoggedInPage.headerTitle);
    });

    test("login unsuccessfull", async ({ app }) => {
      await app.base.navigateTo(routes.loginPageTests)
      await app.login.completeFormWithCustomData(credential.customerDetails.invalid_username, credential.customerDetails.invalid_passwrod);
      await app.common.headingIsVisible(strings.loginPage.headerTitle)
    });
  },
);
