import type { Page } from "@playwright/test";

/** Úvodní stránka má fullscreen loader; kliky projdou až po `body.page-loaded`. */
export async function waitForHomeIntroLoader(page: Page): Promise<void> {
  await page.locator("body.page-loaded").waitFor({ state: "attached", timeout: 30_000 });
}
