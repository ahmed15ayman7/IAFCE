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
    Tabs,
    Tab,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Check as CheckIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { secretaryApi } from '@/lib/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

const MotionCard = motion(Card);

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
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export default function SecretaryPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [tabValue, setTabValue] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        status: 'PENDING',
        priority: 'MEDIUM',
        dueDate: '',
    });
    const queryClient = useQueryClient();

    const { data: tasksData } = useQuery({
        queryKey: ['secretary', 'tasks'],
        queryFn: () => secretaryApi.getAllTasks('academy-id'),
    });

    const addTaskMutation = useMutation({
        mutationFn: (data: any) => secretaryApi.createTask(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['secretary', 'tasks'] });
            setOpen(false);
            setFormData({
                title: '',
                description: '',
                type: '',
                status: 'PENDING',
                priority: 'MEDIUM',
                dueDate: '',
            });
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: (data: any) => secretaryApi.updateTask(selectedItem?.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['secretary', 'tasks'] });
            setOpen(false);
            setSelectedItem(null);
            setFormData({
                title: '',
                description: '',
                type: '',
                status: 'PENDING',
                priority: 'MEDIUM',
                dueDate: '',
            });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id: string) => secretaryApi.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['secretary', 'tasks'] });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItem) {
            updateTaskMutation.mutate({
                ...formData,
                academyId: 'academy-id',
                updatedByAdminId: 'admin-id',
            });
        } else {
            addTaskMutation.mutate({
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
            description: item.description,
            type: item.type,
            status: item.status,
            priority: item.priority,
            dueDate: item.dueDate,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
            deleteTaskMutation.mutate(id);
        }
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        updateTaskMutation.mutate({
            id,
            status: newStatus,
            updatedByAdminId: 'admin-id',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'success';
            case 'IN_PROGRESS':
                return 'info';
            case 'PENDING':
                return 'warning';
            case 'CANCELLED':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'مكتملة';
            case 'IN_PROGRESS':
                return 'قيد التنفيذ';
            case 'PENDING':
                return 'قيد الانتظار';
            case 'CANCELLED':
                return 'ملغاة';
            default:
                return status;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH':
                return 'error';
            case 'MEDIUM':
                return 'warning';
            case 'LOW':
                return 'success';
            default:
                return 'default';
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'HIGH':
                return 'عالية';
            case 'MEDIUM':
                return 'متوسطة';
            case 'LOW':
                return 'منخفضة';
            default:
                return priority;
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const filteredTasks = tasksData?.data?.filter((task: any) => {
        switch (tabValue) {
            case 0:
                return task.status === 'PENDING';
            case 1:
                return task.status === 'IN_PROGRESS';
            case 2:
                return task.status === 'COMPLETED';
            case 3:
                return task.status === 'CANCELLED';
            default:
                return true;
        }
    });

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">السكرتارية</Typography>
                <PermissionGuard requiredPermissions={['manageSecretary']}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedItem(null);
                            setFormData({
                                title: '',
                                description: '',
                                type: '',
                                status: 'PENDING',
                                priority: 'MEDIUM',
                                dueDate: '',
                            });
                            setOpen(true);
                        }}
                    >
                        إضافة مهمة جديدة
                    </Button>
                </PermissionGuard>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="قيد الانتظار" />
                    <Tab label="قيد التنفيذ" />
                    <Tab label="مكتملة" />
                    <Tab label="ملغاة" />
                </Tabs>
            </Box>

            <Grid container spacing={3}>
                {filteredTasks?.map((task: any) => (
                    <Grid item xs={12} md={6} lg={4} key={task.id}>
                        <MotionCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6">{task.title}</Typography>
                                    <Box>
                                        <Chip
                                            label={getPriorityText(task.priority)}
                                            color={getPriorityColor(task.priority) as any}
                                            size="small"
                                            sx={{ mr: 1 }}
                                        />
                                        <Chip
                                            label={getStatusText(task.status)}
                                            color={getStatusColor(task.status) as any}
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {task.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="caption" color="text.secondary">
                                        تاريخ الاستحقاق: {format(new Date(task.dueDate), 'PPP', { locale: arSA })}
                                    </Typography>
                                    <Box>
                                        <PermissionGuard requiredPermissions={['manageSecretary']}>
                                            {task.status === 'PENDING' && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleStatusChange(task.id, 'IN_PROGRESS')}
                                                    color="info"
                                                >
                                                    <CheckIcon />
                                                </IconButton>
                                            )}
                                            {task.status === 'IN_PROGRESS' && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleStatusChange(task.id, 'COMPLETED')}
                                                    color="success"
                                                >
                                                    <CheckIcon />
                                                </IconButton>
                                            )}
                                            {task.status !== 'COMPLETED' && task.status !== 'CANCELLED' && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleStatusChange(task.id, 'CANCELLED')}
                                                    color="error"
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            )}
                                            <IconButton size="small" onClick={() => handleEdit(task)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleDelete(task.id)}>
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
                    {selectedItem ? 'تعديل المهمة' : 'إضافة مهمة جديدة'}
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
                                    label="النوع"
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({ ...formData, type: e.target.value })
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="الأولوية"
                                    value={formData.priority}
                                    onChange={(e) =>
                                        setFormData({ ...formData, priority: e.target.value })
                                    }
                                    required
                                >
                                    <option value="HIGH">عالية</option>
                                    <option value="MEDIUM">متوسطة</option>
                                    <option value="LOW">منخفضة</option>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="تاريخ الاستحقاق"
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) =>
                                        setFormData({ ...formData, dueDate: e.target.value })
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                                    <option value="PENDING">قيد الانتظار</option>
                                    <option value="IN_PROGRESS">قيد التنفيذ</option>
                                    <option value="COMPLETED">مكتملة</option>
                                    <option value="CANCELLED">ملغاة</option>
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