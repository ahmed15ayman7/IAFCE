'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Cairo } from 'next/font/google';
import { Providers } from './providers';
import { useEffect } from 'react';
import '../globals.css';
import useLanguageStore from '@/store/useLanguageStore';
import Script from 'next/script';
const cairo = Cairo({
    subsets: ['arabic'],
    variable: '--font-cairo',
    weight: ['300', '400', '500', '600', '700'],
});




export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { locale, isClient } = useLanguageStore();
    // useEffect(() => {
    //     document.documentElement.dir = locale === 'en' ? 'ltr' : 'rtl';
    //     document.documentElement.lang = locale;
    // }, [locale]);
    const content = isClient ? (<AppRouterCacheProvider>

        <Providers locale={locale}>
                {children}
            <div id="google_translate_element">
            </div>
        </Providers>
    </AppRouterCacheProvider>) : null

    return (
        <html suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
                <title>IAFCE - الاكاديمية الدوليه للتعليم المستمر</title>
                <meta name="description" content="  الاكاديمية الدوليه للتعليم المستمر ، دورات تعليميه علي اعلي مستوي " />
                <meta name="author" content="IAFCE" />
                <meta name="keywords" content="الاكاديمية الدوليه للتعليم المستمر" />
                <meta name="robots" content="index, follow" />
                <Script src="/assets/scripts/google-translate.js" strategy="beforeInteractive" />

            </head>
            <body className={cairo.variable}>
                {content}
            </body>
        </html>
    );
} 