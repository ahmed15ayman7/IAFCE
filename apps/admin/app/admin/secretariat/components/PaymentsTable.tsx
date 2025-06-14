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

interface Payment {
    id: string;
    amount: number;
    method: 'CASH' | 'BANK_TRANSFER' | 'ELECTRONIC' | 'INSTALLMENT';
    paidAt: Date;
    notes?: string;
    user: {
        firstName: string;
        lastName: string;
    };
    secretary: {
        firstName: string;
        lastName: string;
    };
}

let initialData: Payment[] = [

    {
        id: '1',
        amount: 1000,
        method: 'CASH',
        paidAt: new Date(),
        notes: 'No notes',
        user: { firstName: 'John', lastName: 'Doe' },
        secretary: { firstName: 'Jane', lastName: 'Smith' },
    },
];
export default function PaymentsTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, isLoading, error } = useQuery({
        queryKey: ['payments', page, rowsPerPage],
        queryFn: async () => {
            const response = await api.get('/secretariat/payments', {
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

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'CASH':
                return 'success';
            case 'BANK_TRANSFER':
                return 'primary';
            case 'ELECTRONIC':
                return 'info';
            case 'INSTALLMENT':
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
                        <TableCell>المتدرب</TableCell>
                        <TableCell>المبلغ</TableCell>
                        <TableCell>طريقة الدفع</TableCell>
                        <TableCell>تاريخ الدفع</TableCell>
                        <TableCell>السكرتير</TableCell>
                        <TableCell>ملاحظات</TableCell>
                        <TableCell>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data?.payments || initialData).map((payment: Payment) => (
                        <TableRow key={payment.id}>
                            <TableCell>{`${payment.user.firstName} ${payment.user.lastName}`}</TableCell>
                            <TableCell>{payment.amount} ريال</TableCell>
                            <TableCell>
                                <Chip
                                    label={payment.method}
                                    color={getMethodColor(payment.method)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {format(new Date(payment.paidAt), 'PPp', { locale: arSA })}
                            </TableCell>
                            <TableCell>
                                {`${payment.secretary.firstName} ${payment.secretary.lastName}`}
                            </TableCell>
                            <TableCell>{payment.notes || '-'}</TableCell>
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