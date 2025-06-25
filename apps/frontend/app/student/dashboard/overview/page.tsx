'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Dynamic imports للتبويبات (للتسريع)
const ActiveCourses = dynamic(() => import('./@active/page'), { loading: () => <div /> });
const CompletedCourses = dynamic(() => import('./@completed/page'), { loading: () => <div /> });

// Navigation Tabs
const tabs = [
  { label: 'الكورسات النشطة', href: '/student/courses/overview/active' },
  { label: 'الكورسات المكتملة', href: '/student/courses/overview/completed' },
];

// Parallel Routes Layout
export default function CoursesOverviewLayout({
  active,
  completed,
}: {
  active: React.ReactNode;
  completed: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-8 flex gap-4 border-b">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`pb-2 px-4 text-lg font-semibold border-b-2 transition-colors ${pathname?.endsWith(tab.href.split('/').pop()!) ? 'border-primary-main text-primary-main' : 'border-transparent text-gray-500'}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      {/* Parallel Routes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slot للكورسات النشطة */}
        <div className="col-span-1">
          {active}
        </div>
        {/* Slot للكورسات المكتملة */}
        <div className="col-span-1">
          {completed}
        </div>
      </div>
    </div>
  );
}
