"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("from") || "/";

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as { error?: string };

      if (response.ok) {
        router.push(nextPath.startsWith("/") ? nextPath : "/");
        router.refresh();
        return;
      }

      setError(data.error || "Login failed");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-lg shadow-lg bg-card">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-foreground">Sign in</h2>
        <p className="text-sm text-center text-muted-foreground">
          Use the email and password for your account.
        </p>
        {error ? <p className="text-destructive text-center text-sm">{error}</p> : null}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
            autoCapitalize="none"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Create one
        </Link>
      </div>
    </div>
  );
}
