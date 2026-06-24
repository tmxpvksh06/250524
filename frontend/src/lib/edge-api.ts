import { createClient } from "@/lib/supabase/client";

export async function invokeEdgeApi<T>(action: string, payload: Record<string, unknown>) {
  const { data, error } = await createClient().functions.invoke("api", {
    body: { action, ...payload },
  });

  if (error) {
    const context = error.context as Response | undefined;
    const body = context ? await context.json().catch(() => null) : null;
    throw new Error(body?.error ?? error.message ?? "Supabase Edge Function 호출에 실패했습니다.");
  }

  return data as T;
}
