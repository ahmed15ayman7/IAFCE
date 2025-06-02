'use client';

import { Box, CssBaseline } from '@mui/material';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box sx={{ display: 'flex', direction: 'rtl' }}>
            <CssBaseline />
            <AdminHeader />
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
            <AdminSidebar />
        </Box>
    );
} 