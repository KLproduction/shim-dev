"use server";

import { upsertUserFromSupabase } from "@/action/login";
import { createClientServer } from "@/utils/supabase/server";

export async function keepSupabaseAlive() {
  const supabase = await createClientServer(); // 使用 service_role key

  const uuid = crypto.randomUUID();
  const email = `dummy_${uuid}@example.com`;
  const password = uuid;

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;

    if (data) {
      await upsertUserFromSupabase({
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name ?? null,
        image: data.user.user_metadata?.avatar_url ?? null,
      });

      // 4️⃣ 立即刪除帳戶
      await supabase.auth.admin.deleteUser(data.user.id);
    }

    console.log("✅ Supabase keep-alive ping sent");
  } catch (err) {
    console.error("[keepSupabaseAlive] failed:", err);
    throw err;
  }
}
