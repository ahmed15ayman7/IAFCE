'use client';

import { useState } from 'react';
import {
    Box,
    Card,
    Grid,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

interface CSRProject {
    id: string;
    title: string;
    description: string;
    impact: string;
    images: string[];
    startDate: string;
    status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
}

export default function CSRPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<CSRProject | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        impact: '',
        images: [''],
        startDate: '',
        status: 'PLANNED',
    });

    const queryClient = useQueryClient();

    const { data: projects, isLoading } = useQuery({
        queryKey: ['csrProjects'],
        queryFn: async () => {
            const response = await fetch('/api/public-relations/csr-projects');
            if (!response.ok) throw new Error('فشل في جلب البيانات');
            return response.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: Omit<CSRProject, 'id'>) => {
            const response = await fetch('/api/public-relations/csr-projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('فشل في إنشاء المشروع');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['csrProjects'] });
            handleClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (data: CSRProject) => {
            const response = await fetch(`/api/public-relations/csr-projects/${data.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('فشل في تحديث المشروع');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['csrProjects'] });
            handleClose();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/public-relations/csr-projects/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('فشل في حذف المشروع');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['csrProjects'] });
        },
    });

    const handleOpen = () => {
        setSelectedItem(null);
        setFormData({
            title: '',
            description: '',
            impact: '',
            images: [''],
            startDate: '',
            status: 'PLANNED',
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const handleEdit = (item: CSRProject) => {
        setSelectedItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            impact: item.impact,
            images: item.images.length > 0 ? item.images : [''],
            startDate: item.startDate,
            status: item.status,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            updateMutation.mutate({
                ...formData,
                id: selectedItem.id,
                status: formData.status as CSRProject['status']
            });
        } else {
            createMutation.mutate({
                ...formData,
                status: formData.status as CSRProject['status']
            });
        }
    };

    const handleAddImage = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const handleRemoveImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PLANNED':
                return 'info';
            case 'IN_PROGRESS':
                return 'warning';
            case 'COMPLETED':
                return 'success';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PLANNED':
                return 'مخطط';
            case 'IN_PROGRESS':
                return 'قيد التنفيذ';
            case 'COMPLETED':
                return 'مكتمل';
            default:
                return status;
        }
    };

    if (isLoading) {
        return (
            <Box className="flex h-screen items-center justify-center">
                <Typography>جاري التحميل...</Typography>
            </Box>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
        >
            <Card className="p-6 shadow-lg">
                <Box className="mb-6 flex items-center justify-between">
                    <Box>
                        <Typography variant="h5" className="mb-2 font-bold text-gray-800">
                            المسؤولية المجتمعية
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            إدارة مشاريع المسؤولية المجتمعية
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        إضافة مشروع جديد
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>عنوان المشروع</TableCell>
                                <TableCell>التأثير</TableCell>
                                <TableCell>تاريخ البدء</TableCell>
                                <TableCell>الحالة</TableCell>
                                <TableCell>الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects?.map((item: CSRProject) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.impact}</TableCell>
                                    <TableCell>
                                        {format(new Date(item.startDate), 'dd MMMM yyyy', { locale: arSA })}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getStatusText(item.status)}
                                            color={getStatusColor(item.status)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(item)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(item.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedItem ? 'تعديل مشروع' : 'إضافة مشروع جديد'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="عنوان المشروع"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="وصف المشروع"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    multiline
                                    rows={4}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="تأثير المشروع"
                                    value={formData.impact}
                                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                                    multiline
                                    rows={2}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="تاريخ البدء"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>الحالة</InputLabel>
                                    <Select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as CSRProject['status'] })}
                                        label="الحالة"
                                    >
                                        <MenuItem value="PLANNED">مخطط</MenuItem>
                                        <MenuItem value="IN_PROGRESS">قيد التنفيذ</MenuItem>
                                        <MenuItem value="COMPLETED">مكتمل</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" className="mb-2">
                                    صور المشروع
                                </Typography>
                                {formData.images.map((image, index) => (
                                    <Box key={index} className="mb-2 flex items-center gap-2">
                                        <TextField
                                            fullWidth
                                            label={`رابط الصورة ${index + 1}`}
                                            value={image}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                        />
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveImage(index)}
                                            disabled={formData.images.length === 1}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                                <Button
                                    variant="outlined"
                                    onClick={handleAddImage}
                                    className="mt-2"
                                >
                                    إضافة صورة
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>إلغاء</Button>
                        <Button type="submit" variant="contained" color="primary">
                            {selectedItem ? 'تحديث' : 'إضافة'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </motion.div>
    );
}