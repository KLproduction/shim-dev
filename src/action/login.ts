"use server";

import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/client";
import { createClientServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export const GitHubLogin = async () => {
  const supabase = createClient();
  const provider = "github";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

export const GoogleLogin = async () => {
  const supabase = createClient();

  const provider = "google";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${baseUrl}/auth/callback`,
    },
  });
  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

export const createDummyAccount = async () => {
  const supabase = await createClientServer();
  const uuid = crypto.randomUUID();
  const email = `dummy_${uuid}@example.com`;
  const password = uuid;
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
      name: data.user.user_metadata.full_name,
      image: data.user.user_metadata.avatar_url,
    });
  }
  return { ...data, email, password };
};

export const deleteDummyAccount = async (userId: string) => {
  const supabase = await createClientServer();

  const { data, error } = await supabase.auth.admin.deleteUser(userId);
  if (error) throw error;
  return data;
};

export async function upsertUserFromSupabase(user: {
  id: string;
  email?: string;
  name?: string;
  image?: string;
}) {
  const now = new Date();

  return db.user.upsert({
    where: { id: user.id },
    update: { lastLogin: now },
    create: {
      id: user.id,
      email: user.email,
      name: user.name || user.email?.split("@")[0],
      image: user.image || "",
      createdAt: now,
      lastLogin: now,
    },
  });
}

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
