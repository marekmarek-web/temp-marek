import { expect, test } from "@playwright/test";
import { waitForHomeIntroLoader } from "./helpers/page";

test.describe("smoke @smoke", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#home-main")).toBeVisible();
  });

  test("navigates to blog from header", async ({ page }) => {
    await page.goto("/");
    await waitForHomeIntroLoader(page);
    // Úvod má header skrytý do scrollu — zviditelníme hlavní navigaci (desktop).
    await page.evaluate(() => window.scrollTo(0, 200));
    await expect(page.locator("#main-header")).toHaveClass(/visible/, { timeout: 10_000 });
    const blogLink = page.getByRole("navigation", { name: "Hlavní navigace" }).getByRole("link", { name: "Blog", exact: true });
    await blogLink.click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole("heading", { name: "Blog", exact: true })).toBeVisible();
  });
});
