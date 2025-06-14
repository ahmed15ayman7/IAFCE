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
    Mail as MailIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

interface Message {
    id: string;
    title: string;
    content: string;
    priority: 'HIGH' | 'NORMAL' | 'LOW';
    isRead: boolean;
    sender: {
        firstName: string;
        lastName: string;
    };
    recipients: {
        firstName: string;
        lastName: string;
    }[];
    createdAt: Date;
}

let initialData: Message[] = [

    {
        id: '1',
        title: 'Message 1',
        content: 'Content 1',
        priority: 'HIGH',
        isRead: false,
        sender: { firstName: 'John', lastName: 'Doe' },
        recipients: [{ firstName: 'Jane', lastName: 'Smith' }],
        createdAt: new Date(),
    },
];
export default function MessagesTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, isLoading, error } = useQuery({
        queryKey: ['messages', page, rowsPerPage],
        queryFn: async () => {
            const response = await api.get('/secretariat/messages', {
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

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH':
                return 'error';
            case 'NORMAL':
                return 'primary';
            case 'LOW':
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
                        <TableCell>العنوان</TableCell>
                        <TableCell>المحتوى</TableCell>
                        <TableCell>الأولوية</TableCell>
                        <TableCell>المرسل</TableCell>
                        <TableCell>المستلمون</TableCell>
                        <TableCell>الحالة</TableCell>
                        <TableCell>تاريخ الإرسال</TableCell>
                        <TableCell>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data?.messages || initialData).map((message: Message) => (
                        <TableRow key={message.id}>
                            <TableCell>{message.title}</TableCell>
                            <TableCell>{message.content}</TableCell>
                            <TableCell>
                                <Chip
                                    label={message.priority}
                                    color={getPriorityColor(message.priority)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {`${message.sender.firstName} ${message.sender.lastName}`}
                            </TableCell>
                            <TableCell>
                                {message.recipients
                                    .map((r) => `${r.firstName} ${r.lastName}`)
                                    .join(', ')}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={message.isRead ? 'مقروءة' : 'غير مقروءة'}
                                    color={message.isRead ? 'success' : 'warning'}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {format(new Date(message.createdAt), 'PPp', { locale: arSA })}
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