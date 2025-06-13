'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, Typography, Dialog, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';
import NewsEventForm from './components/NewsEventForm';

let handleEdit = (value: any) => {
    console.log('handleEdit', value);
}
let handleDelete = (value: any) => {
    console.log('handleDelete', value);
}
// تعريف مخطط التحقق من صحة البيانات
const newsEventSchema = z.object({
    title: z.string().min(1, 'العنوان مطلوب'),
    content: z.string().min(1, 'المحتوى مطلوب'),
    date: z.date(),
    type: z.enum(['NEWS', 'EVENT', 'SUCCESS_STORY']),
    image: z.string().optional(),
});

// تعريف أعمدة الجدول
const columns = [
    { field: 'title', headerName: 'العنوان', flex: 1 },
    { field: 'type', headerName: 'النوع', width: 150 },
    { field: 'date', headerName: 'التاريخ', width: 150 },
    { field: 'createdBy', headerName: 'تم الإنشاء بواسطة', width: 200 },
    { field: 'createdAt', headerName: 'تاريخ الإنشاء', width: 200 },
    {
        field: 'actions',
        headerName: 'الإجراءات',
        width: 120,
        renderCell: (params: any) => (
            <Box>
                <IconButton onClick={() => handleEdit(params.row)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        ),
    },
];

export default function MediaCenterPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const queryClient = useQueryClient();

    // جلب البيانات
    const { data: newsEvents, isLoading } = useQuery({
        queryKey: ['newsEvents'],
        queryFn: async () => {
            const response = await fetch('/api/public-relations/news-events');
            if (!response.ok) throw new Error('فشل في جلب البيانات');
            return response.json();
        },
    });

    // إنشاء عنصر جديد
    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch('/api/public-relations/news-events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('فشل في إنشاء العنصر');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsEvents'] });
            toast.success('تم إنشاء العنصر بنجاح');
            setOpen(false);
        },
        onError: (error) => {
            toast.error('حدث خطأ أثناء إنشاء العنصر');
        },
    });

    // تحديث عنصر
    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: any }) => {
            const response = await fetch(`/api/public-relations/news-events/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('فشل في تحديث العنصر');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsEvents'] });
            toast.success('تم تحديث العنصر بنجاح');
            setOpen(false);
        },
        onError: (error) => {
            toast.error('حدث خطأ أثناء تحديث العنصر');
        },
    });

    // حذف عنصر
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/public-relations/news-events/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('فشل في حذف العنصر');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsEvents'] });
            toast.success('تم حذف العنصر بنجاح');
        },
        onError: (error) => {
            toast.error('حدث خطأ أثناء حذف العنصر');
        },
    });

    const handleEdit = (row: any) => {
        setSelectedItem(row);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handleSubmit = (data: any) => {
        if (selectedItem) {
            updateMutation.mutate({ id: selectedItem.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="p-6">
                <Box className="flex justify-between items-center mb-6">
                    <Typography variant="h5" component="h1">
                        المركز الإعلامي
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setSelectedItem(null);
                            setOpen(true);
                        }}
                    >
                        إضافة عنصر جديد
                    </Button>
                </Box>

                <DataGrid
                    rows={newsEvents || []}
                    columns={columns}
                    loading={isLoading}
                    autoHeight
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />

                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <Box className="p-6">
                        <Typography variant="h6" component="h2" className="mb-4">
                            {selectedItem ? 'تعديل العنصر' : 'إضافة عنصر جديد'}
                        </Typography>
                        <NewsEventForm
                            initialData={selectedItem}
                            onSubmit={handleSubmit}
                            onCancel={() => setOpen(false)}
                        />
                    </Box>
                </Dialog>
            </Card>
        </motion.div>
    );
}