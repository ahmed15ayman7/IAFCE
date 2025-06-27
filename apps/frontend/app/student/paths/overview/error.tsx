'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/common/Button';

const Alert = dynamic(() => import('@/components/common/Alert'), { 
    loading: () => <div className="p-4 bg-red-50 border border-red-200 rounded-lg"></div> 
});

export default function PathsOverviewError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="space-y-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-4">
                <h2 className="text-lg font-bold text-red-800">حدث خطأ في تحميل المسارات</h2>
                <p className="text-red-600">
                    عذراً، حدث خطأ أثناء تحميل بيانات المسارات. يرجى المحاولة مرة أخرى.
                </p>
                <div className="flex space-x-2 space-x-reverse">
                    <Button variant="contained" onClick={reset}>
                        إعادة المحاولة
                    </Button>
                    <Button variant="outlined" onClick={() => window.location.href = '/student/dashboard'}>
                        العودة للرئيسية
                    </Button>
                </div>
            </div>
        </div>
    );
} 