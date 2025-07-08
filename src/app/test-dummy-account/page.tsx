"use client";

import { useState } from "react";
import { createDummyAccount } from "@/action/login";
import { Button } from "@/components/ui/button";

export default function DummyAccountTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const data = await createDummyAccount();
      setResult(
        `Dummy account created!\nEmail: ${data.email}\nPassword: ${data.password}`
      );
    } catch (err: any) {
      setError(err?.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">
        Create Dummy Account (Admin Test)
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Dummy Account"}
        </Button>
      </form>
      {result && (
        <pre className="mt-4 whitespace-pre-wrap break-all text-green-600">
          {result}
        </pre>
      )}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
}
