import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFAQDto } from '../../../dtos/FAQ.create.dto';
import { UpdateFAQDto } from '../../../dtos/FAQ.update.dto';

@Injectable()
export class FaqService {
    constructor(private prisma: PrismaService) { }

    async create(createFaqDto: CreateFAQDto) {
        return this.prisma.fAQ.create({
            data: createFaqDto,
        });
    }

    async findAll() {
        return this.prisma.fAQ.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.fAQ.findUnique({
            where: { id },
        });
    }

    async update(id: string, updateFaqDto: UpdateFAQDto) {
        return this.prisma.fAQ.update({
            where: { id },
            data: updateFaqDto,
        });
    }

    async remove(id: string) {
        return this.prisma.fAQ.delete({
            where: { id },
        });
    }

    async findByCategory(category: string) {
        return this.prisma.fAQ.findMany({
            where: { category },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async toggleActive(id: string) {
        const faq = await this.prisma.fAQ.findUnique({
            where: { id },
        });

        return this.prisma.fAQ.update({
            where: { id },
            data: {
                isActive: !faq.isActive,
            },
        });
    }
}

