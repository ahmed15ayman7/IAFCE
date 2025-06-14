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

interface Trainee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: 'ACTIVE' | 'SUSPENDED' | 'COMPLETED';
    enrollment: {
        course: {
            title: string;
        };
    };
}

let initialData: Trainee[] = [

    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        status: 'ACTIVE',
        enrollment: {
            course: {
                title: 'Course 1',
            },
        },
    },
];
export default function TraineesTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, isLoading, error } = useQuery({
        queryKey: ['trainees', page, rowsPerPage],
        queryFn: async () => {
            const response = await api.get('/secretariat/trainees', {
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'success';
            case 'SUSPENDED':
                return 'error';
            case 'COMPLETED':
                return 'info';
            default:
                return 'default';
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>الاسم</TableCell>
                        <TableCell>البريد الإلكتروني</TableCell>
                        <TableCell>رقم الهاتف</TableCell>
                        <TableCell>الدورة</TableCell>
                        <TableCell>الحالة</TableCell>
                        <TableCell>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data?.trainees || initialData).map((trainee: Trainee) => (
                        <TableRow key={trainee.id}>
                            <TableCell>{`${trainee.firstName} ${trainee.lastName}`}</TableCell>
                            <TableCell>{trainee.email}</TableCell>
                            <TableCell>{trainee.phone}</TableCell>
                            <TableCell>{trainee.enrollment.course.title}</TableCell>
                            <TableCell>
                                <Chip
                                    label={trainee.status}
                                    color={getStatusColor(trainee.status)}
                                    size="small"
                                />
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