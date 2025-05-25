"use client"
import React, { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { layoutsConfig } from '@/config/layouts';
import { useRouter } from 'next/navigation';

export default function ParentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, status } = useUser();
    const router = useRouter();
    useEffect(() => {
        if ((!user || user.role !== 'PARENT') && status === 'authenticated') {
            router.replace('/auth/signin');
        }
    }, [user, status]);


    const layoutConfig = layoutsConfig.parent;

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar
                links={layoutConfig.navbarLinks}
                role={user?.role}
                isDarkMode={false}
                onToggleTheme={() => { }}
                onToggleLanguage={() => { }}
                user={user}
                showNotifications={layoutConfig.showNotifications ?? false}
                showProfile={layoutConfig.showProfile ?? false}
                showSearch={layoutConfig.showSearch ?? false}
            // showLanguageSwitcher={layoutConfig.showLanguageSwitcher ?? false}
            // showThemeSwitcher={layoutConfig.showThemeSwitcher}
            />
            <main className="flex-1">{children}</main>
            <Footer links={layoutConfig.footerLinks} />
        </div>
    );
} 