"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export function AuthButtons() {
  const supabase = createClient();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        setSession(session);
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) return <p className="text-gray-500">Loading...</p>;

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user.user_metadata?.avatar_url ? (
          <img
            src={session.user.user_metadata.avatar_url}
            className="h-8 w-8 rounded-full"
            alt="User Avatar"
          />
        ) : (
          <span>
            <span className="h-8 w-8 rounded-full bg-gray-300 px-3 font-bold">
              {session.user.user_metadata?.email[0].toUpperCase() || "U"}
            </span>
          </span>
        )}

        <button
          onClick={async () => {
            setLoading(true);
            await supabase.auth.signOut();
            setLoading(false);
            setSession(null);
          }}
          className="rounded bg-gray-200 px-4 py-1 text-sm font-medium transition-colors hover:bg-gray-300"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <SignInModal
      supabase={supabase}
      loading={loading}
      setLoading={setLoading}
      error={error}
      setError={setError}
    />
  );
}

export function SignInModal({
  supabase,
  loading,
  setLoading,
  error,
  setError,
}: {
  supabase: ReturnType<typeof createClient>;
  loading: boolean;
  setLoading: (b: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="rounded bg-blue-600 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          Sign in
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign in to your account</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          {/* Google button */}
          <button
            className="flex w-full items-center gap-2 rounded border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-800 hover:bg-gray-200"
            onClick={async () => {
              setLoading(true);
              setError(null);
              const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  redirectTo: `${baseUrl}/auth/callback`,
                },
              });
              setLoading(false);
              if (error) setError(error.message);
            }}
            disabled={loading}
          >
            Continue with Google
          </button>
          {/* GitHub button */}
          <button
            className="flex w-full items-center gap-2 rounded border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-gray-800 hover:bg-gray-200"
            onClick={async () => {
              setLoading(true);
              setError(null);
              const { error } = await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                  redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(pathname)}`,
                },
              });
              setLoading(false);
              if (error) setError(error.message);
            }}
            disabled={loading}
          >
            Continue with GitHub
          </button>
          {/* Email/password login */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError(null);
              const form = e.target as HTMLFormElement;
              const email = (
                form.elements.namedItem("email") as HTMLInputElement
              ).value;
              const password = (
                form.elements.namedItem("password") as HTMLInputElement
              ).value;
              const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });
              setLoading(false);
              if (error) setError(error.message);
              else setOpen(false);
            }}
            className="mt-2 flex flex-col gap-2"
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="rounded border px-3 py-2 text-sm"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="rounded border px-3 py-2 text-sm"
              required
            />
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in with Email"}
            </button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          No account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            <Button
              variant={"ghost"}
              className="text-blue-600 hover:underline"
              onClick={() => setOpen(false)}
            >
              Sign up
            </Button>
          </Link>
        </div>
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </DialogContent>
    </Dialog>
  );
}
