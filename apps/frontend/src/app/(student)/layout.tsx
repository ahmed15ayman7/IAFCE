import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { layoutsConfig } from '@/config/layouts';
import { redirect } from 'next/navigation';

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>جاري التحميل...</div>;
    }

    if (!user || user.role !== 'student') {
        redirect('/login');
    }

    const layoutConfig = layoutsConfig.student;

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar
                links={layoutConfig.navbarLinks}
                user={user}
                showNotifications={layoutConfig.showNotifications}
                showProfile={layoutConfig.showProfile}
                showSearch={layoutConfig.showSearch}
                showLanguageSwitcher={layoutConfig.showLanguageSwitcher}
                showThemeSwitcher={layoutConfig.showThemeSwitcher}
            />
            <main className="flex-1">{children}</main>
            <Footer links={layoutConfig.footerLinks} />
        </div>
    );
} 