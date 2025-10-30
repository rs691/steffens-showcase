import fs from 'fs/promises';
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

async function writeUsersFile(users: any[]) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write to users file:', error);
    throw new Error('Could not save user data.');
  }
}

/**
 * Handles the POST request for user registration.
 * This is a server-side API endpoint.
 */
export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  try {
    const users = await readUsersFile();
    
    if (users.some((user: any) => user.username === username || user.email === email)) {
      return NextResponse.json({ error: 'Username or email already exists.' }, { status: 409 });
    }

    users.push({ username, email, password });
    await writeUsersFile(users);
    
    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
