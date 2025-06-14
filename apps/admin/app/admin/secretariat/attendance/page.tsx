'use client';

import { Box, Typography, Paper } from '@mui/material';
import AttendanceTable from '../components/AttendanceTable';

export default function AttendancePage() {
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    سجل الحضور
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    هنا يمكنك إدارة سجلات الحضور والانصراف
                </Typography>
            </Box>

            <Paper sx={{ p: 2 }}>
                <AttendanceTable />
            </Paper>
        </Box>
    );
} 