import fs from 'fs/promises';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

async function readUsersFile() {
  try {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

/**
 * Handles user login by authenticating credentials and setting a session cookie.
 * This is a server-side function.
 */
export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
  }
  
  try {
    const users = await readUsersFile();
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      const cookieStore = await cookies();
      cookieStore.set('session', user.username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '',
      });

      return NextResponse.json({ success: true, username: user.username });
    } else {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ error: 'An internal error occurred.' }, { status: 500 });
  }
}
