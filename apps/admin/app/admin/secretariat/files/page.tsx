'use client';

import { Box, Typography, Paper } from '@mui/material';
import FilesTable from '../components/FilesTable';

export default function FilesPage() {
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    إدارة الملفات
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    هنا يمكنك إدارة الملفات والمستندات
                </Typography>
            </Box>

            <Paper sx={{ p: 2 }}>
                <FilesTable />
            </Paper>
        </Box>
    );
} 