'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authApi } from '@/lib/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await authApi.forgotPassword(email);
            setSuccess(true);
        } catch (error) {
            setError('حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        نسيت كلمة المرور؟
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
                    </p>
                </div>

                {success ? (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-green-800">
                                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
                            </p>
                            <Link
                                href="/auth/signin"
                                className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                العودة لتسجيل الدخول
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                البريد الإلكتروني
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="البريد الإلكتروني"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
                            </button>
                        </div>

                        <div className="text-sm text-center">
                            <Link
                                href="/auth/signin"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                العودة لتسجيل الدخول
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
} 