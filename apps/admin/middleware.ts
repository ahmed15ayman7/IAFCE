import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// تعريف المسارات المحمية وصلاحياتها
const protectedRoutes = {
    '/admin/finance': {
        roles: ['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'],
        permissions: ['viewFinance', 'manageFinance'],
    },
    '/admin/communications': {
        roles: ['SUPER_ADMIN', 'ADMIN', 'PR_MANAGER'],
        permissions: ['viewCommunications', 'manageCommunications'],
    },
    '/admin/secretary': {
        roles: ['SUPER_ADMIN', 'ADMIN', 'SECRETARY'],
        permissions: ['viewSecretary', 'manageSecretary'],
    },
    '/admin/staff': {
        roles: ['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER'],
        permissions: ['viewStaff', 'manageStaff'],
    },
    '/admin/legal': {
        roles: ['SUPER_ADMIN', 'ADMIN', 'LEGAL_ADVISOR'],
        permissions: ['viewLegal', 'manageLegal'],
    },
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });

    // إذا لم يكن المستخدم مسجل الدخول
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const path = request.nextUrl.pathname;
    const route = Object.entries(protectedRoutes).find(([route]) =>
        path.startsWith(route)
    );

    if (route) {
        const [, { roles, permissions }] = route;
        const userRole = (token as any)?.roles?.[0]?.name as string;
        console.log("userRole", userRole);
        const userPermissions = (token as any)?.permissions as Record<string, boolean>;

        // التحقق من الدور
        if (!roles.includes(userRole)) {
            return NextResponse.redirect(new URL('/admin/unauthorized', request.url));
        }

        // التحقق من الصلاحيات
        if (!permissions.some((permission) => userPermissions[permission]) && userRole !== 'SUPER_ADMIN') {
            return NextResponse.redirect(new URL('/admin/unauthorized', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};