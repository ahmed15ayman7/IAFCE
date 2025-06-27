import React from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/common/Button';

const EmptyState = dynamic(() => import('@/components/common/EmptyState'), { 
    loading: () => <div className="text-center p-8">
        <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
    </div> 
});

export default function PathsOverviewNotFound() {
    return (
        <div className="space-y-6">
            <EmptyState
                title="الصفحة غير موجودة"
                description="عذراً، الصفحة التي تبحث عنها غير موجودة"
                action={{
                    label: 'العودة للرئيسية',
                    onClick: () => window.location.href = '/student/dashboard',
                }}
            />
        </div>
    );
} 