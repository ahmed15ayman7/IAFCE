import { useState, useEffect } from 'react';
import { installmentsApi } from '@/lib/api';
import { Branch, Installment, InstallmentStatus, Payment, User } from "@shared/prisma"

export const useInstallments = () => {
    const [installments, setInstallments] = useState<(Installment & { user: User, branch: Branch, payment: Payment })[]>([]);
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState<any>(null);
    const [statusStats, setStatusStats] = useState<any[]>([]);
    const [overdueStats, setOverdueStats] = useState<any>(null);

    const fetchInstallments = async ({ skip, take, where, orderBy }: { skip: number, take: number, where: any, orderBy: any }) => {
        try {
            const response = await installmentsApi.getAll(skip, take, where, orderBy);
            setInstallments(response.data);
        } catch (error) {
            console.error('Error fetching installments:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async (branchId?: string) => {
        try {
            const [statsRes, statusRes, overdueRes] = await Promise.all([
                installmentsApi.getStatistics(branchId),
                installmentsApi.getStatusStatistics(branchId),
                installmentsApi.getOverdueStatistics(branchId),
            ]);
            setStatistics(statsRes.data);
            setStatusStats(statusRes.data);
            setOverdueStats(overdueRes.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const createInstallment = async (installmentData: Omit<Installment, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await installmentsApi.create(installmentData);
            setInstallments([...installments, response.data]);
            await fetchStatistics();
            return response.data;
        } catch (error) {
            console.error('Error creating installment:', error);
            throw error;
        }
    };

    const updateInstallmentStatus = async (id: string, status: InstallmentStatus) => {
        try {
            const response = await installmentsApi.updateStatus(id, status);
            setInstallments(installments.map((installment: Installment) =>
                installment.id === id ? response.data : installment
            ));
            await fetchStatistics();
            return response.data;
        } catch (error) {
            console.error('Error updating installment status:', error);
            throw error;
        }
    };
    const getOverdueInstallments = async () => {
        try {
            const response = await installmentsApi.getOverdue();
            return response.data;
        } catch (error) {
            console.error('Error getting overdue installments:', error);
            throw error;
        }
    };

    const deleteInstallment = async (id: string) => {
        try {
            await installmentsApi.delete(id);
            setInstallments(installments.filter((installment: Installment) => installment.id !== id));
            await fetchStatistics();
        } catch (error) {
            console.error('Error deleting installment:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchInstallments({ skip: 0, take: 10, where: {}, orderBy: {} });
        fetchStatistics();
    }, []);

    return {
        installments,
        loading,
        statistics,
        statusStats,
        overdueStats,
        createInstallment,
        updateInstallmentStatus,
        deleteInstallment,
        getOverdueInstallments,

        fetchStatistics,
    };
}; 