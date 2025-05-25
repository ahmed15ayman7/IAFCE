"use client"
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { layoutsConfig } from '@/config/layouts';
import { redirect } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, status } = useUser();

    if (status === 'loading') {
        return <div>جاري التحميل...</div>;
    }

    if (!user || user.role !== 'STUDENT') {
        redirect('/auth/signin');
    }

    const layoutConfig = layoutsConfig.student;

    return (
        <div className="flex min-h-screen flex-col w-full h-full">
            <Navbar
                links={layoutConfig.navbarLinks}
                user={user}
                role={user.role}
                showNotifications={layoutConfig.showNotifications ?? false}
                showProfile={layoutConfig.showProfile ?? false}
                showSearch={layoutConfig.showSearch ?? false}
                onToggleTheme={() => { }}
                onToggleLanguage={() => { }}
                isDarkMode={false}
            // showLanguageSwitcher={layoutConfig.showLanguageSwitcher}
            // showThemeSwitcher={layoutConfig.showThemeSwitcher}
            />
            <main className="flex-1 p-5">{children}</main>
            <Footer
                links={layoutConfig.footerLinks}
            />
        </div>
    );
} 