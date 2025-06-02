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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Assignment as TaskIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { administrationApi } from '@/lib/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

let initialadministrationData = [
    {
        id: '1',
        title: 'اجتماع المديرية',
        description: 'اجتماع المديرية',
        type: 'MEETING',
        priority: 'HIGH',
        assignedTo: 'محمد حسين',
        dueDate: '2025-01-01',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        academyId: '1',
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
        title: 'اجتماع المديرية',
        description: 'اجتماع المديرية',
        type: 'MEETING',
        priority: 'HIGH',
        assignedTo: 'محمد حسين',
        dueDate: '2025-01-01',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        academyId: '1',
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
        title: 'اجتماع المديرية',
        description: 'اجتماع المديرية',
        type: 'MEETING',
        priority: 'HIGH',
        assignedTo: 'محمد حسين',
        dueDate: '2025-01-01',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        academyId: '1',
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
        title: 'اجتماع المديرية',
        description: 'اجتماع المديرية',
        type: 'MEETING',
        priority: 'HIGH',
        assignedTo: 'محمد حسين',
        dueDate: '2025-01-01',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        academyId: '1',
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
        title: 'اجتماع المديرية',
        description: 'اجتماع المديرية',
        type: 'MEETING',
        priority: 'HIGH',
        assignedTo: 'محمد حسين',
        dueDate: '2025-01-01',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        academyId: '1',
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
        id: '6',
        title: 'اجتماع المديرية',
        description: 'اجتماع المديرية',
        type: 'MEETING',
        priority: 'HIGH',
        assignedTo: 'محمد حسين',
        dueDate: '2025-01-01',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdByAdminId: '1',
        updatedByAdminId: '1',
        academyId: '1',
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

export default function AdministrationPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [tabValue, setTabValue] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        priority: '',
        assignedTo: '',
        dueDate: '',
        status: 'PENDING',
    });
    const queryClient = useQueryClient();

    const { data: administrationData } = useQuery({
        queryKey: ['administration'],
        queryFn: () => administrationApi.getAll('academy-id'),
    });

    const addTaskMutation = useMutation({
        mutationFn: (data: any) => administrationApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['administration'] });
            setOpen(false);
            setFormData({
                title: '',
                description: '',
                type: '',
                priority: '',
                assignedTo: '',
                dueDate: '',
                status: 'PENDING',
            });
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: (data: any) => administrationApi.update(selectedItem?.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['administration'] });
            setOpen(false);
            setSelectedItem(null);
            setFormData({
                title: '',
                description: '',
                type: '',
                priority: '',
                assignedTo: '',
                dueDate: '',
                status: 'PENDING',
            });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id: string) => administrationApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['administration'] });
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
            priority: item.priority,
            assignedTo: item.assignedTo,
            dueDate: item.dueDate,
            status: item.status,
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            deleteTaskMutation.mutate(id);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
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
                return 'مكتمل';
            case 'IN_PROGRESS':
                return 'قيد التنفيذ';
            case 'PENDING':
                return 'قيد الانتظار';
            case 'CANCELLED':
                return 'ملغي';
            default:
                return status;
        }
    };

    const getTypeText = (type: string) => {
        switch (type) {
            case 'MEETING':
                return 'اجتماع';
            case 'REPORT':
                return 'تقرير';
            case 'DOCUMENT':
                return 'مستند';
            case 'OTHER':
                return 'أخرى';
            default:
                return type;
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

    const filteredItems = (administrationData?.data ?? initialadministrationData).filter((item: any) => {
        switch (tabValue) {
            case 0:
                return item.status === 'PENDING';
            case 1:
                return item.status === 'IN_PROGRESS';
            case 2:
                return item.status === 'COMPLETED';
            case 3:
                return item.status === 'CANCELLED';
            default:
                return true;
        }
    });

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5">الشؤون الإدارية</Typography>
                <PermissionGuard requiredPermissions={['manageAdministration']}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setSelectedItem(null);
                            setFormData({
                                title: '',
                                description: '',
                                type: '',
                                priority: '',
                                assignedTo: '',
                                dueDate: '',
                                status: 'PENDING',
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

            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>العنوان</TableCell>
                            <TableCell>النوع</TableCell>
                            <TableCell>الأولوية</TableCell>
                            <TableCell>تعيين إلى</TableCell>
                            <TableCell>تاريخ الاستحقاق</TableCell>
                            <TableCell>الحالة</TableCell>
                            <TableCell>الإجراءات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems?.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={getTypeText(item.type)}
                                        color="primary"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getPriorityText(item.priority)}
                                        color={getPriorityColor(item.priority) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{item.assignedTo}</TableCell>
                                <TableCell>
                                    {format(new Date(item.dueDate), 'PPP', { locale: arSA })}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusText(item.status)}
                                        color={getStatusColor(item.status) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <PermissionGuard requiredPermissions={['manageAdministration']}>
                                        <IconButton size="small" onClick={() => handleEdit(item)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDelete(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </PermissionGuard>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
                                    select
                                    fullWidth
                                    label="النوع"
                                    value={formData.type}
                                    onChange={(e) =>
                                        setFormData({ ...formData, type: e.target.value })
                                    }
                                    required
                                >
                                    <option value="MEETING">اجتماع</option>
                                    <option value="REPORT">تقرير</option>
                                    <option value="DOCUMENT">مستند</option>
                                    <option value="OTHER">أخرى</option>
                                </TextField>
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
                                    label="تعيين إلى"
                                    value={formData.assignedTo}
                                    onChange={(e) =>
                                        setFormData({ ...formData, assignedTo: e.target.value })
                                    }
                                    required
                                />
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
                                    <option value="PENDING">قيد الانتظار</option>
                                    <option value="IN_PROGRESS">قيد التنفيذ</option>
                                    <option value="COMPLETED">مكتمل</option>
                                    <option value="CANCELLED">ملغي</option>
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