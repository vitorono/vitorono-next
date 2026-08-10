import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isClientHost, matchesClientRoute } from '@/lib/clientHost';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host')?.split(':')[0] ?? '';

  // robots.txt is host-aware on its own (see app/robots.ts) — never subject to the allowlist below.
  if (pathname === '/robots.txt') {
    return NextResponse.next();
  }

  if (isClientHost(hostname)) {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('https://vitorono.com/'), 307);
    }
    if (matchesClientRoute(pathname)) {
      return NextResponse.next();
    }
    return new NextResponse('Not Found', { status: 404 });
  }

  if (matchesClientRoute(pathname)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|images/).*)',
};
