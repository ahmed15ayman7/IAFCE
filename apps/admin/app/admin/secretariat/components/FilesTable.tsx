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
    Download as DownloadIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

interface File {
    id: string;
    title: string;
    description?: string;
    category: string;
    tags: string[];
    file: {
        name: string;
        url: string;
        type: 'VIDEO' | 'PDF' | 'DOCUMENT' | 'IMAGE' | 'AUDIO';
    };
    secretary: {
        firstName: string;
        lastName: string;
    };
    createdAt: Date;
}

let initialData: File[] = [

    {
        id: '1',
        title: 'File 1',
        description: 'Description 1',
        category: 'Category 1',
        tags: ['Tag 1', 'Tag 2'],
        file: {
            name: 'File 1',
            url: 'https://example.com/file1.pdf',
            type: 'PDF',
        },
        secretary: {
            firstName: 'John',
            lastName: 'Doe',
        },
        createdAt: new Date(),
    },
];
export default function FilesTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, isLoading, error } = useQuery({
        queryKey: ['files', page, rowsPerPage],
        queryFn: async () => {
            const response = await api.get('/secretariat/files', {
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

    const getFileTypeColor = (type: string) => {
        switch (type) {
            case 'VIDEO':
                return 'error';
            case 'PDF':
                return 'error';
            case 'DOCUMENT':
                return 'primary';
            case 'IMAGE':
                return 'success';
            case 'AUDIO':
                return 'info';
            default:
                return 'default';
        }
    };

    const handleDownload = (url: string, name: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>العنوان</TableCell>
                        <TableCell>الوصف</TableCell>
                        <TableCell>التصنيف</TableCell>
                        <TableCell>الوسوم</TableCell>
                        <TableCell>نوع الملف</TableCell>
                        <TableCell>السكرتير</TableCell>
                        <TableCell>تاريخ الرفع</TableCell>
                        <TableCell>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data?.files || initialData).map((file: File) => (
                        <TableRow key={file.id}>
                            <TableCell>{file.title}</TableCell>
                            <TableCell>{file.description || '-'}</TableCell>
                            <TableCell>{file.category}</TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {file.tags.map((tag) => (
                                        <Chip key={tag} label={tag} size="small" />
                                    ))}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={file.file.type}
                                    color={getFileTypeColor(file.file.type)}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {`${file.secretary.firstName} ${file.secretary.lastName}`}
                            </TableCell>
                            <TableCell>
                                {format(new Date(file.createdAt), 'PPp', { locale: arSA })}
                            </TableCell>
                            <TableCell>
                                <Box>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => handleDownload(file.file.url, file.file.name)}
                                    >
                                        <DownloadIcon />
                                    </IconButton>
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