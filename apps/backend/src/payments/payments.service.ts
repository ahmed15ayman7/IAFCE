import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from 'dtos/Payment.create.dto';
import { UpdatePaymentDto } from 'dtos/Payment.update.dto';
import { Payment } from '@shared/prisma';
import { PaymentMethod } from '@shared/prisma';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, subMonths, subYears } from 'date-fns';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        return this.prisma.payment.create({
            data: createPaymentDto,
        });
    }

    async findAll(): Promise<Payment[]> {
        return this.prisma.payment.findMany();
    }

    async findOne(id: string): Promise<Payment> {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
        });
        if (!payment) {
            throw new NotFoundException('الدفعة غير موجودة');
        }
        return payment;
    }

    async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
        return this.prisma.payment.update({
            where: { id },
            data: updatePaymentDto,
        });
    }

    async remove(id: string): Promise<Payment> {
        return this.prisma.payment.delete({
            where: { id },
        });
    }

    async createPayment(data: {
        userId: string;
        amount: number;
        method: PaymentMethod;
        branchId: string;
        legalCaseId?: string;
    }) {
        return this.prisma.payment.create({
            data,
            include: {
                user: true,
                branch: true,
                legalCase: true,
                installments: true,
            },
        });
    }

    async getPayments(params: {
        skip?: number;
        take?: number;
        where?: any;
        orderBy?: any;
    }) {
        const { skip, take, where, orderBy } = params;
        return this.prisma.payment.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                user: true,
                branch: true,
                legalCase: true,
                installments: true,
            },
        });
    }

    async getPaymentById(id: string) {
        return this.prisma.payment.findUnique({
            where: { id },
            include: {
                user: true,
                branch: true,
                legalCase: true,
                installments: true,
            },
        });
    }

    async updatePayment(id: string, data: any) {
        return this.prisma.payment.update({
            where: { id },
            data,
            include: {
                user: true,
                branch: true,
                legalCase: true,
                installments: true,
            },
        });
    }

    async deletePayment(id: string) {
        return this.prisma.payment.delete({
            where: { id },
        });
    }

    async getStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};
        const now = new Date();

        const [totalPayments, totalAmount, todayPayments, todayAmount] = await Promise.all([
            this.prisma.payment.count({ where }),
            this.prisma.payment.aggregate({
                where,
                _sum: { amount: true },
            }),
            this.prisma.payment.count({
                where: {
                    ...where,
                    paidAt: {
                        gte: startOfDay(now),
                        lte: endOfDay(now),
                    },
                },
            }),
            this.prisma.payment.aggregate({
                where: {
                    ...where,
                    paidAt: {
                        gte: startOfDay(now),
                        lte: endOfDay(now),
                    },
                },
                _sum: { amount: true },
            }),
        ]);

        return {
            totalPayments,
            totalAmount: totalAmount._sum.amount || 0,
            todayPayments,
            todayAmount: todayAmount._sum.amount || 0,
        };
    }

    async getDailyStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};
        const now = new Date();
        const days = Array.from({ length: 7 }, (_, i) => subDays(now, i));

        const dailyStats = await Promise.all(
            days.map(async (day) => {
                const start = startOfDay(day);
                const end = endOfDay(day);

                const [count, amount] = await Promise.all([
                    this.prisma.payment.count({
                        where: {
                            ...where,
                            paidAt: { gte: start, lte: end },
                        },
                    }),
                    this.prisma.payment.aggregate({
                        where: {
                            ...where,
                            paidAt: { gte: start, lte: end },
                        },
                        _sum: { amount: true },
                    }),
                ]);

                return {
                    date: start,
                    count,
                    amount: amount._sum.amount || 0,
                };
            })
        );

        return dailyStats.reverse();
    }

    async getWeeklyStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};
        const now = new Date();
        const weeks = Array.from({ length: 4 }, (_, i) => {
            const start = startOfWeek(subDays(now, i * 7));
            const end = endOfWeek(subDays(now, i * 7));
            return { start, end };
        });

        const weeklyStats = await Promise.all(
            weeks.map(async ({ start, end }) => {
                const [count, amount] = await Promise.all([
                    this.prisma.payment.count({
                        where: {
                            ...where,
                            paidAt: { gte: start, lte: end },
                        },
                    }),
                    this.prisma.payment.aggregate({
                        where: {
                            ...where,
                            paidAt: { gte: start, lte: end },
                        },
                        _sum: { amount: true },
                    }),
                ]);

                return {
                    start,
                    end,
                    count,
                    amount: amount._sum.amount || 0,
                };
            })
        );

        return weeklyStats.reverse();
    }

    async getMonthlyStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};
        const now = new Date();
        const months = Array.from({ length: 12 }, (_, i) => {
            const start = startOfMonth(subMonths(now, i));
            const end = endOfMonth(subMonths(now, i));
            return { start, end };
        });

        const monthlyStats = await Promise.all(
            months.map(async ({ start, end }) => {
                const [count, amount] = await Promise.all([
                    this.prisma.payment.count({
                        where: {
                            ...where,
                            paidAt: { gte: start, lte: end },
                        },
                    }),
                    this.prisma.payment.aggregate({
                        where: {
                            ...where,
                            paidAt: { gte: start, lte: end },
                        },
                        _sum: { amount: true },
                    }),
                ]);

                return {
                    start,
                    end,
                    count,
                    amount: amount._sum.amount || 0,
                };
            })
        );

        return monthlyStats.reverse();
    }

    async getYearlyStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};
        const now = new Date();
        const years = Array.from({ length: 5 }, (_, i) => {
            const start = startOfYear(subYears(now, i));
            const end = endOfYear(subYears(now, i));
            return { start, end };
        });

        const yearlyStats = await Promise.all(
            years.map(async ({ start, end }) => {
                const [count, amount] = await Promise.all([
                    this.prisma.payment.count({
                        where: {
                            ...where,
                            paidAt: { gte: start, lte: end },
                        },
                    }),
                    this.prisma.payment.aggregate({
                        where: {
                            ...where,
                            paidAt: { gte: start, lte: end },
                        },
                        _sum: { amount: true },
                    }),
                ]);

                return {
                    start,
                    end,
                    count,
                    amount: amount._sum.amount || 0,
                };
            })
        );

        return yearlyStats.reverse();
    }
} 