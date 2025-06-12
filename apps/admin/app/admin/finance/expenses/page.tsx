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
import { Edit as EditIcon, Delete as DeleteIcon, AttachMoney, Receipt, TrendingUp } from '@mui/icons-material';
import { useExpenses } from '@/hooks/useExpenses';
import { Branch, Expense, ExpenseType } from '@shared/prisma';
import { StatisticsCard } from '@/components/StatisticsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
let initExpenses: (Expense & { branch: Branch })[] = [
    {
        id: '1',
        type: ExpenseType.OTHER,
        amount: 100,
        description: 'Test',
        paidAt: new Date(),
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            address: '123 Main St, Anytown, USA',
            phone: '1234567890',
            email: 'branch1@example.com',
        },
        branchId: '1',
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        id: '1',
        type: ExpenseType.OTHER,
        amount: 100,
        description: 'Test',
        paidAt: new Date(),
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            address: '123 Main St, Anytown, USA',
            phone: '1234567890',
            email: 'branch1@example.com',
        },
        branchId: '1',
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        type: ExpenseType.OTHER,
        amount: 100,
        description: 'Test',
        paidAt: new Date(),
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            address: '123 Main St, Anytown, USA',
            phone: '1234567890',
            email: 'branch1@example.com',
        },
        branchId: '1',
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '1',
        type: ExpenseType.OTHER,
        amount: 100,
        description: 'Test',
        paidAt: new Date(),
        branch: {
            id: '1',
            name: 'Branch 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            address: '123 Main St, Anytown, USA',
            phone: '1234567890',
            email: 'branch1@example.com',
        },
        branchId: '1',
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
    },

]
let inittypeStats: { expenses: (Expense & { branch: Branch })[] } = {
    expenses: initExpenses
}
let initmonthlyStats: { expenses: (Expense & { branch: Branch })[] } = {
    expenses: initExpenses
}
let initStatistics: { totalExpenses: number, totalAmount: number, todayExpenses: number, yesterdayExpenses: number, todayAmount: number, yesterdayAmount: number } = {
    totalExpenses: 0,
    totalAmount: 0,
    todayExpenses: 0,
    yesterdayExpenses: 0,
    todayAmount: 0,
    yesterdayAmount: 0
}
export default function ExpensesPage() {
    const [open, setOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<any>(null);
    const { expenses, statistics, typeStats, monthlyStats, createExpense, updateExpense, deleteExpense, loading } = useExpenses();

    const handleOpen = (expense?: any) => {
        setSelectedExpense(expense || {});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedExpense(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedExpense.id) {
            await updateExpense(selectedExpense.id, selectedExpense);
        } else {
            await createExpense(selectedExpense);
        }
        handleClose();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">المصروفات</Typography>
                <Button variant="contained" onClick={() => handleOpen()}>
                    إضافة مصروف جديد
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatisticsCard
                        title="إجمالي المصروفات"
                        value={statistics?.totalExpenses || initStatistics.totalExpenses}
                        icon={<Receipt sx={{ color: '#1976d2' }} />}
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
                        title="مصروفات اليوم"
                        value={statistics?.todayExpenses || initStatistics.todayExpenses}
                        previousValue={statistics?.yesterdayExpenses || initStatistics.yesterdayExpenses}
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

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                المصروفات حسب النوع
                            </Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={typeStats ?? inittypeStats.expenses}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="type" />
                                        <YAxis />
                                        <Tooltip
                                            formatter={(value) => [value.toLocaleString('ar-SA'), 'المبلغ']}
                                        />
                                        <Bar dataKey="amount" fill="#1976d2" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                المصروفات الشهرية
                            </Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyStats ?? initmonthlyStats.expenses}>
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
                                        <Bar dataKey="amount" fill="#2e7d32" />
                                    </BarChart>
                                </ResponsiveContainer>
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
                                <TableCell>النوع</TableCell>
                                <TableCell>المبلغ</TableCell>
                                <TableCell>الوصف</TableCell>
                                <TableCell>تاريخ الدفع</TableCell>
                                <TableCell>الفرع</TableCell>
                                <TableCell>الإجراءات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(expenses ?? initExpenses)?.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.type}</TableCell>
                                    <TableCell>{expense.amount}</TableCell>
                                    <TableCell>{expense.description}</TableCell>
                                    <TableCell>{new Date(expense.paidAt).toLocaleDateString('ar-SA')}</TableCell>
                                    <TableCell>{expense.branch?.name}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpen(expense)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteExpense(expense.id)}>
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
                    {selectedExpense?.id ? 'تعديل مصروف' : 'إضافة مصروف جديد'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            select
                            label="نوع المصروف"
                            value={selectedExpense?.type || ''}
                            onChange={(e) => setSelectedExpense({ ...selectedExpense, type: e.target.value })}
                            sx={{ mb: 2 }}
                        >
                            {Object.values(ExpenseType).map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label="المبلغ"
                            type="number"
                            value={selectedExpense?.amount || ''}
                            onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: parseFloat(e.target.value) })}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="الوصف"
                            multiline
                            rows={3}
                            value={selectedExpense?.description || ''}
                            onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })}
                            sx={{ mb: 2 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>إلغاء</Button>
                        <Button type="submit" variant="contained">
                            {selectedExpense?.id ? 'تحديث' : 'إضافة'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
} 