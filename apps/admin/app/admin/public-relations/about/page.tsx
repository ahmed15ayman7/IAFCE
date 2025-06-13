'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Card, Typography, Dialog, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '@/hooks/useUser';
import api from '@/lib/api';
import { AboutSectionForm } from './components/AboutSectionForm';

const aboutSectionSchema = z.object({
    title: z.string().min(1, 'العنوان مطلوب'),
    content: z.string().min(1, 'المحتوى مطلوب'),
    image: z.string().optional(),
    type: z.string().min(1, 'النوع مطلوب'),
});

type AboutSectionFormData = z.infer<typeof aboutSectionSchema>;

const columns = [
    { field: 'title', headerName: 'العنوان', width: 200 },
    { field: 'type', headerName: 'النوع', width: 150 },
    {
        field: 'createdBy',
        headerName: 'تم الإنشاء بواسطة',
        width: 200,
        valueGetter: (params: any) =>
            `${params.row.createdBy.user.firstName} ${params.row.createdBy.user.lastName}`,
    },
    {
        field: 'createdAt',
        headerName: 'تاريخ الإنشاء',
        width: 200,
        valueGetter: (params: any) => new Date(params.row.createdAt).toLocaleDateString('ar-SA'),
    },
    {
        field: 'actions',
        headerName: 'الإجراءات',
        width: 150,
        renderCell: (params: any) => (
            <Box>
                <IconButton onClick={() => params.row.onEdit(params.row)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => params.row.onDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        ),
    },
];

export default function AboutPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const queryClient = useQueryClient();
    const { user } = useUser();

    const { data: aboutSections, isLoading } = useQuery({
        queryKey: ['about-sections'],
        queryFn: () => api.get('/public-relations/about'),
    });

    const createMutation = useMutation({
        mutationFn: (data: AboutSectionFormData) =>
            api.post('/public-relations/about', { ...data, createdById: user?.id }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about-sections'] });
            setOpen(false);
            toast.success('تم إنشاء القسم بنجاح');
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: AboutSectionFormData }) =>
            api.patch(`/public-relations/about/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about-sections'] });
            setOpen(false);
            toast.success('تم تحديث القسم بنجاح');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/public-relations/about/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about-sections'] });
            toast.success('تم حذف القسم بنجاح');
        },
    });

    const handleOpen = () => {
        setSelectedItem(null);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedItem(null);
        setOpen(false);
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا القسم؟')) {
            deleteMutation.mutate(id);
        }
    };

    const onSubmit = (data: AboutSectionFormData) => {
        if (selectedItem) {
            updateMutation.mutate({ id: selectedItem.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const rows = aboutSections?.data?.map((item: any) => ({
        ...item,
        onEdit: handleEdit,
        onDelete: handleDelete,
    }));

    return (
        <Box className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box className="flex justify-between items-center mb-6">
                    <Typography variant="h4" className="font-bold">
                        من نحن
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        className="bg-primary hover:bg-primary/90"
                    >
                        إضافة قسم جديد
                    </Button>
                </Box>

                <Card className="p-4">
                    <DataGrid
                        rows={rows || []}
                        columns={columns}
                        loading={isLoading}
                        autoHeight
                        pageSizeOptions={[5, 10, 25]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        className="rtl"
                    />
                </Card>

                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <Box className="p-6">
                        <Typography variant="h6" className="mb-4">
                            {selectedItem ? 'تعديل القسم' : 'إضافة قسم جديد'}
                        </Typography>
                        <AboutSectionForm
                            onSubmit={onSubmit}
                            initialData={selectedItem}
                            onCancel={handleClose}
                        />
                    </Box>
                </Dialog>
            </motion.div>
        </Box>
    );
}