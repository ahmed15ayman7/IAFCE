'use client';

import { useState } from 'react';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    IconButton,
    Chip,
    Grid,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, AttachMoney, Schedule, Warning } from '@mui/icons-material';
import { useInstallments } from '@/hooks/useInstallments';
import { Branch, Installment, InstallmentStatus, User, UserRole } from '@shared/prisma';
import { StatisticsCard } from '@/components/StatisticsCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
let initInstallments: (Installment & { user: User, branch: Branch })[] = [
    {
        id: '1',
        user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            age: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: UserRole.STUDENT,
            isOnline: true,
            isVerified: true,
            password: '123456',
            subRole: '1',
            avatar: 'https://via.placeholder.com/150',
            academyId: '1',
        },
        amount: 100,
        dueDate: new Date('2025-01-01'),
        status: InstallmentStatus.OVERDUE,
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA'
        },
        userId: '1',
        paymentId: '1',
        branchId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            age: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: UserRole.STUDENT,
            isOnline: true,
            isVerified: true,
            password: '123456',
            subRole: '1',
            avatar: 'https://via.placeholder.com/150',
            academyId: '1',
        },
        amount: 100,
        dueDate: new Date('2025-01-01'),
        status: InstallmentStatus.OVERDUE,
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA'
        },
        userId: '1',
        paymentId: '1',
        branchId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            age: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: UserRole.STUDENT,
            isOnline: true,
            isVerified: true,
            password: '123456',
            subRole: '1',
            avatar: 'https://via.placeholder.com/150',
            academyId: '1',
        },
        amount: 100,
        dueDate: new Date('2025-01-01'),
        status: InstallmentStatus.PAID,
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA'
        },
        userId: '1',
        paymentId: '1',
        branchId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            age: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: UserRole.STUDENT,
            isOnline: true,
            isVerified: true,
            password: '123456',
            subRole: '1',
            avatar: 'https://via.placeholder.com/150',
            academyId: '1',
        },
        amount: 100,
        dueDate: new Date('2025-01-01'),
        status: InstallmentStatus.PENDING,
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA'
        },
        userId: '1',
        paymentId: '1',
        branchId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        user: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            age: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: UserRole.STUDENT,
            isOnline: true,
            isVerified: true,
            password: '123456',
            subRole: '1',
            avatar: 'https://via.placeholder.com/150',
            academyId: '1',
        },
        amount: 100,
        dueDate: new Date('2025-01-01'),
        status: InstallmentStatus.OVERDUE,
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA'
        },
        userId: '1',
        paymentId: '1',
        branchId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]
let initoverdueStats: { installments: (Installment & { user: User })[] } = {
    installments: initInstallments.filter((installment) => installment.status === InstallmentStatus.OVERDUE)
}
export default function InstallmentsPage() {
    const [open, setOpen] = useState(false);
    const [selectedInstallment, setSelectedInstallment] = useState<any>(null);
    const { installments, statistics, statusStats, overdueStats, createInstallment, updateInstallmentStatus, deleteInstallment, loading } = useInstallments();

    const handleOpen = (installment?: any) => {
        setSelectedInstallment(installment || {});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedInstallment(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedInstallment.id) {
            await updateInstallmentStatus(selectedInstallment.id, selectedInstallment.status);
        } else {
            await createInstallment(selectedInstallment);
        }
        handleClose();
    };

    const getStatusColor = (status: InstallmentStatus) => {
        switch (status) {
            case InstallmentStatus.PAID:
                return 'success';
            case InstallmentStatus.OVERDUE:
                return 'error';
            case InstallmentStatus.PENDING:
                return 'warning';
            case InstallmentStatus.CANCELLED:
                return 'default';
            default:
                return 'default';
        }
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">الأقساط</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>
                    إضافة قسط جديد
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="إجمالي الأقساط"
                        value={statistics?.totalInstallments || 0}
                        icon={<Schedule sx={{ color: '#1976d2' }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="إجمالي المبلغ"
                        value={statistics?.totalAmount || 0}
                        icon={<AttachMoney sx={{ color: '#2e7d32' }} />}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="الأقساط المعلقة"
                        value={statistics?.pendingInstallments || 0}
                        icon={<Schedule sx={{ color: '#ed6c02' }} />}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="مبلغ الأقساط المعلقة"
                        value={statistics?.pendingAmount || 0}
                        icon={<Warning sx={{ color: '#d32f2f' }} />}
                        color="#d32f2f"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                حالة الأقساط
                            </Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusStats}
                                            dataKey="count"
                                            nameKey="status"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {statusStats?.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                الأقساط المتأخرة
                            </Typography>
                            <Box sx={{ height: 300, overflow: 'auto' }}>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>المستخدم</TableCell>
                                                <TableCell>المبلغ</TableCell>
                                                <TableCell>تاريخ الاستحقاق</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(overdueStats?.installments ?? initoverdueStats.installments)?.map((installment: Installment & { user: User }) => (
                                                <TableRow key={installment.id}>
                                                    <TableCell>{installment.user.firstName} {installment.user.lastName}</TableCell>
                                                    <TableCell>{installment.amount}</TableCell>
                                                    <TableCell>{new Date(installment.dueDate).toLocaleDateString('ar-SA')}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>المستخدم</TableCell>
                                <TableCell>المبلغ</TableCell>
                                <TableCell>تاريخ الاستحقاق</TableCell>
                                <TableCell>الحالة</TableCell>
                                <TableCell>الفرع</TableCell>
                                <TableCell>الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(installments ?? initInstallments)?.map((installment) => (
                                <TableRow key={installment.id}>
                                    <TableCell>{installment.user?.firstName} {installment.user?.lastName}</TableCell>
                                    <TableCell>{installment.amount}</TableCell>
                                    <TableCell>{new Date(installment.dueDate).toLocaleDateString('ar-SA')}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={installment.status}
                                            color={getStatusColor(installment.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{installment.branch?.name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(installment)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteInstallment(installment.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {selectedInstallment?.id ? 'تعديل حالة القسط' : 'إضافة قسط جديد'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        {selectedInstallment?.id ? (
                            <TextField
                                fullWidth
                                select
                                label="الحالة"
                                value={selectedInstallment?.status || ''}
                                onChange={(e) => setSelectedInstallment({ ...selectedInstallment, status: e.target.value })}
                                sx={{ mb: 2 }}
                            >
                                {Object.values(InstallmentStatus).map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <>
                                <TextField
                                    fullWidth
                                    label="المبلغ"
                                    type="number"
                                    value={selectedInstallment?.amount || ''}
                                    onChange={(e) => setSelectedInstallment({ ...selectedInstallment, amount: parseFloat(e.target.value) })}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="تاريخ الاستحقاق"
                                    type="date"
                                    value={selectedInstallment?.dueDate || ''}
                                    onChange={(e) => setSelectedInstallment({ ...selectedInstallment, dueDate: e.target.value })}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ mb: 2 }}
                                />
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>إلغاء</Button>
                        <Button type="submit" variant="contained">
                            {selectedInstallment?.id ? 'تحديث' : 'إضافة'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
} 