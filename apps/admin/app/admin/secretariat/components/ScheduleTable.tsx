'use client';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Box,
    Button,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

interface Schedule {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    type: 'CLASS' | 'MEETING' | 'EXAM';
    course?: {
        title: string;
    };
    location?: string;
    participants: {
        id: string;
        firstName: string;
        lastName: string;
    }[];
}

let initialData: Schedule[] = [

    {
        id: '1',
        title: 'Schedule 1',
        description: 'Description 1',
        startTime: new Date(),
        endTime: new Date(),
        type: 'CLASS',
        course: { title: 'Course 1' },
        location: 'Location 1',
        participants: [{ id: '1', firstName: 'John', lastName: 'Doe' }],
    },
];
export default function ScheduleTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, isLoading, error } = useQuery({
        queryKey: ['schedule', page, rowsPerPage],
        queryFn: async () => {
            const response = await api.get('/secretariat/schedule', {
                params: {
                    skip: page * rowsPerPage,
                    take: rowsPerPage,
                },
            });
            return response.data;
        },
    });

    // if (isLoading) return <div>جاري التحميل...</div>;
    if (error) return <div>حدث خطأ في تحميل البيانات</div>;

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'CLASS':
                return 'primary';
            case 'MEETING':
                return 'success';
            case 'EXAM':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>العنوان</TableCell>
                        <TableCell>الوصف</TableCell>
                        <TableCell>وقت البدء</TableCell>
                        <TableCell>وقت الانتهاء</TableCell>
                        <TableCell>النوع</TableCell>
                        <TableCell>الدورة</TableCell>
                        <TableCell>الموقع</TableCell>
                        <TableCell>المشاركون</TableCell>
                        <TableCell>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data?.schedules || initialData).map((schedule: Schedule) => (
                        <TableRow key={schedule.id}>
                            <TableCell>{schedule.title}</TableCell>
                            <TableCell>{schedule.description}</TableCell>
                            <TableCell>
                                {format(new Date(schedule.startTime), 'PPp', { locale: arSA })}
                            </TableCell>
                            <TableCell>
                                {format(new Date(schedule.endTime), 'PPp', { locale: arSA })}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={schedule.type}
                                    color={getTypeColor(schedule.type)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{schedule.course?.title || '-'}</TableCell>
                            <TableCell>{schedule.location || '-'}</TableCell>
                            <TableCell>
                                {schedule.participants.map((p) => `${p.firstName} ${p.lastName}`).join(', ')}
                            </TableCell>
                            <TableCell>
                                <Box>
                                    <IconButton size="small" color="primary">
                                        <ViewIcon />
                                    </IconButton>
                                    <IconButton size="small" color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} 