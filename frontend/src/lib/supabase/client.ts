import { createBrowserClient } from "@supabase/ssr";

function getSupabasePublicKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
}

export function hasSupabaseBrowserEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && getSupabasePublicKey());
}

export function createClient() {
  if (!hasSupabaseBrowserEnv()) {
    throw new Error("Missing Supabase browser environment variables.");
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabasePublicKey()!,
  );
}
