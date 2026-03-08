"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.replace((params.get("callbackUrl") as string) || "/dashboard");
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-100 via-white to-orange-50 px-4">
      <form
        className="w-full max-w-sm space-y-5 rounded-xl bg-white p-8 shadow-lg border border-orange-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-[#fb7232]">Sign in to SubscriFlow</h1>
        {error && <div className="rounded bg-red-50 text-red-700 p-2">{error}</div>}
        <div>
          <label className="block text-xs font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded border px-3 py-2"
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full rounded border px-3 py-2"
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-[#fb7232] py-2 font-bold text-white hover:bg-[#e06225]"
        >
          Sign in
        </button>
        <div className="text-xs mt-2 text-zinc-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#fb7232] underline hover:brightness-95">
            Create one
          </Link>
        </div>
      </form>
    </main>
  );
}