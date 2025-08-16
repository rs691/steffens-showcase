'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => router.push('/steffens-showcase/login'), 2000);
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 rounded-lg shadow-lg bg-card dark:bg-card-dark">
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center text-foreground">Register</h2>
        {message && (
          <p className={`text-center ${message.includes('successful') ? 'text-green-500' : 'text-destructive'}`}>
            {message}
          </p>
        )}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-muted dark:text-foreground"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
          Register
        </button>
      </form>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
