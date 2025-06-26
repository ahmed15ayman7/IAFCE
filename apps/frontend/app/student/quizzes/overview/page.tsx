'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QuizzesOverflowDefaultPage() {
    const router = useRouter();

    useEffect(() => {
        // إعادة توجيه إلى صفحة التقويم افتراضياً
        router.replace('/student/quizzes/overflow/calendar');
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-gray-600">جاري التحميل...</p>
            </div>
        </div>
    );
} 