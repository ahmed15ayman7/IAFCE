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
    EventNote as SecretariatIcon,
    Group as GroupIcon,
    Description as ReportIcon,
    AttachFile as FileIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { secretariatApi } from '@/lib/api';
import { PermissionGuard } from '@/components/PermissionGuard';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';

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
            id={`secretariat-tabpanel-${index}`}
            aria-labelledby={`secretariat-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

let initialmeetingsData = [
    {
        id: '1',
        meetingTitle: 'الاجتماع الاول',
        meetingDate: new Date(),
        location: 'الموقع',
        notes: 'الملاحظات',
        participants: [
            {
                id: '1',
                name: 'محمد حسين',
                isAttended: true,
                user: {
                    id: '1',
                    firstName: 'محمد',
                    lastName: 'حسين',
                },
            },
        ],
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
        meetingTitle: 'الاجتماع الاول',
        meetingDate: new Date(),
        location: 'الموقع',
        notes: 'الملاحظات',
        participants: [
            {
                id: '1',
                name: 'محمد حسين',
                isAttended: true,
                user: {
                    id: '1',
                    firstName: 'محمد',
                    lastName: 'حسين',
                },
            },
        ],
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
        meetingTitle: 'الاجتماع الاول',
        meetingDate: new Date(),
        location: 'الموقع',
        notes: 'الملاحظات',
        participants: [
            {
                id: '1',
                name: 'محمد حسين',
                isAttended: true,
                user: {
                    id: '1',
                    firstName: 'محمد',
                    lastName: 'حسين',
                },
            },
        ],
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
        meetingTitle: 'الاجتماع الاول',
        meetingDate: new Date(),
        location: 'الموقع',
        notes: 'الملاحظات',
        participants: [
            {
                id: '1',
                name: 'محمد حسين',
                isAttended: true,
                user: {
                    id: '1',
                    firstName: 'محمد',
                    lastName: 'حسين',
                },
            },
        ],
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

export default function SecretariatPage() {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [tabValue, setTabValue] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [formData, setFormData] = useState({
        meetingTitle: '',
        meetingDate: '',
        location: '',
        notes: '',
        participants: [] as string[],
    });

    const queryClient = useQueryClient();

    const { data: meetingsData } = useQuery({
        queryKey: ['meetings'],
        queryFn: () => secretariatApi.getAll('academy-id'),
    });

    const addMutation = useMutation({
        mutationFn: (data: any) => secretariatApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            setOpen(false);
            setSnackbar({ open: true, message: 'تم إضافة الاجتماع بنجاح', severity: 'success' });
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: any) => secretariatApi.update(selectedItem?.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            setOpen(false);
            setSnackbar({ open: true, message: 'تم تحديث الاجتماع بنجاح', severity: 'success' });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => secretariatApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['meetings'] });
            setSnackbar({ open: true, message: 'تم حذف الاجتماع بنجاح', severity: 'success' });
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
            meetingTitle: item.meetingTitle,
            meetingDate: item.meetingDate,
            location: item.location,
            notes: item.notes || '',
            participants: item.participants?.map((p: any) => p.userId) || [],
        });
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الاجتماع؟')) {
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
                                <SecretariatIcon color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h4" component="h1">
                                    السكرتارية
                                </Typography>
                            </Box>
                            <PermissionGuard requiredPermissions={['manageSecretary']}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        setSelectedItem(null);
                                        setFormData({
                                            meetingTitle: '',
                                            meetingDate: '',
                                            location: '',
                                            notes: '',
                                            participants: [],
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
                                    إضافة اجتماع جديد
                                </Button>
                            </PermissionGuard>
                        </Box>

                        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tab label="الاجتماعات" />
                            <Tab label="المشاركون" />
                            <Tab label="التقارير" />
                            <Tab label="الملفات" />
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <TableContainer component={Paper} elevation={3}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>عنوان الاجتماع</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>التاريخ</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الموقع</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>عدد المشاركين</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>الإجراءات</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <AnimatePresence>
                                            {(meetingsData?.data ?? initialmeetingsData).map((item: any) => (
                                                <motion.tr
                                                    key={item.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <TableCell>{item.meetingTitle}</TableCell>
                                                    <TableCell>
                                                        {format(new Date(item.meetingDate), 'PPP', { locale: arSA })}
                                                    </TableCell>
                                                    <TableCell>{item.location}</TableCell>
                                                    <TableCell>
                                                        <Badge badgeContent={item.participants?.length || 0} color="primary">
                                                            <GroupIcon />
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <PermissionGuard requiredPermissions={['manageSecretary']}>
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
                                {(meetingsData?.data ?? initialmeetingsData).map((meeting: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={meeting.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <GroupIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">{meeting.meetingTitle}</Typography>
                                                </Box>
                                                {meeting.participants?.map((participant: any) => (
                                                    <Box key={participant.id} sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle2">
                                                            {participant.user?.firstName} {participant.user?.lastName}
                                                        </Typography>
                                                        <Chip
                                                            label={participant.isAttended ? 'حضر' : 'لم يحضر'}
                                                            color={participant.isAttended ? 'success' : 'error'}
                                                            size="small"
                                                            sx={{ mt: 1 }}
                                                        />
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
                                {(meetingsData?.data ?? initialmeetingsData).map((meeting: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={meeting.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <ReportIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">تقرير الاجتماع</Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                    {meeting.notes}
                                                </Typography>
                                                {meeting.reports?.map((report: any) => (
                                                    <Box key={report.id} sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle2">{report.title}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {format(new Date(report.createdAt), 'PPP', { locale: arSA })}
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
                                {(meetingsData?.data ?? initialmeetingsData).map((meeting: any) => (
                                    <Grid item xs={12} md={6} lg={4} key={meeting.id}>
                                        <Card elevation={2}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <FileIcon color="primary" sx={{ mr: 1 }} />
                                                    <Typography variant="h6">ملفات الاجتماع</Typography>
                                                </Box>
                                                {meeting.files?.map((file: any) => (
                                                    <Box key={file.id} sx={{ mt: 2 }}>
                                                        <Typography variant="subtitle2">{file.name}</Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {format(new Date(file.createdAt), 'PPP', { locale: arSA })}
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
                        {selectedItem ? 'تعديل الاجتماع' : 'إضافة اجتماع جديد'}
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="عنوان الاجتماع"
                                        value={formData.meetingTitle}
                                        onChange={(e) =>
                                            setFormData({ ...formData, meetingTitle: e.target.value })
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="تاريخ الاجتماع"
                                        type="datetime-local"
                                        value={formData.meetingDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, meetingDate: e.target.value })
                                        }
                                        required
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="الموقع"
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData({ ...formData, location: e.target.value })
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="ملاحظات"
                                        multiline
                                        rows={4}
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({ ...formData, notes: e.target.value })
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>المشاركون</InputLabel>
                                        <Select
                                            multiple
                                            value={formData.participants}
                                            onChange={(e) =>
                                                setFormData({ ...formData, participants: e.target.value as string[] })
                                            }
                                            label="المشاركون"
                                        >
                                            <MenuItem value="user1">المستخدم 1</MenuItem>
                                            <MenuItem value="user2">المستخدم 2</MenuItem>
                                            <MenuItem value="user3">المستخدم 3</MenuItem>
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