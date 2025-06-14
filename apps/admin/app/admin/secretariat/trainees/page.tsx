'use client';

import { Box, Typography, Paper } from '@mui/material';
import TraineesTable from '../components/TraineesTable';

export default function TraineesPage() {
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    إدارة المتدربين
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    هنا يمكنك إدارة المتدربين وعرض تفاصيلهم وتتبع تقدمهم
                </Typography>
            </Box>

            <Paper sx={{ p: 2 }}>
                <TraineesTable />
            </Paper>
        </Box>
    );
}