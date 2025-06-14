'use client';

import { useState, useEffect } from 'react';
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

interface NewsEvent {
    id: string;
    title: string;
    content: string;
    date: string;
    type: 'NEWS' | 'EVENT';
    image?: string;
}

export default function MediaCenterPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<NewsEvent | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'NEWS',
        image: '',
    });

    const queryClient = useQueryClient();

    const { data: newsEvents, isLoading } = useQuery({
        queryKey: ['newsEvents'],
        queryFn: async () => {
            const response = await fetch('/api/public-relations/news-events');
            if (!response.ok) throw new Error('فشل في جلب البيانات');
            return response.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: Omit<NewsEvent, 'id'>) => {
            const response = await fetch('/api/public-relations/news-events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('فشل في إنشاء الخبر/الفعالية');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsEvents'] });
            handleClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (data: NewsEvent) => {
            const response = await fetch(`/api/public-relations/news-events/${data.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('فشل في تحديث الخبر/الفعالية');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsEvents'] });
            handleClose();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/public-relations/news-events/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('فشل في حذف الخبر/الفعالية');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsEvents'] });
        },
    });

    const handleOpen = () => {
        setSelectedItem(null);
        setFormData({
            title: '',
            content: '',
            type: 'NEWS',
            image: '',
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const handleEdit = (item: NewsEvent) => {
        setSelectedItem(item);
        setFormData({
            title: item.title,
            content: item.content,
            type: item.type,
            image: item.image || '',
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الخبر/الفعالية؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            updateMutation.mutate({
                ...formData,
                id: selectedItem.id,
                date: selectedItem.date,
                type: formData.type as NewsEvent['type']
            });
        } else {
            createMutation.mutate({
                ...formData,
                date: new Date().toISOString(),
                type: formData.type as NewsEvent['type']
            });
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
                            المركز الإعلامي
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            إدارة الأخبار والفعاليات
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        إضافة خبر/فعالية جديدة
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>العنوان</TableCell>
                                <TableCell>النوع</TableCell>
                                <TableCell>التاريخ</TableCell>
                                <TableCell>الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newsEvents?.map((item: NewsEvent) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={item.type === 'NEWS' ? 'خبر' : 'فعالية'}
                                            color={item.type === 'NEWS' ? 'primary' : 'secondary'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(item.date), 'dd MMMM yyyy', { locale: arSA })}
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
                    {selectedItem ? 'تعديل خبر/فعالية' : 'إضافة خبر/فعالية جديدة'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="العنوان"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="المحتوى"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    multiline
                                    rows={4}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>النوع</InputLabel>
                                    <Select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'NEWS' | 'EVENT' })}
                                        label="النوع"
                                    >
                                        <MenuItem value="NEWS">خبر</MenuItem>
                                        <MenuItem value="EVENT">فعالية</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="رابط الصورة"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                />
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