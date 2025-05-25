import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getRefreshToken } from './lib/server-cookie.service';

const publicPaths = ['/auth/signin', '/auth/signup', '/auth/forgot-password', "/auth/reset-password"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isRefreshToken = await getRefreshToken();

    // Use next-auth to validate the JWT token
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    // If the path is public, let it pass
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    // If no token and path is not public, redirect to login
    if (!token && !publicPaths.includes(pathname)) {
        const url = new URL('/auth/signin', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};