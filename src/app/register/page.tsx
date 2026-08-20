import RegistrationForm from "@/components/RegistrationForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-12">
      <RegistrationForm />
    </main>
  );
}
