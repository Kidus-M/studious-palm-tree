import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes from intl middleware
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    // Add security headers to API routes
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    return response;
  }

  // Apply intl middleware for all other routes
  const response = intlMiddleware(request);

  // Check protected routes
  const isProtected = pathname.match(/\/(en|am)\/watch\//);
  if (isProtected) {
    const sessionCookie = request.cookies.get('better-auth.session_token');
    if (!sessionCookie) {
      const locale = pathname.startsWith('/am') ? 'am' : 'en';
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: ['/', '/(en|am)/:path*', '/api/:path*'],
};
