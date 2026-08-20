import LoginForm from "@/components/LoginForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
