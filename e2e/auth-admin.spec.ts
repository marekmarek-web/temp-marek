import { expect, test } from "@playwright/test";

test.describe("auth admin @smoke", () => {
  test("unauthenticated user cannot open admin (redirects to login)", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/login/);
    const u = new URL(page.url());
    expect(u.pathname).toBe("/login");
    expect(u.searchParams.get("next")).toBe("/admin");
  });

  test("login page renders", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Přihlášení" })).toBeVisible();
  });
});
