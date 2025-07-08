"use client";

import { useState } from "react";
import { createDummyAccount } from "@/action/login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TestCreateDummyAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      setResult("Account created: " + JSON.stringify(data));
    } catch (err: any) {
      setError(err.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Test Create Dummy Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Dummy Account"}
        </Button>
      </form>
      {result && <div className="mt-4 text-green-600">{result}</div>}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
}
