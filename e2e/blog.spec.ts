import { expect, test } from "@playwright/test";

test.describe("blog", () => {
  test("listing shows title @smoke", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: "Blog", exact: true })).toBeVisible();
  });

  test("article detail when post exists", async ({ page }) => {
    const slug = "rezerva-pred-investici";
    const response = await page.goto(`/blog/${slug}`);
    if (response?.status() === 404) {
      test.skip();
      return;
    }
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
