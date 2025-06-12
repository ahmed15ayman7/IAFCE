import { useState, useEffect } from 'react';
import { paymentApi } from '@/lib/api';
import { Branch, User, Payment, Installment } from '@shared/prisma';

export const usePayments = () => {
    const [payments, setPayments] = useState<(Payment & { user: User, branch: Branch, installment: Installment })[]>([]);
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState<any>(null);
    const [dailyStats, setDailyStats] = useState<any[]>([]);
    const [monthlyStats, setMonthlyStats] = useState<any[]>([]);

    const fetchPayments = async ({ skip, take, where, orderBy }: { skip: number, take: number, where: any, orderBy: any }) => {
        try {
            const response = await paymentApi.getAll(skip, take, where, orderBy);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        };
    };

    const fetchStatistics = async (branchId?: string) => {
        try {
            const [statsRes, dailyRes, monthlyRes] = await Promise.all([
                paymentApi.getStatistics(branchId),
                paymentApi.getDailyStatistics(branchId),
                paymentApi.getMonthlyStatistics(branchId),
            ]);
            setStatistics(statsRes.data);
            setDailyStats(dailyRes.data);
            setMonthlyStats(monthlyRes.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const createPayment = async (paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await paymentApi.create(paymentData);
            setPayments([...payments, response.data]);
            await fetchStatistics();
            return response.data;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
        }
    };

    const updatePayment = async (id: string, paymentData: Partial<Payment>) => {
        try {
            const response = await paymentApi.update(id, paymentData);
            setPayments(payments.map((payment: Payment) =>
                payment.id === id ? response.data : payment
            ));
            await fetchStatistics();
            return response.data;
        } catch (error) {
            console.error('Error updating payment:', error);
            throw error;
        }
    };

    const deletePayment = async (id: string) => {
        try {
            await paymentApi.delete(id);
            setPayments(payments.filter((payment: Payment) => payment.id !== id));
            await fetchStatistics();
        } catch (error) {
            console.error('Error deleting payment:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchPayments({ skip: 0, take: 10, where: {}, orderBy: {} });
        fetchStatistics();
    }, []);

    return {
        payments,
        loading,
        statistics,
        dailyStats,
        monthlyStats,
        createPayment,
        updatePayment,
        deletePayment,
        fetchStatistics,
    };
}; 