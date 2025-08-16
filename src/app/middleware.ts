// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  
  // Define protected routes
  const protectedRoutes = ['/steffens-showcase/dashboard'];

  // Check if the current path is a protected route and if a session exists
  if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
    // Redirect to the login page if not authenticated
    const url = new URL('/steffens-showcase/login', request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/steffens-showcase/dashboard'], // Apply middleware to the dashboard page
};