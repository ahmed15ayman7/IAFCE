import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from 'dtos/Payment.create.dto';
import { UpdatePaymentDto } from 'dtos/Payment.update.dto';
import { Payment } from '@shared/prisma';

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
} 