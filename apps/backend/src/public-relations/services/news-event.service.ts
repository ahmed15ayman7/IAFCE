import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNewsEventDto } from '../../../dtos/NewsEvent.create.dto';
import { UpdateNewsEventDto } from '../../../dtos/NewsEvent.update.dto';

@Injectable()
export class NewsEventService {
    constructor(private prisma: PrismaService) { }

    async create(createNewsEventDto: CreateNewsEventDto) {
        return this.prisma.newsEvent.create({
            data: createNewsEventDto,
        });
    }

    async findAll() {
        return this.prisma.newsEvent.findMany({
            orderBy: {
                date: 'desc',
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.newsEvent.findUnique({
            where: { id },
        });
    }

    async update(id: string, updateNewsEventDto: UpdateNewsEventDto) {
        return this.prisma.newsEvent.update({
            where: { id },
            data: updateNewsEventDto,
        });
    }

    async remove(id: string) {
        return this.prisma.newsEvent.delete({
            where: { id },
        });
    }

    async findByType(type: string) {
        return this.prisma.newsEvent.findMany({
            where: { type },
            orderBy: {
                date: 'desc',
            },
        });
    }

    async findByDateRange(startDate: Date, endDate: Date) {
        return this.prisma.newsEvent.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: {
                date: 'desc',
            },
        });
    }
}