// app/api/login/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username } = await req.json();
  
  // Set a secure cookie to act as a session
  const cookieStore = await cookies();
  cookieStore.set('session', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });

  return NextResponse.json({ success: true });
}