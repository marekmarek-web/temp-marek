import { expect, test } from "@playwright/test";
import { mockLeadSubmitOk, mockSubscriberSubmitOk } from "./helpers/api-mocks";

test.describe("calculator lead modal", () => {
  test("pension calculator CTA opens lead form and submits @smoke", async ({ page }) => {
    await mockLeadSubmitOk(page);
    await page.goto("/penzijnikalkulacka");
    await page.getByTestId("pension-calculator-cta").first().click();
    const form = page.getByTestId("calculator-lead-form");
    await expect(form).toBeVisible();
    await form.getByPlaceholder("Jan Novák").fill("E2E Tester");
    await form.getByPlaceholder("vas@email.cz").fill("e2e@example.com");
    await form.getByRole("button", { name: /Odeslat a domluvit zpětný kontakt/i }).click();
    await expect(page.getByText("Děkujeme")).toBeVisible({ timeout: 20_000 });
  });
});

test.describe("subscribe", () => {
  test("blog listing subscribe happy path @smoke", async ({ page }) => {
    await mockSubscriberSubmitOk(page);
    await page.goto("/blog#novinky");
    const box = page.locator("#novinky").getByTestId("subscribe-inline-form");
    await expect(box).toBeVisible();
    await box.locator("#sub-email").fill("news@example.com");
    await box.locator("#sub-consent").check();
    await box.getByRole("button", { name: /Přihlásit se k novinkám/i }).click();
    await expect(page.getByTestId("subscribe-inline-success")).toBeVisible({ timeout: 20_000 });
  });
});
