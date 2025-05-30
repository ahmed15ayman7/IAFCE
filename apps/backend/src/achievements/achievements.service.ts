import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAchievementDto } from 'dtos/Achievement.create.dto';
import { UpdateAchievementDto } from 'dtos/Achievement.update.dto';
import { Achievement } from '@shared/prisma';
@Injectable()
export class AchievementsService {
    constructor(private prisma: PrismaService) { }

    async create(createAchievementInput: CreateAchievementDto): Promise<Achievement> {
        return this.prisma.achievement.create({
            data: createAchievementInput,
        });
    }

    async findAll() {
        return this.prisma.achievement.findMany({
            include: {
                user: true,
            },
        });
    }

    async findOne(id: string) {
        const achievement = await this.prisma.achievement.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!achievement) {
            throw new NotFoundException(`Achievement with ID ${id} not found`);
        }

        return achievement;
    }

    async update(id: string, updateAchievementInput: UpdateAchievementDto): Promise<Achievement> {
        const achievement = await this.findOne(id);
        if (!achievement) {
            throw new NotFoundException(`Achievement with ID ${id} not found`);
        }

        return this.prisma.achievement.update({
            where: { id },
            data: updateAchievementInput,
            include: {
                user: true,
            },
        });
    }

    async remove(id: string) {
        const achievement = await this.findOne(id);

        if (!achievement) {
            throw new NotFoundException(`Achievement with ID ${id} not found`);
        }

        return this.prisma.achievement.delete({
            where: { id },
        });
    }

    async assignAchievementToUser(achievementId: string, userId: string) {
        const achievement = await this.findOne(achievementId);

        return this.prisma.achievement.update({
            where: { id: achievementId },
            data: {
                user: {
                    connect: { id: userId },
                },
            },
            include: {
                user: true,
            },
        });
    }

    async removeAchievementFromUser(achievementId: string, userId: string) {
        const achievement = await this.findOne(achievementId);
        if (!achievement) {
            throw new NotFoundException(`Achievement with ID ${achievementId} not found`);
        }

        return this.prisma.achievement.update({
            where: { id: achievementId },
            data: {
            },
            include: {
                user: true,
            },
        });
    }

    async findByUserId(userId: string) {
        return this.prisma.achievement.findMany({
            where: { userId }
        });
    }

} 