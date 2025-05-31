'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export async function setTokensF(accessToken: string, refreshToken: string): Promise<void> {
    try {
        const cookieStore = cookies();

        // تعيين التوكن مع خيارات إضافية للأمان
        cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });

        cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 أيام بالثواني
        });
    } catch (error) {
        console.error('خطأ في حفظ الكوكيز في الخادم:', error);
    }
}

export async function getAccessToken(): Promise<string | undefined> {
    try {
        return cookies().get(ACCESS_TOKEN_KEY)?.value;
    } catch (error) {
        console.error('خطأ في قراءة الكوكيز من الخادم:', error);
        return undefined;
    }
}

export async function getRefreshToken(): Promise<string | undefined> {
    try {
        let refreshT = cookies().get(REFRESH_TOKEN_KEY)?.value;
        // console.log("refreshT")
        // console.log(refreshT)
        return refreshT
    } catch (error) {
        console.error('خطأ في قراءة الكوكيز من الخادم:', error);
        return undefined;
    }
}

export async function removeTokens(): Promise<void> {
    try {
        const cookieStore = cookies();
        cookieStore.delete(ACCESS_TOKEN_KEY);
        cookieStore.delete(REFRESH_TOKEN_KEY);
    } catch (error) {
        console.error('خطأ في حذف الكوكيز من الخادم:', error);
    }
}
export async function redirectToLogin() {
    redirect('/auth/signin');
}