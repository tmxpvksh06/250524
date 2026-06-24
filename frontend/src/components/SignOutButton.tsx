"use client";

import { LogOut } from "lucide-react";
import { createClient, hasSupabaseBrowserEnv } from "@/lib/supabase/client";

export function SignOutButton() {
  async function handleSignOut() {
    if (!hasSupabaseBrowserEnv()) {
      window.location.href = "/";
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <button className="button ghost" onClick={handleSignOut} type="button">
      <LogOut size={18} />
      로그아웃
    </button>
  );
}
