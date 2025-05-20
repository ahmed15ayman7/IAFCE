import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// المسارات التي لا تحتاج إلى مصادقة
const publicPaths = ['/auth/signin', '/auth/signup', '/auth/forgot-password'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get('accessToken');

    // إذا كان المسار عامًا، اتركه يمر
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    // إذا لم يكن هناك توكن وليس مسارًا عامًا، أعد التوجيه لصفحة تسجيل الدخول
    if (!accessToken && !publicPaths.includes(pathname)) {
        const url = new URL('/auth/signin', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// تطبيق الـmiddleware على المسارات المحددة
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
}; 