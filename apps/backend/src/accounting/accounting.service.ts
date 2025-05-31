import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountingEntryDto } from '../../dtos/AccountingEntry.create.dto';
import { UpdateAccountingEntryDto } from '../../dtos/AccountingEntry.update.dto';

@Injectable()
export class AccountingService {
    constructor(private prisma: PrismaService) { }

    async create(createAccountingEntryDto: CreateAccountingEntryDto) {
        return this.prisma.accountingEntry.create({
            data: createAccountingEntryDto,
            include: {
                createdByAdmin: true,
                academy: true,
                invoice: true,
                salaryPayment: true,
            },
        });
    }

    async findAll() {
        return this.prisma.accountingEntry.findMany({
            include: {
                createdByAdmin: true,
                academy: true,
                invoice: true,
                salaryPayment: true,
            },
        });
    }

    async findOne(id: string) {
        const entry = await this.prisma.accountingEntry.findUnique({
            where: { id },
            include: {
                createdByAdmin: true,
                academy: true,
                invoice: true,
                salaryPayment: true,
            },
        });

        if (!entry) {
            throw new NotFoundException(`Accounting entry with ID ${id} not found`);
        }

        return entry;
    }

    async update(id: string, updateAccountingEntryDto: UpdateAccountingEntryDto) {
        try {
            return await this.prisma.accountingEntry.update({
                where: { id },
                data: updateAccountingEntryDto,
                include: {
                    createdByAdmin: true,
                    academy: true,
                    invoice: true,
                    salaryPayment: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`Accounting entry with ID ${id} not found`);
        }
    }

    async remove(id: string) {
        try {
            return await this.prisma.accountingEntry.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Accounting entry with ID ${id} not found`);
        }
    }

    async findAllInvoices() {
        return this.prisma.invoice.findMany({
            include: {
                accountingEntry: {
                    include: {
                        createdByAdmin: true,
                        academy: true,
                    },
                },
            },
        });
    }

    async findAllSalaryPayments() {
        return this.prisma.salaryPayment.findMany({
            include: {
                employee: true,
                accountingEntry: {
                    include: {
                        createdByAdmin: true,
                        academy: true,
                    },
                },
            },
        });
    }

    async getAccountingSummary() {
        const [totalIncome, totalExpenses, totalSalaries] = await Promise.all([
            this.prisma.accountingEntry.aggregate({
                where: { type: 'INCOME' },
                _sum: { amount: true },
            }),
            this.prisma.accountingEntry.aggregate({
                where: { type: 'EXPENSE' },
                _sum: { amount: true },
            }),
            this.prisma.accountingEntry.aggregate({
                where: { type: 'SALARY' },
                _sum: { amount: true },
            }),
        ]);

        return {
            totalIncome: totalIncome._sum.amount || 0,
            totalExpenses: totalExpenses._sum.amount || 0,
            totalSalaries: totalSalaries._sum.amount || 0,
            netBalance: (totalIncome._sum.amount || 0) - (totalExpenses._sum.amount || 0) - (totalSalaries._sum.amount || 0),
        };
    }
} 