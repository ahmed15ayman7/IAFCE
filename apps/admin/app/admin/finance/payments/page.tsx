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
    Grid,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, AttachMoney, Payment, TrendingUp } from '@mui/icons-material';
import { usePayments } from '@/hooks/usePayments';
import { Branch, Payment as PaymentType, PaymentMethod, User, UserRole } from '@shared/prisma';
import { StatisticsCard } from '@/components/StatisticsCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
let initialPayments: (PaymentType & { user: User, branch: Branch })[] = [
    {
        id: '1',
        amount: 50,
        method: PaymentMethod.CASH,
        paidAt: new Date(),
        branchId: 'jjj',
        userId: 'njj',
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA',
        },
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
        legalCaseId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        amount: 450,
        method: PaymentMethod.CASH,
        paidAt: new Date(),
        branchId: 'jjj',
        userId: 'njj',
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA',
        },
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
        legalCaseId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        amount: 560,
        method: PaymentMethod.CASH,
        paidAt: new Date(),
        branchId: 'jjj',
        userId: 'njj',
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA',
        },
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
        legalCaseId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        amount: 250,
        method: PaymentMethod.CASH,
        paidAt: new Date(),
        branchId: 'jjj',
        userId: 'njj',
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'branch1@example.com',
            phone: '1234567890',
            address: '123 Main St, Anytown, USA',
        },
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
        legalCaseId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },

]
let initDailyStats: { payments: (PaymentType & { user: User, branch: Branch })[] } = {
    payments: initialPayments
}
let initStatistics: { totalPayments: number, totalAmount: number, todayPayments: number, yesterdayPayments: number, todayAmount: number, yesterdayAmount: number } = {
    totalPayments: 0,
    totalAmount: 0,
    todayPayments: 0,
    yesterdayPayments: 0,
    todayAmount: 0,
    yesterdayAmount: 0
}
export default function PaymentsPage() {
    const [open, setOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<any>(null);
    const { payments, dailyStats, statistics, createPayment, updatePayment, deletePayment, loading } = usePayments();


    const handleOpen = (payment?: any) => {
        setSelectedPayment(payment || {});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPayment(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPayment.id) {
            await updatePayment(selectedPayment.id, selectedPayment);
        } else {
            await createPayment(selectedPayment);
        }
        handleClose();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">المدفوعات</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>
                    إضافة دفعة جديدة
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="إجمالي المدفوعات"
                        value={statistics?.totalPayments || initStatistics.totalPayments}
                        icon={<Payment sx={{ color: '#1976d2' }} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="إجمالي المبلغ"
                        value={statistics?.totalAmount || initStatistics.totalAmount}
                        icon={<AttachMoney sx={{ color: '#2e7d32' }} />}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="مدفوعات اليوم"
                        value={statistics?.todayPayments || initStatistics.todayPayments}
                        previousValue={statistics?.yesterdayPayments || initStatistics.yesterdayPayments}
                        icon={<TrendingUp sx={{ color: '#ed6c02' }} />}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="مبلغ اليوم"
                        value={statistics?.todayAmount || initStatistics.todayAmount}
                        previousValue={statistics?.yesterdayAmount || initStatistics.yesterdayAmount}
                        icon={<AttachMoney sx={{ color: '#9c27b0' }} />}
                        color="#9c27b0"
                    />
                </Grid>
            </Grid>

            <Card sx={{ mb: 4 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        إحصائيات المدفوعات الأسبوعية
                    </Typography>
                    <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyStats ?? initDailyStats.payments}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(date) => new Date(date).toLocaleDateString('ar-SA')}
                                />
                                <YAxis />
                                <Tooltip
                                    labelFormatter={(date) => new Date(date).toLocaleDateString('ar-SA')}
                                    formatter={(value) => [value.toLocaleString('ar-SA'), 'المبلغ']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#1976d2"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Box>
            </Card>

            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>المستخدم</TableCell>
                                <TableCell>المبلغ</TableCell>
                                <TableCell>طريقة الدفع</TableCell>
                                <TableCell>تاريخ الدفع</TableCell>
                                <TableCell>الفرع</TableCell>
                                <TableCell>الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(payments ?? initialPayments)?.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{payment.user?.firstName} {payment.user?.lastName}</TableCell>
                                    <TableCell>{payment.amount}</TableCell>
                                    <TableCell>{payment.method}</TableCell>
                                    <TableCell>{new Date(payment.paidAt).toLocaleDateString('ar-SA')}</TableCell>
                                    <TableCell>{payment.branch?.name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(payment)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deletePayment(payment.id)}>
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
                    {selectedPayment?.id ? 'تعديل دفعة' : 'إضافة دفعة جديدة'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="المبلغ"
                            type="number"
                            value={selectedPayment?.amount || ''}
                            onChange={(e) => setSelectedPayment({ ...selectedPayment, amount: parseFloat(e.target.value) })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            select
                            label="طريقة الدفع"
                            value={selectedPayment?.method || ''}
                            onChange={(e) => setSelectedPayment({ ...selectedPayment, method: e.target.value })}
                            sx={{ mb: 2 }}
                        >
                            {Object.values(PaymentMethod).map((method) => (
                                <MenuItem key={method} value={method}>
                                    {method}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>إلغاء</Button>
                        <Button type="submit" variant="contained">
                            {selectedPayment?.id ? 'تحديث' : 'إضافة'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
} 