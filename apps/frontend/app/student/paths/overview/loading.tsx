import React from 'react';
import dynamic from 'next/dynamic';

const Skeleton = dynamic(() => import('@/components/common/Skeleton'), { 
    loading: () => <div className="h-[200px] w-[200px] bg-gray-200 rounded-2xl animate-pulse"></div> 
});

export default function PathsOverviewLoading() {
    return (
        <div className="space-y-6">
            {/* عنوان التحميل */}
            <div className="space-y-2">
                <Skeleton height={32} width={300} />
                <Skeleton height={20} width={400} />
            </div>

            {/* أزرار التحميل */}
            <div className="flex space-x-2 space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} height={36} width={80} />
                ))}
            </div>

            {/* محتوى التحميل */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-4 border rounded-lg space-y-4">
                        <Skeleton height={24} width={200} />
                        <Skeleton height={16} width={150} />
                        <Skeleton height={8} width="100%" />
                        <div className="flex justify-between">
                            <Skeleton height={16} width={80} />
                            <Skeleton height={16} width={60} />
                        </div>
                        <Skeleton height={36} width="100%" />
                    </div>
                ))}
            </div>
        </div>
    );
} 