import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExpenseType } from '@shared/prisma';
import { CreateExpenseDto } from 'dtos/Expense.create.dto';

@Injectable()
export class ExpensesService {
    constructor(private prisma: PrismaService) { }

    async createExpense(data: CreateExpenseDto) {
        const expense = await this.prisma.expense.create({
            data,
            include: {
                branch: true,
                createdByAdmin: true,
            },
        });

        // تحديث المالية العامة للفرع
        await this.updateBranchFinance(data.branchId);

        return expense;
    }

    async getExpenses(params: {
        skip?: number;
        take?: number;
        where?: any;
        orderBy?: any;
    }) {
        const { skip, take, where, orderBy } = params;
        return this.prisma.expense.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                branch: true,
                createdByAdmin: true,
            },
        });
    }

    async getExpenseById(id: string) {
        return this.prisma.expense.findUnique({
            where: { id },
            include: {
                branch: true,
                createdByAdmin: true,
            },
        });
    }

    async updateExpense(id: string, data: any) {
        const expense = await this.prisma.expense.update({
            where: { id },
            data,
            include: {
                branch: true,
                createdByAdmin: true,
            },
        });

        // تحديث المالية العامة للفرع
        await this.updateBranchFinance(expense.branchId);

        return expense;
    }

    async deleteExpense(id: string) {
        const expense = await this.prisma.expense.delete({
            where: { id },
        });

        // تحديث المالية العامة للفرع
        await this.updateBranchFinance(expense.branchId);

        return expense;
    }

    private async updateBranchFinance(branchId: string) {
        const expenses = await this.prisma.expense.findMany({
            where: { branchId },
        });

        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        await this.prisma.branchFinance.upsert({
            where: { branchId },
            update: {
                totalExpenses,
                balance: {
                    decrement: totalExpenses,
                },
                lastUpdated: new Date(),
            },
            create: {
                branchId,
                totalExpenses,
                balance: -totalExpenses,
            },
        });
    }

    async getStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};

        const [totalExpenses, totalAmount, todayExpenses, todayAmount] = await Promise.all([
            this.prisma.expense.count({ where }),
            this.prisma.expense.aggregate({
                where,
                _sum: { amount: true },
            }),
            this.prisma.expense.count({
                where: {
                    ...where,
                    paidAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
            }),
            this.prisma.expense.aggregate({
                where: {
                    ...where,
                    paidAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
                _sum: { amount: true },
            }),
        ]);

        return {
            totalExpenses,
            totalAmount: totalAmount._sum.amount || 0,
            todayExpenses,
            todayAmount: todayAmount._sum.amount || 0,
        };
    }

    async getTypeStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};

        const typeStats = await this.prisma.expense.groupBy({
            by: ['type'],
            where,
            _count: {
                id: true,
            },
            _sum: {
                amount: true,
            },
        });

        return typeStats.map(stat => ({
            type: stat.type,
            count: stat._count.id,
            amount: stat._sum.amount || 0,
        }));
    }

    async getMonthlyStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);

        const monthlyStats = await this.prisma.expense.groupBy({
            by: ['paidAt'],
            where: {
                ...where,
                paidAt: {
                    gte: startDate,
                },
            },
            _count: {
                id: true,
            },
            _sum: {
                amount: true,
            },
        });

        return monthlyStats.map(stat => ({
            date: stat.paidAt,
            count: stat._count.id,
            amount: stat._sum.amount || 0,
        }));
    }
} 