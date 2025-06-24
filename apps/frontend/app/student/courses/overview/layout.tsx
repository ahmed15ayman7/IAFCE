'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// Dynamic imports للتبويبات
const ActiveCourses = dynamic(() => import('./@active/page'), { loading: () => <div>جاري التحميل...</div> });
const CompletedCourses = dynamic(() => import('./@completed/page'), { loading: () => <div>جاري التحميل...</div> });

const tabs = [
  { label: 'الكورسات النشطة', value: 'active' },
  { label: 'الكورسات المكتملة', value: 'completed' },
];

export default function CoursesOverviewLayout() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8 flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as 'active' | 'completed')}
            className={`pb-2 px-4 text-lg font-semibold border-b-2 transition-colors ${
              activeTab === tab.value
                ? 'border-primary-main text-primary-main'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوى التبويب */}
      <div>
        {activeTab === 'active' && <ActiveCourses />}
        {activeTab === 'completed' && <CompletedCourses />}
      </div>
    </div>
  );
}
