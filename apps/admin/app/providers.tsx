'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ar } from 'date-fns/locale';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { ReactNode } from 'react';

// إنشاء كاش للـ RTL
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

// إنشاء ثيم مخصص
const theme = createTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: '#2563eb', // blue-600
            light: '#60a5fa', // blue-400
            dark: '#1d4ed8', // blue-700
        },
        secondary: {
            main: '#7c3aed', // violet-600
            light: '#a78bfa', // violet-400
            dark: '#5b21b6', // violet-700
        },
    },
    typography: {
        fontFamily: 'Cairo, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        backgroundColor: '#2b2b2b',
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#6b6b6b',
                        minHeight: 24,
                        border: '3px solid #2b2b2b',
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#959595',
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: '#2b2b2b',
                    },
                },
            },
        },
    },
});

// إنشاء QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ar}>
                            {children}
                        </LocalizationProvider>
                    </ThemeProvider>
                </CacheProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}