"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: name.trim() || undefined,
        }),
      });
      const data = (await response.json()) as {
        error?: string;
        signedIn?: boolean;
      };

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      if (data.signedIn === false) {
        router.push("/login");
        router.refresh();
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-lg shadow-lg bg-card">
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-foreground">Create an account</h2>
        <p className="text-sm text-center text-muted-foreground">
          Sign up with email. You will be signed in and sent to the home page.
        </p>
        {error ? <p className="text-destructive text-center text-sm">{error}</p> : null}
        <div className="space-y-2">
          <Label htmlFor="name">Name (optional)</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Wood"
            autoComplete="name"
          />
        </div>
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
            placeholder="At least 8 characters"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
