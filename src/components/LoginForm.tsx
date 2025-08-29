'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/'); // Redirect to the home page after successful login
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-lg shadow-lg bg-card dark:bg-card-dark">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-foreground">Login</h2>
        {error && <p className="text-destructive text-center">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-muted dark:text-foreground"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-muted dark:text-foreground"
          required
        />
        <button type="submit" className="bg-primary text-primary-foreground p-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
          Log In
        </button>
      </form>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Don't have an account? <Link href="/register" className="text-primary hover:underline">Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
