import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InstallmentStatus } from '@shared/prisma';
import { CreateInstallmentDto } from 'dtos/Installment.create.dto';

@Injectable()
export class InstallmentsService {
    constructor(private prisma: PrismaService) { }

    async createInstallment(data: CreateInstallmentDto) {
        return this.prisma.installment.create({
            data,
            include: {
                user: true,
                payment: true,
                branch: true,
            },
        });
    }

    async getInstallments(params: {
        skip?: number;
        take?: number;
        where?: any;
        orderBy?: any;
    }) {
        const { skip, take, where, orderBy } = params;
        return this.prisma.installment.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                user: true,
                payment: true,
                branch: true,
            },
        });
    }

    async getInstallmentById(id: string) {
        return this.prisma.installment.findUnique({
            where: { id },
            include: {
                user: true,
                payment: true,
                branch: true,
            },
        });
    }

    async updateInstallmentStatus(id: string, status: InstallmentStatus) {
        return this.prisma.installment.update({
            where: { id },
            data: { status },
            include: {
                user: true,
                payment: true,
                branch: true,
            },
        });
    }

    async deleteInstallment(id: string) {
        return this.prisma.installment.delete({
            where: { id },
        });
    }

    async getOverdueInstallments() {
        return this.prisma.installment.findMany({
            where: {
                dueDate: {
                    lt: new Date(),
                },
                status: InstallmentStatus.PENDING,
            },
            include: {
                user: true,
                payment: true,
                branch: true,
            },
        });
    }

    async getStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};

        const [totalInstallments, totalAmount, pendingInstallments, pendingAmount] = await Promise.all([
            this.prisma.installment.count({ where }),
            this.prisma.installment.aggregate({
                where,
                _sum: { amount: true },
            }),
            this.prisma.installment.count({
                where: {
                    ...where,
                    status: InstallmentStatus.PENDING,
                },
            }),
            this.prisma.installment.aggregate({
                where: {
                    ...where,
                    status: InstallmentStatus.PENDING,
                },
                _sum: { amount: true },
            }),
        ]);

        return {
            totalInstallments,
            totalAmount: totalAmount._sum.amount || 0,
            pendingInstallments,
            pendingAmount: pendingAmount._sum.amount || 0,
        };
    }

    async getStatusStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};

        const statusStats = await this.prisma.installment.groupBy({
            by: ['status'],
            where,
            _count: {
                id: true,
            },
            _sum: {
                amount: true,
            },
        });

        return statusStats.map(stat => ({
            status: stat.status,
            count: stat._count.id,
            amount: stat._sum.amount || 0,
        }));
    }

    async getOverdueStatistics(branchId?: string) {
        const where = branchId ? { branchId } : {};
        const today = new Date();

        const overdueStats = await this.prisma.installment.findMany({
            where: {
                ...where,
                status: InstallmentStatus.PENDING,
                dueDate: {
                    lt: today,
                },
            },
            include: {
                user: true,
                branch: true,
            },
        });

        return {
            count: overdueStats.length,
            amount: overdueStats.reduce((sum, inst) => sum + inst.amount, 0),
            installments: overdueStats,
        };
    }
} 