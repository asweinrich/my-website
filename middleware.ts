import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set your password here (or load it from environment variables)
const PASSWORD = process.env.ADMIN_PASSWORD

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookiePassword = req.cookies.get('password')?.value;

  // If the user is trying to access a protected page (e.g., '/protected') and hasn't provided the password
  if (url.pathname.startsWith('/admin') && cookiePassword !== PASSWORD) {
    // Redirect to a login page if the password is incorrect
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If the password is correct, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin'], // Define which routes should be protected
};
