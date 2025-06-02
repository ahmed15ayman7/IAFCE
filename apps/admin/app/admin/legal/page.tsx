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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Divider,
    Tooltip,
    Alert,
    Snackbar,
    Tabs,
    Tab,
    Badge,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Gavel as LegalIcon,
    AttachFile as FileIcon,
    Payment as PaymentIcon,
    Event as EventIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { legalCaseApi, paymentApi } from '@/lib/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

let initiallegalData = [
    {
        id: '1',
        caseTitle: 'القضية',
        caseType: 'النوع',
        description: 'الوصف',
        courtDate: '2025-01-01',

        assignedLawyerId: '1',
        relatedUserId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '1',
        caseTitle: 'القضية',
        caseType: 'النوع',
        description: 'الوصف',
        courtDate: '2025-01-01',

        assignedLawyerId: '1',
        relatedUserId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '1',
        caseTitle: 'القضية',
        caseType: 'النوع',
        description: 'الوصف',
        courtDate: '2025-01-01',

        assignedLawyerId: '1',
        relatedUserId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '1',
        caseTitle: 'القضية',
        caseType: 'النوع',
        description: 'الوصف',
        courtDate: '2025-01-01',

        assignedLawyerId: '1',
        relatedUserId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '1',
        caseTitle: 'القضية',
        caseType: 'النوع',
        description: 'الوصف',
        courtDate: '2025-01-01',

        assignedLawyerId: '1',
        relatedUserId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
]

let initialpaymentsData = [

    {
        id: '1',
        amount: 1000,
        description: 'الوصف',
        date: '2025-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '1',
        amount: 1000,
        description: 'الوصف',
        date: '2025-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '1',
        amount: 1000,
        description: 'الوصف',
        date: '2025-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '1',
        amount: 1000,
        description: 'الوصف',
        date: '2025-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
    {
        id: '1',
        amount: 1000,
        description: 'الوصف',
        date: '2025-01-01',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        createdByAdmin: {
            id: '1',
            name: 'محمد حسين',
        },
    },
]

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`legal-tabpanel-${index}`}
            aria-labelledby={`legal-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function LegalPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [tabValue, setTabValue] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [formData, setFormData] = useState({
        caseTitle: '',
        caseType: '',
        description: '',
        courtDate: '',
        assignedLawyerId: '',
        relatedUserId: '',
    });

    const queryClient = useQueryClient();

    const { data: casesData } = useQuery({
        queryKey: ['legal-cases'],
        queryFn: () => legalCaseApi.getAll('academy-id'),
    });

    const { data: paymentsData } = useQuery({
        queryKey: ['legal-payments'],
        queryFn: () => paymentApi.getAll('academy-id'),
    });

    const addMutation = useMutation({
        mutationFn: (data: any) => legalCaseApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['legal-cases'] });
            setOpen(false);
            setSnackbar({ open: true, message: 'تم إضافة القضية بنجاح', severity: 'success' });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => legalCaseApi.update(selectedItem?.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['legal-cases'] });
            setOpen(false);
            setSnackbar({ open: true, message: 'تم تحديث القضية بنجاح', severity: 'success' });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => legalCaseApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['legal-cases'] });
            setSnackbar({ open: true, message: 'تم حذف القضية بنجاح', severity: 'success' });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            updateMutation.mutate({
                ...formData,
                academyId: 'academy-id',
            });
        } else {
            addMutation.mutate({
                ...formData,
                academyId: 'academy-id',
            });
        }
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setFormData({
            caseTitle: item.caseTitle,
            caseType: item.caseType,
            description: item.description,
            courtDate: item.courtDate,
            assignedLawyerId: item.assignedLawyerId,
            relatedUserId: item.relatedUserId,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه القضية؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
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
                                <LegalIcon color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" component="h1">
                                    الشؤون القانونية
                                </Typography>
                            </Box>
                            <PermissionGuard requiredPermissions={['manageLegal']}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        setSelectedItem(null);
                                        setFormData({
                                            caseTitle: '',
                                            caseType: '',
                                            description: '',
                                            courtDate: '',
                                            assignedLawyerId: '',
                                            relatedUserId: '',
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
                                    إضافة قضية جديدة
                                </Button>
                            </PermissionGuard>
                        </Box>

                        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tab label="القضايا" />
                            <Tab label="المدفوعات" />
                            <Tab label="الملفات" />
                            <Tab label="التقارير" />
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>عنوان القضية</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>النوع</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الحالة</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاريخ المحكمة</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>المحامي المسؤول</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الإجراءات</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <AnimatePresence>
                                            {(casesData?.data ?? initiallegalData).map((item: any) => (
                                                <motion.tr
                                                    key={item.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <TableCell>{item.caseTitle}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={item.caseType}
                                                            color="primary"
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={item.status}
                                                            color={
                                                                item.status === 'OPEN'
                                                                    ? 'error'
                                                                    : item.status === 'IN_PROGRESS'
                                                                        ? 'warning'
                                                                        : 'success'
                                                            }
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.courtDate
                                                            ? format(new Date(item.courtDate), 'PPP', { locale: arSA })
                                                            : 'غير محدد'}
                                                    </TableCell>
                                                    <TableCell>{item.assignedLawyerId}</TableCell>
                                                    <TableCell>
                                                        <PermissionGuard requiredPermissions={['manageLegal']}>
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
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <Grid container spacing={3}>
                                {(paymentsData?.data ?? initialpaymentsData).map((payment: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={payment.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <PaymentIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">
                                                        {payment.amount} ريال
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {format(new Date(payment.createdAt), 'PPP', { locale: arSA })}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <Grid container spacing={3}>
                                {(casesData?.data ?? initiallegalData).map((item: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={item.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <FileIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">{item.caseTitle}</Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.description}
                                                </Typography>
                                                <Box sx={{ mt: 2 }}>
                                                    <Chip
                                                        label={item.caseType}
                                                        color="primary"
                                                        size="small"
                                                        sx={{ mr: 1 }}
                                                    />
                                                    <Chip
                                                        label={item.status}
                                                        color={
                                                            item.status === 'OPEN'
                                                                ? 'error'
                                                                : item.status === 'IN_PROGRESS'
                                                                    ? 'warning'
                                                                    : 'success'
                                                        }
                                                        size="small"
                                                    />
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>

                        <TabPanel value={tabValue} index={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Card elevation={2}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                إحصائيات القضايا
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="error.main">
                                                        {(casesData?.data ?? initiallegalData).filter((c: any) => c.status === 'OPEN').length}
                                                    </Typography>
                                                    <Typography variant="body2">قضايا مفتوحة</Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="warning.main">
                                                        {(casesData?.data ?? initiallegalData).filter((c: any) => c.status === 'IN_PROGRESS').length}
                                                    </Typography>
                                                    <Typography variant="body2">قضايا قيد التنفيذ</Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="success.main">
                                                        {(casesData?.data ?? initiallegalData).filter((c: any) => c.status === 'CLOSED').length}
                                                    </Typography>
                                                    <Typography variant="body2">قضايا مغلقة</Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card elevation={2}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                إحصائيات المدفوعات
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="primary.main">
                                                        {(paymentsData?.data ?? initialpaymentsData).reduce((sum: number, p: any) => sum + p.amount, 0)} ريال
                                                    </Typography>
                                                    <Typography variant="body2">إجمالي المدفوعات</Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="primary.main">
                                                        {(paymentsData?.data ?? initialpaymentsData).length}
                                                    </Typography>
                                                    <Typography variant="body2">عدد المدفوعات</Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </CardContent>
                </Card>

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
                        {selectedItem ? 'تعديل القضية' : 'إضافة قضية جديدة'}
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="عنوان القضية"
                                        value={formData.caseTitle}
                                        onChange={(e) =>
                                            setFormData({ ...formData, caseTitle: e.target.value })
                                        }
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>نوع القضية</InputLabel>
                                        <Select
                                            value={formData.caseType}
                                            onChange={(e) =>
                                                setFormData({ ...formData, caseType: e.target.value })
                                            }
                                            required
                                            label="نوع القضية"
                                        >
                                            <MenuItem value="CONTRACT">عقد</MenuItem>
                                            <MenuItem value="DISPUTE">نزاع</MenuItem>
                                            <MenuItem value="INSURANCE">تأمين</MenuItem>
                                            <MenuItem value="EMPLOYMENT">توظيف</MenuItem>
                                            <MenuItem value="INTELLECTUAL_PROPERTY">ملكية فكرية</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="تاريخ المحكمة"
                                        type="date"
                                        value={formData.courtDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, courtDate: e.target.value })
                                        }
                                        InputLabelProps={{ shrink: true }}
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
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="المحامي المسؤول"
                                        value={formData.assignedLawyerId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, assignedLawyerId: e.target.value })
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="المستخدم المرتبط"
                                        value={formData.relatedUserId}
                                        onChange={(e) =>
                                            setFormData({ ...formData, relatedUserId: e.target.value })
                                        }
                                    />
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