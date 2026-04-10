import type { User } from "@supabase/supabase-js";
import { canManageBlog, type UserRole } from "@/lib/auth/roles";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type EditorSession = {
  supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>;
  user: User;
  role: UserRole;
  displayName: string | null;
};

/** Pro route handlery — bez redirectu. */
export async function getEditorSessionOrNull(): Promise<EditorSession | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", user.id)
      .maybeSingle();

    const role = profile?.role as UserRole | undefined;
    if (!canManageBlog(role)) return null;

    const displayName =
      profile?.full_name?.trim() ||
      (typeof user.email === "string" && user.email ? user.email.split("@")[0] : null);

    return { supabase, user, role: role!, displayName };
  } catch {
    return null;
  }
}
