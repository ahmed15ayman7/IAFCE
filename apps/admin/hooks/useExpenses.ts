import { useState, useEffect } from 'react';
import { expenseApi } from '@/lib/api';
import { Branch, User, Expense, ExpenseType } from '@shared/prisma';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<(Expense & { user: User, branch: Branch })[]>([]);
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState<any>(null);
    const [typeStats, setTypeStats] = useState<any[]>([]);
    const [monthlyStats, setMonthlyStats] = useState<any[]>([]);

    const fetchExpenses = async ({ skip, take, where, orderBy }: { skip: number, take: number, where: any, orderBy: any }) => {
        try {
            const response = await expenseApi.getAll(skip, take, where, orderBy);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async (branchId?: string) => {
        try {
            const [statsRes, typeRes, monthlyRes] = await Promise.all([
                expenseApi.getStatistics(branchId),
                expenseApi.getTypeStatistics(branchId),
                expenseApi.getMonthlyStatistics(branchId),
            ]);
            setStatistics(statsRes.data);
            setTypeStats(typeRes.data);
            setMonthlyStats(monthlyRes.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const createExpense = async (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await expenseApi.create(expenseData);
            setExpenses([...expenses, response.data]);
            await fetchStatistics();
            return response.data;
        } catch (error) {
            console.error('Error creating expense:', error);
            throw error;
        }
    };

    const updateExpense = async (id: string, expenseData: Partial<Expense>) => {
        try {
            const response = await expenseApi.update(id, expenseData);
            setExpenses(expenses.map((expense: Expense) =>
                expense.id === id ? response.data : expense
            ));
            await fetchStatistics();
            return response.data;
        } catch (error) {
            console.error('Error updating expense:', error);
            throw error;
        }
    };

    const deleteExpense = async (id: string) => {
        try {
            await expenseApi.delete(id);
            setExpenses(expenses.filter((expense: Expense) => expense.id !== id));
            await fetchStatistics();
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchExpenses({ skip: 0, take: 10, where: {}, orderBy: {} });
        fetchStatistics();
    }, []);

    return {
        expenses,
        loading,
        statistics,
        typeStats,
        monthlyStats,
        createExpense,
        updateExpense,
        deleteExpense,
        fetchStatistics,
    };
}; 