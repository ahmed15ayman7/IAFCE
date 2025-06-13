'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, Typography, Dialog, IconButton, Chip, Tooltip, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Reply as ReplyIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';
let handleReply = (value: any) => {
    console.log('handleReply', value);
}
let handleDelete = (value: any) => {
    console.log('handleDelete', value);
}
// تعريف مخطط التحقق من صحة البيانات
const contactMessageSchema = z.object({
    name: z.string().min(1, 'الاسم مطلوب'),
    email: z.string().email('البريد الإلكتروني غير صالح'),
    phone: z.string().min(1, 'رقم الهاتف مطلوب'),
    message: z.string().min(1, 'الرسالة مطلوبة'),
    response: z.string().optional(),
});

type ContactMessageFormData = z.infer<typeof contactMessageSchema>;

// تعريف أعمدة الجدول
const columns = [
    {
        field: 'name',
        headerName: 'الاسم',
        flex: 1,
        renderCell: (params: any) => (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {params.value}
            </motion.div>
        ),
    },
    {
        field: 'email',
        headerName: 'البريد الإلكتروني',
        flex: 1,
    },
    {
        field: 'phone',
        headerName: 'رقم الهاتف',
        flex: 1,
    },
    {
        field: 'status',
        headerName: 'الحالة',
        flex: 1,
        renderCell: (params: any) => (
            <Chip
                label={params.value}
                color={params.value === 'جديد' ? 'warning' : 'success'}
                size="small"
            />
        ),
    },
    {
        field: 'createdAt',
        headerName: 'تاريخ الإرسال',
        flex: 1,
        valueFormatter: (params: any) => new Date(params.value).toLocaleDateString('ar-SA'),
    },
    {
        field: 'actions',
        headerName: 'الإجراءات',
        flex: 1,
        renderCell: (params: any) => (
            <Box className="flex gap-2">
                <Tooltip title="الرد">
                    <IconButton
                        onClick={() => handleReply(params.row)}
                        size="small"
                        className="text-blue-600 hover:bg-blue-50"
                    >
                        <ReplyIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="حذف">
                    <IconButton
                        onClick={() => handleDelete(params.row.id)}
                        size="small"
                        className="text-red-600 hover:bg-red-50"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
    },
];

export default function ContactPage() {
    const [open, setOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [response, setResponse] = useState('');

    const queryClient = useQueryClient();

    // جلب البيانات
    const { data: messages, isLoading } = useQuery({
        queryKey: ['contact-messages'],
        queryFn: async () => {
            const response = await fetch('/api/public-relations/contact-messages');
            if (!response.ok) throw new Error('فشل في جلب البيانات');
            return response.json();
        },
    });

    // تحديث الرسالة
    const updateMutation = useMutation({
        mutationFn: async (data: { id: string; response: string }) => {
            const response = await fetch(`/api/public-relations/contact-messages/${data.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    response: data.response,
                    status: 'تم الرد',
                }),
            });
            if (!response.ok) throw new Error('فشل في تحديث الرسالة');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
            setOpen(false);
            setSelectedMessage(null);
            setResponse('');
            toast.success('تم إرسال الرد بنجاح');
        },
        onError: (error) => {
            toast.error('حدث خطأ أثناء إرسال الرد');
        },
    });

    // حذف الرسالة
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/public-relations/contact-messages/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('فشل في حذف الرسالة');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
            toast.success('تم حذف الرسالة بنجاح');
        },
        onError: (error) => {
            toast.error('حدث خطأ أثناء حذف الرسالة');
        },
    });

    const handleReply = (message: any) => {
        setSelectedMessage(message);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handleSubmit = () => {
        if (!response.trim()) {
            toast.error('يرجى كتابة رد');
            return;
        }

        updateMutation.mutate({
            id: selectedMessage.id,
            response,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
        >
            <Card className="p-6 shadow-lg">
                <Box className="mb-6">
                    <Typography variant="h5" className="mb-2 font-bold text-gray-800">
                        رسائل الاتصال
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                        إدارة رسائل الاتصال والرد عليها
                    </Typography>
                </Box>

                <DataGrid
                    rows={messages || []}
                    columns={columns}
                    loading={isLoading}
                    autoHeight
                    pageSizeOptions={[5, 10, 25]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    className="bg-white"
                    disableRowSelectionOnClick
                />
            </Card>

            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    setSelectedMessage(null);
                    setResponse('');
                }}
                maxWidth="md"
                fullWidth
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-6"
                >
                    <Typography variant="h6" className="mb-4 font-bold text-gray-800">
                        الرد على الرسالة
                    </Typography>

                    {selectedMessage && (
                        <Box className="mb-4 space-y-4">
                            <Box>
                                <Typography variant="subtitle2" className="text-gray-600">
                                    المرسل
                                </Typography>
                                <Typography variant="body1">{selectedMessage.name}</Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" className="text-gray-600">
                                    البريد الإلكتروني
                                </Typography>
                                <Typography variant="body1">{selectedMessage.email}</Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" className="text-gray-600">
                                    رقم الهاتف
                                </Typography>
                                <Typography variant="body1">{selectedMessage.phone}</Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" className="text-gray-600">
                                    الرسالة
                                </Typography>
                                <Typography variant="body1">{selectedMessage.message}</Typography>
                            </Box>

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="الرد"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                className="mt-4"
                            />
                        </Box>
                    )}

                    <Box className="mt-6 flex justify-end gap-2">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpen(false);
                                setSelectedMessage(null);
                                setResponse('');
                            }}
                        >
                            إلغاء
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={updateMutation.isPending}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {updateMutation.isPending ? 'جاري الإرسال...' : 'إرسال الرد'}
                        </Button>
                    </Box>
                </motion.div>
            </Dialog>
        </motion.div>
    );
}