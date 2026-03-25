// app/login/page.tsx

import LoginForm from '@/components/LoginForm';
import { Suspense } from 'react';


export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}