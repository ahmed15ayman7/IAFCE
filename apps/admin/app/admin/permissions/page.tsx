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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Divider,
    Tooltip,
    Alert,
    Snackbar,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Security as SecurityIcon,
    AccountBalance as FinanceIcon,
    Public as CommunicationsIcon,
    Assignment as SecretaryIcon,
    Business as StaffIcon,
    Gavel as LegalIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { permissionsApi } from '@/lib/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

const MotionCard = motion(Card);

interface Permissions {
    viewFinance: boolean;
    manageFinance: boolean;
    viewCommunications: boolean;
    manageCommunications: boolean;
    viewSecretary: boolean;
    manageSecretary: boolean;
    viewStaff: boolean;
    manageStaff: boolean;
    viewLegal: boolean;
    manageLegal: boolean;
    managePermissions: boolean;
}

interface PermissionItem {
    id: string;
    name: string;
    description: string;
    permissions: Permissions;
    createdAt: string;
}

let initialpermissionsData = [

    {
        id: '1',
        name: 'الصلاحية',
        description: 'الوصف',
        permissions: {
            viewFinance: false,
            manageFinance: false,
            viewCommunications: false,
            manageCommunications: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
        updatedByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '2',
        name: 'الصلاحية',
        description: 'الوصف',
        permissions: {
            viewFinance: false,
            manageFinance: false,
            viewCommunications: false,
            manageCommunications: false,
        },
        createdAt: new Date(),
    },
]

export default function PermissionsPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<PermissionItem | null>(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        permissions: {
            viewFinance: false,
            manageFinance: false,
            viewCommunications: false,
            manageCommunications: false,
            viewSecretary: false,
            manageSecretary: false,
            viewStaff: false,
            manageStaff: false,
            viewLegal: false,
            manageLegal: false,
            managePermissions: false,
        } as Permissions,
    });
    const queryClient = useQueryClient();

    const { data: permissionsData } = useQuery<{ data: PermissionItem[] }>({
        queryKey: ['permissions'],
        queryFn: () => permissionsApi.getAll(),
    });

    const addMutation = useMutation({
        mutationFn: (data: any) => permissionsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            setOpen(false);
            setFormData({
                name: '',
                description: '',
                permissions: {
                    viewFinance: false,
                    manageFinance: false,
                    viewCommunications: false,
                    manageCommunications: false,
                    viewSecretary: false,
                    manageSecretary: false,
                    viewStaff: false,
                    manageStaff: false,
                    viewLegal: false,
                    manageLegal: false,
                    managePermissions: false,
                },
            });
            setSnackbar({ open: true, message: 'تم إضافة الصلاحية بنجاح', severity: 'success' });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => permissionsApi.update(selectedItem?.id || '', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            setOpen(false);
            setSelectedItem(null);
            setFormData({
                name: '',
                description: '',
                permissions: {
                    viewFinance: false,
                    manageFinance: false,
                    viewCommunications: false,
                    manageCommunications: false,
                    viewSecretary: false,
                    manageSecretary: false,
                    viewStaff: false,
                    manageStaff: false,
                    viewLegal: false,
                    manageLegal: false,
                    managePermissions: false,
                },
            });
            setSnackbar({ open: true, message: 'تم تحديث الصلاحية بنجاح', severity: 'success' });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => permissionsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['permissions'] });
            setSnackbar({ open: true, message: 'تم حذف الصلاحية بنجاح', severity: 'success' });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            updateMutation.mutate({
                ...formData,
                userId: 'admin-id',
            });
        } else {
            addMutation.mutate({
                ...formData,
                userId: 'admin-id',
            });
        }
    };

    const handleEdit = (item: PermissionItem) => {
        setSelectedItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            permissions: item.permissions,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه الصلاحية؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handlePermissionChange = (permission: keyof Permissions) => {
        setFormData((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [permission]: !prev.permissions[permission],
            },
        }));
    };

    return (
        <Box sx={{ p: 3 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card elevation={3} sx={{ mb: 4 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <SecurityIcon color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" component="h1">
                                    إدارة الصلاحيات
                                </Typography>
                            </Box>
                            <PermissionGuard requiredPermissions={['manageStaff']}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        setSelectedItem(null);
                                        setFormData({
                                            name: '',
                                            description: '',
                                            permissions: {
                                                viewFinance: false,
                                                manageFinance: false,
                                                viewCommunications: false,
                                                manageCommunications: false,
                                                viewSecretary: false,
                                                manageSecretary: false,
                                                viewStaff: false,
                                                manageStaff: false,
                                                viewLegal: false,
                                                manageLegal: false,
                                                managePermissions: false,
                                            },
                                        });
                                        setOpen(true);
                                    }}
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                    }}
                                >
                                    إضافة صلاحية جديدة
                                </Button>
                            </PermissionGuard>
                        </Box>
                    </CardContent>
                </Card>

                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الاسم</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الوصف</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الصلاحيات</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاريخ الإنشاء</TableCell>
                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <AnimatePresence>
                                {(permissionsData?.data ?? initialpermissionsData).map((item: any) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {Object.entries(item.permissions as Record<string, boolean>).map(([key, value]) => (
                                                    value && (
                                                        <Chip
                                                            key={key}
                                                            label={key}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                            sx={{
                                                                '&:hover': {
                                                                    backgroundColor: 'primary.light',
                                                                    color: 'white',
                                                                },
                                                            }}
                                                        />
                                                    )
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(item.createdAt), 'PPP', { locale: arSA })}
                                        </TableCell>
                                        <TableCell>
                                            <PermissionGuard requiredPermissions={['manageStaff']}>
                                                <Tooltip title="تعديل">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleEdit(item)}
                                                        sx={{ color: 'primary.main' }}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="حذف">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDelete(item.id)}
                                                        sx={{ color: 'error.main' }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </PermissionGuard>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            boxShadow: 24,
                        },
                    }}
                >
                    <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white' }}>
                        {selectedItem ? 'تعديل الصلاحية' : 'إضافة صلاحية جديدة'}
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="الاسم"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="الوصف"
                                        multiline
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        required
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                                        الصلاحيات
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <Card elevation={2} sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <FinanceIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="subtitle1" color="primary">
                                                        المحاسبة
                                                    </Typography>
                                                </Box>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.viewFinance}
                                                            onChange={() => handlePermissionChange('viewFinance')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="عرض المحاسبة"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.manageFinance}
                                                            onChange={() => handlePermissionChange('manageFinance')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="إدارة المحاسبة"
                                                />
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Card elevation={2} sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <CommunicationsIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="subtitle1" color="primary">
                                                        العلاقات العامة
                                                    </Typography>
                                                </Box>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.viewCommunications}
                                                            onChange={() => handlePermissionChange('viewCommunications')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="عرض العلاقات العامة"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.manageCommunications}
                                                            onChange={() => handlePermissionChange('manageCommunications')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="إدارة العلاقات العامة"
                                                />
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Card elevation={2} sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <SecretaryIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="subtitle1" color="primary">
                                                        السكرتارية
                                                    </Typography>
                                                </Box>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.viewSecretary}
                                                            onChange={() => handlePermissionChange('viewSecretary')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="عرض السكرتارية"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.manageSecretary}
                                                            onChange={() => handlePermissionChange('manageSecretary')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="إدارة السكرتارية"
                                                />
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Card elevation={2} sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <StaffIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="subtitle1" color="primary">
                                                        الإدارة العامة
                                                    </Typography>
                                                </Box>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.viewStaff}
                                                            onChange={() => handlePermissionChange('viewStaff')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="عرض الإدارة العامة"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.manageStaff}
                                                            onChange={() => handlePermissionChange('manageStaff')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="إدارة الإدارة العامة"
                                                />
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Card elevation={2} sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <LegalIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="subtitle1" color="primary">
                                                        الشؤون القانونية
                                                    </Typography>
                                                </Box>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.viewLegal}
                                                            onChange={() => handlePermissionChange('viewLegal')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="عرض الشؤون القانونية"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.manageLegal}
                                                            onChange={() => handlePermissionChange('manageLegal')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="إدارة الشؤون القانونية"
                                                />
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Card elevation={2} sx={{ p: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <LegalIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="subtitle1" color="primary">
                                                        الصلاحيات المخصصة
                                                    </Typography>
                                                </Box>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formData.permissions.managePermissions}
                                                            onChange={() => handlePermissionChange('managePermissions')}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="إدارة الصلاحيات المخصصة"
                                                />
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 3 }}>
                            <Button
                                onClick={() => setOpen(false)}
                                variant="outlined"
                                sx={{ mr: 1 }}
                            >
                                إلغاء
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            >
                                {selectedItem ? 'تحديث' : 'إضافة'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </motion.div>
        </Box>
    );
} 