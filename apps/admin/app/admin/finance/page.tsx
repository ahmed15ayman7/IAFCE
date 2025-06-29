'use client';

import { useState, useEffect } from 'react';
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
    AccountBalance as FinanceIcon,
    AttachMoney as MoneyIcon,
    Receipt as InvoiceIcon,
    Payment as PaymentIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { accountingApi, paymentsApi, installmentsApi, expensesApi } from '@/lib/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { arSA, ar } from 'date-fns/locale';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { CardHeader } from '@mui/material';
import Input from '@/components/common/Input';

let initialfinanceData = [
    {
        id: '1',
        type: 'INCOME',
        amount: 1000,
        description: 'الراتب',
        date: '2025-01-01',
        academyId: '1',
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
        type: 'EXPENSE',
        amount: 1000,
        description: 'الراتب',
        date: '2025-01-01',
        academyId: '1',
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
        id: '3',
        type: 'INCOME',
        amount: 1000,
        description: 'الراتب',
        date: '2025-01-01',
        academyId: '1',
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
        id: '4',
        type: 'INCOME',
        amount: 1000,
        description: 'الراتب',
        date: '2025-01-01',
        academyId: '1',
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
        id: '5',
        type: 'INCOME',
        amount: 1000,
        description: 'الراتب',
        date: '2025-01-01',
        academyId: '1',
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
]

interface TabPanelProps {
    children?: React.ReactNode;
    className?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`finance-tabpanel-${index}`}
            aria-labelledby={`finance-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function FinancePage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [tabValue, setTabValue] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [formData, setFormData] = useState({
        type: '',
        amount: '',
        description: '',
        date: '',
    });
    const [timeRange, setTimeRange] = useState('daily');
    const [branchId, setBranchId] = useState<string>();
    const [statistics, setStatistics] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState({
        start: new Date(),
        end: new Date()
    });

    const queryClient = useQueryClient();

    const { data: accountingData } = useQuery({
        queryKey: ['accounting'],
        queryFn: () => accountingApi.getAll('academy-id'),
    });

    const { data: monthlyStats } = useQuery({
        queryKey: ['accounting-stats'],
        queryFn: () => accountingApi.getMonthlyStats('academy-id'),
    });

    const addMutation = useMutation({
        mutationFn: (data: any) => accountingApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounting'] });
            setOpen(false);
            setSnackbar({ open: true, message: 'تم إضافة العملية بنجاح', severity: 'success' });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => accountingApi.update(selectedItem?.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounting'] });
            setOpen(false);
            setSnackbar({ open: true, message: 'تم تحديث العملية بنجاح', severity: 'success' });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => accountingApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounting'] });
            setSnackbar({ open: true, message: 'تم حذف العملية بنجاح', severity: 'success' });
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
            type: item.type,
            amount: item.amount,
            description: item.description,
            date: item.date,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه العملية؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'INCOME':
                return 'success';
            case 'EXPENSE':
                return 'error';
            case 'SALARY':
                return 'warning';
            case 'ADVANCE':
                return 'info';
            default:
                return 'default';
        }
    };

    const getTypeText = (type: string) => {
        switch (type) {
            case 'INCOME':
                return 'دخل';
            case 'EXPENSE':
                return 'مصروف';
            case 'SALARY':
                return 'راتب';
            case 'ADVANCE':
                return 'سلفة';
            default:
                return type;
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [timeRange, branchId, dateRange]);

    const fetchStatistics = async () => {
        setLoading(true);
        try {
            const [payments, installments, expenses] = await Promise.all([
                timeRange === "daily" ? paymentsApi.getDailyStatistics(branchId) : timeRange === "weekly" ? paymentsApi.getWeeklyStatistics(branchId) : timeRange === "monthly" ? paymentsApi.getMonthlyStatistics(branchId) : paymentsApi.getYearlyStatistics(branchId),
                timeRange === "daily" ? installmentsApi.getDailyStatistics(branchId) : timeRange === "weekly" ? installmentsApi.getWeeklyStatistics(branchId) : timeRange === "monthly" ? installmentsApi.getMonthlyStatistics(branchId) : installmentsApi.getYearlyStatistics(branchId),
                timeRange === "daily" ? expensesApi.getDailyStatistics(branchId) : timeRange === "weekly" ? expensesApi.getWeeklyStatistics(branchId) : timeRange === "monthly" ? expensesApi.getMonthlyStatistics(branchId) : expensesApi.getYearlyStatistics(branchId),
            ]);

            setStatistics({
                payments: payments.data,
                installments: installments.data,
                expenses: expenses.data,
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
        setLoading(false);
    };

    const formatDate = (date: Date) => {
        return format(new Date(date), 'dd/MM/yyyy', { locale: ar });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: 'EGP',
        }).format(amount);
    };

    const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
        setDateRange(prev => ({
            ...prev,
            [type]: new Date(value)
        }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleTabChange2 = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
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
                                <FinanceIcon color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" component="h1">
                                    المحاسبة
                                </Typography>
                            </Box>
                            <PermissionGuard requiredPermissions={['manageFinance']}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        setSelectedItem(null);
                                        setFormData({
                                            type: '',
                                            amount: '',
                                            description: '',
                                            date: '',
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
                                    إضافة عملية جديدة
                                </Button>
                            </PermissionGuard>
                        </Box>

                        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tab label="العمليات" />
                            <Tab label="الفواتير" />
                            <Tab label="الرواتب" />
                            <Tab label="التقارير" />
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>النوع</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>المبلغ</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الوصف</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>التاريخ</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الإجراءات</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <AnimatePresence>
                                            {(accountingData?.data ?? initialfinanceData).map((item: any) => (
                                                <motion.tr
                                                    key={item.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <TableCell>
                                                        <Chip
                                                            label={getTypeText(item.type)}
                                                            color={getTypeColor(item.type) as any}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            color={item.type === 'INCOME' ? 'success.main' : 'error.main'}
                                                        >
                                                            {item.amount} ريال
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{item.description}</TableCell>
                                                    <TableCell>
                                                        {format(new Date(item.date), 'PPP', { locale: arSA })}
                                                    </TableCell>
                                                    <TableCell>
                                                        <PermissionGuard requiredPermissions={['manageFinance']}>
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
                                {(accountingData?.data ?? initialfinanceData).filter((item: any) => item.type === 'INVOICE').map((invoice: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={invoice.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <InvoiceIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">
                                                        {invoice.amount} ريال
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {invoice.description}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {format(new Date(invoice.date), 'PPP', { locale: arSA })}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <Grid container spacing={3}>
                                {(accountingData?.data ?? initialfinanceData).filter((item: any) => item.type === 'SALARY').map((salary: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={salary.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <PaymentIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">
                                                        {salary.amount} ريال
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {salary.description}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {format(new Date(salary.date), 'PPP', { locale: arSA })}
                                                </Typography>
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
                                                ملخص العمليات
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="success.main">
                                                        {(accountingData?.data ?? initialfinanceData).filter((i: any) => i.type === 'INCOME')
                                                            .reduce((sum: number, i: any) => sum + i.amount, 0)} ريال
                                                    </Typography>
                                                    <Typography variant="body2">إجمالي الدخل</Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="error.main">
                                                        {(accountingData?.data ?? initialfinanceData).filter((i: any) => i.type === 'EXPENSE')
                                                            .reduce((sum: number, i: any) => sum + i.amount, 0)} ريال
                                                    </Typography>
                                                    <Typography variant="body2">إجمالي المصروفات</Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card elevation={2}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                إحصائيات شهرية
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="primary.main">
                                                        {monthlyStats?.data?.totalIncome || 0} ريال
                                                    </Typography>
                                                    <Typography variant="body2">دخل الشهر</Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h4" color="primary.main">
                                                        {monthlyStats?.data?.totalExpenses || 0} ريال
                                                    </Typography>
                                                    <Typography variant="body2">مصروفات الشهر</Typography>
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
                        {selectedItem ? 'تعديل العملية' : 'إضافة عملية جديدة'}
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>نوع العملية</InputLabel>
                                        <Select
                                            value={formData.type}
                                            onChange={(e) =>
                                                setFormData({ ...formData, type: e.target.value })
                                            }
                                            required
                                            label="نوع العملية"
                                        >
                                            <MenuItem value="INCOME">دخل</MenuItem>
                                            <MenuItem value="EXPENSE">مصروف</MenuItem>
                                            <MenuItem value="SALARY">راتب</MenuItem>
                                            <MenuItem value="ADVANCE">سلفة</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="المبلغ"
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) =>
                                            setFormData({ ...formData, amount: e.target.value })
                                        }
                                        required
                                        InputProps={{
                                            endAdornment: <Typography>ريال</Typography>,
                                        }}
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
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="التاريخ"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, date: e.target.value })
                                        }
                                        required
                                        InputLabelProps={{ shrink: true }}
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

            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">لوحة التحكم المالية</h1>
                    <div className="flex gap-4">

                        <Select value={timeRange} placeholder="اختر الفترة الزمنية" onChange={(e) => setTimeRange(e.target.value)}>

                            <MenuItem value="daily">يومي</MenuItem>
                            <MenuItem value="weekly">أسبوعي</MenuItem>
                            <MenuItem value="monthly">شهري</MenuItem>
                            <MenuItem value="yearly">سنوي</MenuItem>
                        </Select>
                        <div className="flex gap-2">
                            <Input
                                label="التاريخ البدء"
                                type="date"
                                value={format(dateRange.start, 'yyyy-MM-dd')}
                                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                            />
                            <Input
                                label="التاريخ النهاية"
                                type="date"
                                value={format(dateRange.end, 'yyyy-MM-dd')}
                                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">إجمالي المدفوعات</Typography>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(statistics.payments?.totalAmount || 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {statistics.payments?.totalPayments || 0} عملية دفع
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="h6">إجمالي الأقساط</Typography>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(statistics.installments?.totalAmount || 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {statistics.installments?.totalCount || 0} قسط
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Typography variant="h6">إجمالي المصروفات</Typography>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(statistics.expenses?.totalAmount || 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {statistics.expenses?.totalCount || 0} مصروف
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue={0} value={activeTab} onChange={handleTabChange2} className="space-y-4">
                    <Tab value="overview" label="نظرة عامة" />
                    <Tab value="payments" label="المدفوعات" />
                    <Tab value="installments" label="الأقساط" />
                    <Tab value="expenses" label="المصروفات" />
                </Tabs>
                <TabPanel value={activeTab} index={0} className="space-y-4">
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">ملخص الأداء المالي</Typography>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={statistics.payments?.data || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatDate}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            tickFormatter={formatCurrency}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <RechartsTooltip
                                            formatter={(value: number) => formatCurrency(value)}
                                            labelFormatter={formatDate}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#8884d8"
                                            name="المدفوعات"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="installments"
                                            stroke="#82ca9d"
                                            name="الأقساط"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="expenses"
                                            stroke="#ffc658"
                                            name="المصروفات"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel value={activeTab} index={1} className="space-y-4">
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">المدفوعات عبر الزمن</Typography>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={statistics.payments?.data || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatDate}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            tickFormatter={formatCurrency}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <RechartsTooltip
                                            formatter={(value: number) => formatCurrency(value)}
                                            labelFormatter={formatDate}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#8884d8"
                                            name="المبلغ"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#82ca9d"
                                            name="العدد"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel value={activeTab} index={2} className="space-y-4">
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">الأقساط عبر الزمن</Typography>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={statistics.installments?.data || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatDate}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            tickFormatter={formatCurrency}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <RechartsTooltip
                                            formatter={(value: number) => formatCurrency(value)}
                                            labelFormatter={formatDate}
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="amount"
                                            fill="#8884d8"
                                            name="المبلغ"
                                        />
                                        <Bar
                                            dataKey="count"
                                            fill="#82ca9d"
                                            name="العدد"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>

                <TabPanel value={activeTab} index={3} className="space-y-4">
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">المصروفات عبر الزمن</Typography>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={statistics.expenses?.data || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatDate}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            tickFormatter={formatCurrency}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <RechartsTooltip
                                            formatter={(value: number) => formatCurrency(value)}
                                            labelFormatter={formatDate}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#8884d8"
                                            name="المبلغ"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#82ca9d"
                                            name="العدد"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabPanel>

            </div>
        </Box>
    );
} 