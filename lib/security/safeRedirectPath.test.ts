import { describe, expect, it } from "vitest";
import { safeInternalPath } from "./safeRedirectPath";

describe("safeInternalPath", () => {
  it("allows normal paths", () => {
    expect(safeInternalPath("/admin/posts", "/admin")).toBe("/admin/posts");
  });

  it("blocks open redirects", () => {
    expect(safeInternalPath("//evil.com/phish", "/admin")).toBe("/admin");
    expect(safeInternalPath("https://evil.com", "/admin")).toBe("/admin");
  });

  it("uses fallback for empty", () => {
    expect(safeInternalPath(null, "/x")).toBe("/x");
  });
});
