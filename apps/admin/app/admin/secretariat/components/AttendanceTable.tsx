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

interface Attendance {
    id: string;
    employee: {
        firstName: string;
        lastName: string;
    };
    checkIn: Date;
    checkOut?: Date;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
    notes?: string;
    secretary: {
        firstName: string;
        lastName: string;
    };
    createdAt: Date;
}
let initialData: Attendance[] = [
    {
        id: '1',
        employee: { firstName: 'John', lastName: 'Doe' },
        checkIn: new Date(),
        checkOut: new Date(),
        status: 'PRESENT',
        notes: 'No notes',
        secretary: { firstName: 'Jane', lastName: 'Smith' },
        createdAt: new Date(),
    },
    {
        id: '2',
        employee: { firstName: 'Jane', lastName: 'Smith' },
        checkIn: new Date(),
        checkOut: new Date(),
        status: 'PRESENT',
        notes: 'No notes',
        secretary: { firstName: 'Jane', lastName: 'Smith' },
        createdAt: new Date(),
    },
    {
        id: '3',
        employee: { firstName: 'Jane', lastName: 'Smith' },
        checkIn: new Date(),
        checkOut: new Date(),
        status: 'PRESENT',
        notes: 'No notes',
        secretary: { firstName: 'Jane', lastName: 'Smith' },
        createdAt: new Date(),
    },
];
export default function AttendanceTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, isLoading, error } = useQuery({
        queryKey: ['attendance', page, rowsPerPage],
        queryFn: async () => {
            const response = await api.get('/secretariat/attendance', {
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
            case 'PRESENT':
                return 'success';
            case 'ABSENT':
                return 'error';
            case 'LATE':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>الموظف</TableCell>
                        <TableCell>وقت الحضور</TableCell>
                        <TableCell>وقت الانصراف</TableCell>
                        <TableCell>الحالة</TableCell>
                        <TableCell>ملاحظات</TableCell>
                        <TableCell>السكرتير</TableCell>
                        <TableCell>تاريخ التسجيل</TableCell>
                        <TableCell>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data?.attendance || initialData).map((record: Attendance) => (
                        <TableRow key={record.id}>
                            <TableCell>{`${record.employee.firstName} ${record.employee.lastName}`}</TableCell>
                            <TableCell>
                                {format(new Date(record.checkIn), 'PPp', { locale: arSA })}
                            </TableCell>
                            <TableCell>
                                {record.checkOut
                                    ? format(new Date(record.checkOut), 'PPp', { locale: arSA })
                                    : '-'}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={record.status}
                                    color={getStatusColor(record.status)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{record.notes || '-'}</TableCell>
                            <TableCell>
                                {`${record.secretary.firstName} ${record.secretary.lastName}`}
                            </TableCell>
                            <TableCell>
                                {format(new Date(record.createdAt), 'PPp', { locale: arSA })}
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