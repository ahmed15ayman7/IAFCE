"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authApi } from '@/lib/api';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // التحقق من حالة المصادقة عند تحميل التطبيق
        const checkAuth = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    // يمكنك إضافة طلب للحصول على معلومات المستخدم هنا
                    // const response = await api.get('/auth/me');
                    // setUser(response.data);
                }
            } catch (error) {
                console.error('خطأ في التحقق من المصادقة:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authApi.login({ email, password });
            setUser(response.user);
            router.push('/dashboard');
        } catch (error) {
            console.error('خطأ في تسجيل الدخول:', error);
            throw error;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const response = await authApi.signup({ name, email, password });
            setUser(response.user);
            router.push('/dashboard');
        } catch (error) {
            console.error('خطأ في التسجيل:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setUser(null);
        } catch (error) {
            console.error('خطأ في تسجيل الخروج:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 