'use client';

import { Box, CssBaseline } from '@mui/material';
import { Providers } from '../providers';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <Box sx={{ display: 'flex', direction: 'rtl' }}>
                <CssBaseline />
                <AdminHeader />
                <AdminSidebar />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        mt: 8,
                        backgroundColor: 'background.default',
                        minHeight: '100vh',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Providers>
    );
} 