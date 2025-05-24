import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBadgeDto } from 'dtos/Badge.create.dto';
import { UpdateBadgeDto } from 'dtos/Badge.update.dto';
import { Academy, Badge } from '@shared/prisma';
@Injectable()
export class BadgesService {
    constructor(private prisma: PrismaService) { }

    async create(createBadgeInput: CreateBadgeDto): Promise<Badge> {
        return this.prisma.badge.create({
            data: createBadgeInput,
            include: {
                user: true,
            },
        });
    }

    async findAll() {
        return this.prisma.badge.findMany({
            include: {
                user: true,
            },
        });
    }

    async findOne(id: string): Promise<Badge> {
        const badge = await this.prisma.badge.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!badge) {
            throw new NotFoundException(`Badge with ID ${id} not found`);
        }

        return badge;
    }

    async findByStudent(userId: string): Promise<Badge[]> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return this.prisma.badge.findMany({
            where: { userId: user.id },
        });
    }

    async update(id: string, updateBadgeInput: UpdateBadgeDto): Promise<Badge> {
        const badge = await this.findOne(id);
        if (!badge) {
            throw new NotFoundException(`Badge with ID ${id} not found`);
        }

        return this.prisma.badge.update({
            where: { id },
            data: updateBadgeInput,
            include: {
                user: true,
            },
        });
    }

    async remove(id: string) {
        const badge = await this.findOne(id);
        if (!badge) {
            throw new NotFoundException(`Badge with ID ${id} not found`);
        }

        return this.prisma.badge.delete({
            where: { id },
            include: {
                user: true,
            },
        });
    }

}
