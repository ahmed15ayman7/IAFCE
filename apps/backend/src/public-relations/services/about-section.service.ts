import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAboutSectionDto } from '../../../dtos/AboutSection.create.dto';
import { UpdateAboutSectionDto } from '../../../dtos/AboutSection.update.dto';

@Injectable()
export class AboutSectionService {
    constructor(private prisma: PrismaService) { }

    async create(createAboutSectionDto: CreateAboutSectionDto) {
        return this.prisma.aboutSection.create({
            data: createAboutSectionDto,
        });
    }

    async findAll() {
        return this.prisma.aboutSection.findMany({
            include: {
                createdBy: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findByType(type: string) {
        return this.prisma.aboutSection.findMany({
            where: { type },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.aboutSection.findUnique({
            where: { id },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async update(id: string, updateAboutSectionDto: UpdateAboutSectionDto) {
        return this.prisma.aboutSection.update({
            where: { id },
            data: updateAboutSectionDto,
        });
    }

    async remove(id: string) {
        return this.prisma.aboutSection.delete({
            where: { id },
        });
    }
} 