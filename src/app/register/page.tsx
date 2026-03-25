// app/register/page.tsx
import RegistrationForm from '@/components/RegistrationForm';

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] flex-col gap-4 p-4">
      <RegistrationForm />
    </div>
  );
}