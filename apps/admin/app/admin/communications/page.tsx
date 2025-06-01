'use client';

import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Chip,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { communicationsApi } from '@/lib/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

const MotionCard = motion(Card);

export default function CommunicationsPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: '',
        status: 'DRAFT',
    });
    const queryClient = useQueryClient();

    const { data: communicationsData } = useQuery({
        queryKey: ['communications'],
        queryFn: () => communicationsApi.getAll('academy-id'),
    });

    const addMutation = useMutation({
        mutationFn: (data: any) => communicationsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['communications'] });
            setOpen(false);
            setFormData({
                title: '',
                content: '',
                type: '',
                status: 'DRAFT',
            });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => communicationsApi.update(selectedItem?.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['communications'] });
            setOpen(false);
            setSelectedItem(null);
            setFormData({
                title: '',
                content: '',
                type: '',
                status: 'DRAFT',
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => communicationsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['communications'] });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            updateMutation.mutate({
                ...formData,
                academyId: 'academy-id',
                updatedByAdminId: 'admin-id',
            });
        } else {
            addMutation.mutate({
                ...formData,
                academyId: 'academy-id',
                createdByAdminId: 'admin-id',
            });
        }
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setFormData({
            title: item.title,
            content: item.content,
            type: item.type,
            status: item.status,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            deleteMutation.mutate(id);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLISHED':
                return 'success';
            case 'DRAFT':
                return 'warning';
            case 'ARCHIVED':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PUBLISHED':
                return 'منشور';
            case 'DRAFT':
                return 'مسودة';
            case 'ARCHIVED':
                return 'مؤرشف';
            default:
                return status;
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">العلاقات العامة</Typography>
                <PermissionGuard requiredPermissions={['manageCommunications']}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedItem(null);
                            setFormData({
                                title: '',
                                content: '',
                                type: '',
                                status: 'DRAFT',
                            });
                            setOpen(true);
                        }}
                    >
                        إضافة جديد
                    </Button>
                </PermissionGuard>
            </Box>

            <Grid container spacing={3}>
                {communicationsData?.data?.map((item: any) => (
                    <Grid item xs={12} md={6} lg={4} key={item.id}>
                        <MotionCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Chip
                                        label={getStatusText(item.status)}
                                        color={getStatusColor(item.status) as any}
                                        size="small"
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {item.content}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {format(new Date(item.createdAt), 'PPP', { locale: arSA })}
                                    </Typography>
                                    <Box>
                                        <PermissionGuard requiredPermissions={['manageCommunications']}>
                                            <IconButton size="small" onClick={() => handleEdit(item)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </PermissionGuard>
                                    </Box>
                                </Box>
                            </CardContent>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedItem ? 'تعديل المحتوى' : 'إضافة محتوى جديد'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="العنوان"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="المحتوى"
                                    multiline
                                    rows={4}
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="النوع"
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({ ...formData, type: e.target.value })
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    fullWidth
                                    label="الحالة"
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({ ...formData, status: e.target.value })
                                    }
                                    required
                                >
                                    <option value="DRAFT">مسودة</option>
                                    <option value="PUBLISHED">منشور</option>
                                    <option value="ARCHIVED">مؤرشف</option>
                                </TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>إلغاء</Button>
                        <Button type="submit" variant="contained">
                            {selectedItem ? 'تحديث' : 'إضافة'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
} 