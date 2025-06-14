'use client';

import { Box, Typography, Paper } from '@mui/material';
import PaymentsTable from '../components/PaymentsTable';

export default function PaymentsPage() {
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    إدارة الدفعات
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    هنا يمكنك إدارة الدفعات والمبالغ المالية
                </Typography>
            </Box>

            <Paper sx={{ p: 2 }}>
                <PaymentsTable />
            </Paper>
        </Box>
    );
} 