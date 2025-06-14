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

interface Partnership {
    id: string;
    partnerName: string;
    description: string;
    logo?: string;
    type: 'LOCAL' | 'INTERNATIONAL' | 'ACADEMIC' | 'COMMUNITY';
    startDate: string;
    endDate?: string;
    status: 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
}

export default function PartnershipsPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Partnership | null>(null);
    const [formData, setFormData] = useState({
        partnerName: '',
        description: '',
        type: 'LOCAL',
        logo: '',
        startDate: '',
        endDate: '',
        status: 'ACTIVE',
    });

    const queryClient = useQueryClient();

    const { data: partnerships, isLoading } = useQuery({
        queryKey: ['partnerships'],
        queryFn: async () => {
            const response = await fetch('/api/public-relations/partnerships');
            if (!response.ok) throw new Error('فشل في جلب البيانات');
            return response.json();
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: Omit<Partnership, 'id'>) => {
            const response = await fetch('/api/public-relations/partnerships', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('فشل في إنشاء الشراكة');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partnerships'] });
            handleClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (data: Partnership) => {
            const response = await fetch(`/api/public-relations/partnerships/${data.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('فشل في تحديث الشراكة');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partnerships'] });
            handleClose();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/public-relations/partnerships/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('فشل في حذف الشراكة');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partnerships'] });
        },
    });

    const handleOpen = () => {
        setSelectedItem(null);
        setFormData({
            partnerName: '',
            description: '',
            type: 'LOCAL',
            logo: '',
            startDate: '',
            endDate: '',
            status: 'ACTIVE',
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const handleEdit = (item: Partnership) => {
        setSelectedItem(item);
        setFormData({
            partnerName: item.partnerName,
            description: item.description,
            type: item.type,
            logo: item.logo || '',
            startDate: item.startDate,
            endDate: item.endDate || '',
            status: item.status,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه الشراكة؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            updateMutation.mutate({
                ...formData,
                id: selectedItem.id,
                type: formData.type as Partnership['type'],
                status: formData.status as Partnership['status']
            });
        } else {
            createMutation.mutate({
                ...formData,
                type: formData.type as Partnership['type'],
                status: formData.status as Partnership['status']
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'success';
            case 'EXPIRED':
                return 'error';
            case 'TERMINATED':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'نشطة';
            case 'EXPIRED':
                return 'منتهية';
            case 'TERMINATED':
                return 'ملغاة';
            default:
                return status;
        }
    };

    const getTypeText = (type: string) => {
        switch (type) {
            case 'LOCAL':
                return 'محلية';
            case 'INTERNATIONAL':
                return 'دولية';
            case 'ACADEMIC':
                return 'أكاديمية';
            case 'COMMUNITY':
                return 'مجتمعية';
            default:
                return type;
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
                            الشراكات
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            إدارة الشراكات والاتفاقيات
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        إضافة شراكة جديدة
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>اسم الشريك</TableCell>
                                <TableCell>نوع الشراكة</TableCell>
                                <TableCell>تاريخ البداية</TableCell>
                                <TableCell>تاريخ النهاية</TableCell>
                                <TableCell>الحالة</TableCell>
                                <TableCell>الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {partnerships?.map((item: Partnership) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.partnerName}</TableCell>
                                    <TableCell>{getTypeText(item.type)}</TableCell>
                                    <TableCell>
                                        {format(new Date(item.startDate), 'dd MMMM yyyy', { locale: arSA })}
                                    </TableCell>
                                    <TableCell>
                                        {item.endDate
                                            ? format(new Date(item.endDate), 'dd MMMM yyyy', { locale: arSA })
                                            : '-'}
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
                    {selectedItem ? 'تعديل شراكة' : 'إضافة شراكة جديدة'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="اسم الشريك"
                                    value={formData.partnerName}
                                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="وصف الشراكة"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    multiline
                                    rows={4}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>نوع الشراكة</InputLabel>
                                    <Select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as Partnership['type'] })}
                                        label="نوع الشراكة"
                                    >
                                        <MenuItem value="LOCAL">محلية</MenuItem>
                                        <MenuItem value="INTERNATIONAL">دولية</MenuItem>
                                        <MenuItem value="ACADEMIC">أكاديمية</MenuItem>
                                        <MenuItem value="COMMUNITY">مجتمعية</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>الحالة</InputLabel>
                                    <Select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Partnership['status'] })}
                                        label="الحالة"
                                    >
                                        <MenuItem value="ACTIVE">نشطة</MenuItem>
                                        <MenuItem value="EXPIRED">منتهية</MenuItem>
                                        <MenuItem value="TERMINATED">ملغاة</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="تاريخ البداية"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="تاريخ النهاية"
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="رابط الشعار"
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
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