'use client';

import { Box, Typography, Paper } from '@mui/material';
import ScheduleTable from '../components/ScheduleTable';

export default function SchedulePage() {
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    جدول المواعيد
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    هنا يمكنك إدارة المواعيد والدروس والاجتماعات
                </Typography>
            </Box>

            <Paper sx={{ p: 2 }}>
                <ScheduleTable />
            </Paper>
        </Box>
    );
} 