import { describe, expect, it } from "vitest";
import { canManageBlog, isAdminRole, isCmsStaffRole } from "./roles";

describe("roles", () => {
  it("treats admin and editor as CMS staff", () => {
    expect(isCmsStaffRole("admin")).toBe(true);
    expect(isCmsStaffRole("editor")).toBe(true);
    expect(isCmsStaffRole(undefined)).toBe(false);
    expect(isCmsStaffRole("")).toBe(false);
    expect(isCmsStaffRole("user")).toBe(false);
  });

  it("canManageBlog matches CMS staff", () => {
    expect(canManageBlog("admin")).toBe(true);
    expect(canManageBlog("editor")).toBe(true);
    expect(canManageBlog(null)).toBe(false);
  });

  it("isAdminRole is only admin", () => {
    expect(isAdminRole("admin")).toBe(true);
    expect(isAdminRole("editor")).toBe(false);
  });
});
