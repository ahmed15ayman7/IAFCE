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
    CircularProgress,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Public as PublicIcon,
    Message as MessageIcon,
    Event as EventIcon,
    PostAdd as PostIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { publicRelationsApi } from '@/lib/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Tooltip as RechartsTooltip,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from 'recharts';

let initialpublicRelationsData = [
    {
        id: '1',
        senderName: 'محمد حسين',
        senderContact: '0599999999',
        message: 'الرسالة',
        status: 'PENDING',
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
        id: '2',
        senderName: 'محمد حسين',
        senderContact: '0599999999',
        message: 'الرسالة',
        status: 'PENDING',
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
        id: '3',
        senderName: 'محمد حسين',
        senderContact: '0599999999',
        message: 'الرسالة',
        status: 'PENDING',
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
        id: '4',
        senderName: 'محمد حسين',
        senderContact: '0599999999',
        message: 'الرسالة',
        status: 'PENDING',
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

// ألوان الرسوم البيانية
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
            id={`pr-tabpanel-${index}`}
            aria-labelledby={`pr-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function PublicRelationsPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [tabValue, setTabValue] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [formData, setFormData] = useState({
        message: '',
        senderName: '',
        senderContact: '',
        status: 'PENDING',
    });

    const queryClient = useQueryClient();

    const { data: prData, isLoading } = useQuery({
        queryKey: ['prStatistics'],
        queryFn: async () => {
            const response = await fetch('/api/public-relations/statistics');
            if (!response.ok) throw new Error('فشل في جلب البيانات');
            return response.json();
        },
    });

    const addMutation = useMutation({
        mutationFn: (data: any) => publicRelationsApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public-relations'] });
            setOpen(false);
            setSnackbar({ open: true, message: 'تم إضافة السجل بنجاح', severity: 'success' });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => publicRelationsApi.update(selectedItem?.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public-relations'] });
            setOpen(false);
            setSnackbar({ open: true, message: 'تم تحديث السجل بنجاح', severity: 'success' });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => publicRelationsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public-relations'] });
            setSnackbar({ open: true, message: 'تم حذف السجل بنجاح', severity: 'success' });
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
            message: item.message,
            senderName: item.senderName,
            senderContact: item.senderContact,
            status: item.status,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا السجل؟')) {
            deleteMutation.mutate(id);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'warning';
            case 'IN_PROGRESS':
                return 'info';
            case 'RESOLVED':
                return 'success';
            case 'CLOSED':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'قيد الانتظار';
            case 'IN_PROGRESS':
                return 'قيد التنفيذ';
            case 'RESOLVED':
                return 'تم الحل';
            case 'CLOSED':
                return 'مغلق';
            default:
                return status;
        }
    };

    if (isLoading) {
        return (
            <Box className="flex h-screen items-center justify-center">
                <CircularProgress />
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
                <Box className="mb-6">
                    <Typography variant="h5" className="mb-2 font-bold text-gray-800">
                        إحصائيات العلاقات العامة
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                        نظرة عامة على أداء العلاقات العامة
                    </Typography>
                </Box>

                <Tabs value={tabValue} onChange={handleTabChange} className="mb-4">
                    <Tab label="نظرة عامة" />
                    <Tab label="الرسائل" />
                    <Tab label="الأخبار والفعاليات" />
                    <Tab label="الأسئلة الشائعة" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={3}>
                        {/* إحصائيات عامة */}
                        <Grid item xs={12} md={3}>
                            <Paper className="p-4 text-center">
                                <Typography variant="h6" className="text-gray-600">
                                    إجمالي الرسائل
                                </Typography>
                                <Typography variant="h4" className="font-bold text-blue-600">
                                    {prData?.totalMessages || 0}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper className="p-4 text-center">
                                <Typography variant="h6" className="text-gray-600">
                                    الأخبار والفعاليات
                                </Typography>
                                <Typography variant="h4" className="font-bold text-green-600">
                                    {prData?.totalNewsEvents || 0}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper className="p-4 text-center">
                                <Typography variant="h6" className="text-gray-600">
                                    الأسئلة الشائعة
                                </Typography>
                                <Typography variant="h4" className="font-bold text-purple-600">
                                    {prData?.totalFaqs || 0}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper className="p-4 text-center">
                                <Typography variant="h6" className="text-gray-600">
                                    معدل الرد
                                </Typography>
                                <Typography variant="h4" className="font-bold text-orange-600">
                                    {prData?.responseRate || 0}%
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* رسم بياني دائري لحالة الرسائل */}
                        <Grid item xs={12} md={6}>
                            <Card className="p-4">
                                <Typography variant="h6" className="mb-4 text-center">
                                    حالة الرسائل
                                </Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={prData?.messageStatus || []}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {prData?.messageStatus?.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>
                        </Grid>

                        {/* رسم بياني خطي للرسائل الشهرية */}
                        <Grid item xs={12} md={6}>
                            <Card className="p-4">
                                <Typography variant="h6" className="mb-4 text-center">
                                    الرسائل الشهرية
                                </Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={prData?.monthlyMessages || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <RechartsTooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#8884d8"
                                            name="عدد الرسائل"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={3}>
                        {/* رسم بياني شريطي لأنواع الرسائل */}
                        <Grid item xs={12}>
                            <Card className="p-4">
                                <Typography variant="h6" className="mb-4 text-center">
                                    توزيع أنواع الرسائل
                                </Typography>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={prData?.messageTypes || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <RechartsTooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#8884d8" name="عدد الرسائل" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={3}>
                        {/* رسم بياني شريطي للأخبار والفعاليات */}
                        <Grid item xs={12}>
                            <Card className="p-4">
                                <Typography variant="h6" className="mb-4 text-center">
                                    توزيع الأخبار والفعاليات
                                </Typography>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={prData?.newsEventsDistribution || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <RechartsTooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#00C49F" name="العدد" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                    <Grid container spacing={3}>
                        {/* رسم بياني دائري للأسئلة الشائعة */}
                        <Grid item xs={12}>
                            <Card className="p-4">
                                <Typography variant="h6" className="mb-4 text-center">
                                    توزيع الأسئلة الشائعة حسب الفئة
                                </Typography>
                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={prData?.faqCategories || []}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={150}
                                            label
                                        >
                                            {prData?.faqCategories?.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Card>
        </motion.div>
    );
} 