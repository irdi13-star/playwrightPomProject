import test from "../e2e/test";
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
  "Home page with POM",
  {
    tag: ["@smoke"],
  },
  () => {
    test("Home page full verification", async ({ app }) => {
      await test.step("Access home page", async () => {
        await app.base.navigateTo(routes.homePage);
        await app.common.headingIsVisible(labels.homePgae.headerTitle);
      });

      await test.step("Verify home header", async () => {
        await app.home.verifyPrimaryMenuList();
      });

      await test.step("Verify welcome section", async () => {
        await app.common.paragraphIsVisible(
          labels.homePgae.welcomeSection.header,
        );
        await app.common.paragraphIsVisible(
          labels.homePgae.welcomeSection.descriptionLabel,
        );
      });

      await test.step("Verify experience section", async () => {
        await app.common.paragraphIsVisible(
          labels.homePgae.experienceSection.header,
        );
        await app.common.paragraphIsVisible(
          labels.homePgae.experienceSection.descriptionLabel,
        );
      });

      await test.step("Verify beyond section", async () => {
        await app.common.paragraphIsVisible(
          labels.homePgae.beyondSection.header,
        );
        await app.common.paragraphIsVisible(
          labels.homePgae.beyondSection.descriptionLabel,
        );
      });

      await test.step("Verify courses section", async () => {
        await app.common.paragraphIsVisible(
          labels.homePgae.coursesSection.header,
        );
        await app.common.paragraphIsVisible(
          labels.homePgae.coursesSection.descriptionLabel,
        );
        await app.common.verifyParagraphsLinkedLabel(
          labels.homePgae.coursesSection.descriptionLabel,
          labels.homePgae.coursesSection.nineCoursesLinkedLabel,
          routes.coursesPage,
        );
        await app.common.verifyParagraphsLinkedLabel(
          labels.homePgae.coursesSection.descriptionLabel,
          labels.homePgae.coursesSection.bestSellerLinkedLabel,
          routes.bestSellerCourses,
        );
        await app.common.verifyParagraphsLinkedLabel(
          labels.homePgae.coursesSection.descriptionLabel,
          labels.homePgae.coursesSection.highestRatedLinkedLabel,
          routes.highestRatedCourses,
        );
      });

      await test.step("Verify resources section", async () => {
        await app.common.paragraphIsVisible(
          labels.homePgae.resourcesSection.header,
        );
        await app.common.paragraphIsVisible(
          labels.homePgae.resourcesSection.descriptionLabel,
        );
        await app.common.verifyParagraphsLinkedLabel(
          labels.homePgae.resourcesSection.descriptionLabel,
          labels.homePgae.resourcesSection.articlesLinkedLabel,
          routes.blogPage,
        );
        await app.common.verifyParagraphsLinkedLabel(
          labels.homePgae.resourcesSection.descriptionLabel,
          labels.homePgae.resourcesSection.practicalPlatformLinkedLabel,
          routes.practicePage,
        );
      });

      await test.step("Verify looking ahead section", async () => {
        await app.common.paragraphIsVisible(
          labels.homePgae.lookingAheadSection.header,
        );
        await app.common.paragraphIsVisible(
          labels.homePgae.lookingAheadSection.descriptionLabel,
        );
      });

      await test.step("Verify explore and learn section", async () => {
        await app.common.paragraphIsVisible(
          labels.homePgae.exploreAndLearnSection.header,
        );
        await app.common.paragraphIsVisible(
          labels.homePgae.exploreAndLearnSection.descriptionLabel,
        );
        await app.common.verifyParagraphsLinkedLabel(
          labels.homePgae.exploreAndLearnSection.descriptionLabel,
          labels.homePgae.exploreAndLearnSection.blogLinkedLabel,
          routes.blogPage,
        );
        await app.common.verifyParagraphsLinkedLabel(
          labels.homePgae.exploreAndLearnSection.descriptionLabel,
          labels.homePgae.exploreAndLearnSection.coursesLinkedLabel,
          routes.coursesPage,
        );
      });
    });
  },
);
