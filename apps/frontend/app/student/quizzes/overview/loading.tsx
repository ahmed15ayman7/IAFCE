import React from 'react';
import dynamic from 'next/dynamic';

const Skeleton = dynamic(() => import('@/components/common/Skeleton'), { loading: () => <div>جاري التحميل...</div> });

export default function QuizzesOverflowLoading() {
    return (
        <div className="space-y-6">
            {/* عنوان الصفحة */}
            <div className="space-y-2">
                <Skeleton height={32} width={300} />
                <Skeleton height={20} width={400} />
            </div>

            {/* التبويبات */}
            <div className="bg-white rounded-lg shadow-sm border p-1">
                <div className="flex space-x-1">
                    {Array.from({ length: 4 }, (_, i) => (
                        <Skeleton key={i} height={40} width={100} />
                    ))}
                </div>
            </div>

            {/* محتوى الصفحة */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton height={400} />
                <Skeleton height={400} />
            </div>
        </div>
    );
} 