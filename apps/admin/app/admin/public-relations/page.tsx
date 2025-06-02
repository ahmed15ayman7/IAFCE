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

    const { data: prData } = useQuery({
        queryKey: ['public-relations'],
        queryFn: () => publicRelationsApi.getAll('academy-id'),
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
                                <PublicIcon color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" component="h1">
                                    العلاقات العامة
                                </Typography>
                            </Box>
                            <PermissionGuard requiredPermissions={['managePR']}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        setSelectedItem(null);
                                        setFormData({
                                            message: '',
                                            senderName: '',
                                            senderContact: '',
                                            status: 'PENDING',
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
                                    إضافة سجل جديد
                                </Button>
                            </PermissionGuard>
                        </Box>

                        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tab label="السجلات" />
                            <Tab label="الردود" />
                            <Tab label="الفعاليات" />
                            <Tab label="المنشورات" />
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>المرسل</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الرسالة</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الحالة</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>التاريخ</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الإجراءات</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <AnimatePresence>
                                            {(prData?.data ?? initialpublicRelationsData).map((item: any) => (
                                                <motion.tr
                                                    key={item.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <TableCell>
                                                        <Typography variant="subtitle2">{item.senderName}</Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {item.senderContact}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{item.message}</TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={getStatusText(item.status)}
                                                            color={getStatusColor(item.status) as any}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        {format(new Date(item.createdAt), 'PPP', { locale: arSA })}
                                                    </TableCell>
                                                    <TableCell>
                                                        <PermissionGuard requiredPermissions={['managePR']}>
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
                                {(prData?.data ?? initialpublicRelationsData).map((item: any) => (
                                    <Grid item xs={12} key={item.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <MessageIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">{item.senderName}</Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    {item.message}
                                                </Typography>
                                                {item.responses?.map((response: any) => (
                                                    <Box key={response.id} sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                                                        <Typography variant="body2">{response.response}</Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {format(new Date(response.createdAt), 'PPP', { locale: arSA })}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <Grid container spacing={3}>
                                {(prData?.data ?? initialpublicRelationsData).map((item: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={item.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <EventIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">الفعاليات المرتبطة</Typography>
                                                </Box>
                                                {item.events?.map((event: any) => (
                                                    <Box key={event.id} sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle2">{event.title}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {format(new Date(event.startTime), 'PPP', { locale: arSA })}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>

                        <TabPanel value={tabValue} index={3}>
                            <Grid container spacing={3}>
                                {(prData?.data ?? initialpublicRelationsData).map((item: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={item.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <PostIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">المنشورات المرتبطة</Typography>
                                                </Box>
                                                {item.posts?.map((post: any) => (
                                                    <Box key={post.id} sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle2">{post.title}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {format(new Date(post.createdAt), 'PPP', { locale: arSA })}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
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
                        {selectedItem ? 'تعديل السجل' : 'إضافة سجل جديد'}
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="اسم المرسل"
                                        value={formData.senderName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, senderName: e.target.value })
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="معلومات الاتصال"
                                        value={formData.senderContact}
                                        onChange={(e) =>
                                            setFormData({ ...formData, senderContact: e.target.value })
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="الرسالة"
                                        multiline
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>الحالة</InputLabel>
                                        <Select
                                            value={formData.status}
                                            onChange={(e) =>
                                                setFormData({ ...formData, status: e.target.value })
                                            }
                                            required
                                            label="الحالة"
                                        >
                                            <MenuItem value="PENDING">قيد الانتظار</MenuItem>
                                            <MenuItem value="IN_PROGRESS">قيد التنفيذ</MenuItem>
                                            <MenuItem value="RESOLVED">تم الحل</MenuItem>
                                            <MenuItem value="CLOSED">مغلق</MenuItem>
                                        </Select>
                                    </FormControl>
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