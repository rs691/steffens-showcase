import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  
  const protectedRoutes = ['/'];

  if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};