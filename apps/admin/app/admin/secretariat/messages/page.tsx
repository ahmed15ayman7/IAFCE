'use client';

import { Box, Typography, Paper } from '@mui/material';
import MessagesTable from '../components/MessagesTable';

export default function MessagesPage() {
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    الرسائل الداخلية
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    هنا يمكنك إدارة الرسائل الداخلية والمراسلات
                </Typography>
            </Box>

            <Paper sx={{ p: 2 }}>
                <MessagesTable />
            </Paper>
        </Box>
    );
} 