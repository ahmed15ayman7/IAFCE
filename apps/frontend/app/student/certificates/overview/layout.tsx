'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

// Dynamic imports للتبويبات
const MyCertificatesTab = dynamic(() => import('./@mycertificates/page'), { loading: () => <div /> });
const RequestCertificateTab = dynamic(() => import('./@request/page'), { loading: () => <div /> });
const AchievementsTab = dynamic(() => import('./@achievements/page'), { loading: () => <div /> });

const tabs = [
  { label: 'شهاداتي', value: 'mycertificates' },
  { label: 'طلب شهادة', value: 'request' },
  { label: 'إنجازاتي', value: 'achievements' },
];

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<'mycertificates' | 'request' | 'achievements'>('mycertificates');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8 flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as 'mycertificates' | 'request' | 'achievements')}
            className={`pb-2 px-4 text-lg font-semibold border-b-2 transition-colors ${
              activeTab === tab.value
                ? 'border-primary-main text-primary-main bg-primary-50'
                : 'border-transparent text-gray-500 hover:bg-gray-100'
            } rounded-t`}
            style={{ minWidth: 120 }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Parallel Routes */}
      <div className="rounded-lg bg-white shadow p-4 min-h-[300px] transition-all duration-200">
        {activeTab === 'mycertificates' && <MyCertificatesTab />}
        {activeTab === 'request' && <RequestCertificateTab />}
        {activeTab === 'achievements' && <AchievementsTab />}
      </div>
    </div>
  );
} 