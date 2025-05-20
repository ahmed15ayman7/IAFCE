import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcademyDto } from 'dtos/Academy.create.dto';
import { UpdateAcademyDto } from 'dtos/Academy.update.dto';
import { AcademyEntity } from 'dtos/Academy.entity';
import { Academy } from '@shared/prisma';
@Injectable()
export class AcademiesService {
    constructor(private prisma: PrismaService) { }

    async create(createAcademyInput: CreateAcademyDto): Promise<Academy> {
        return this.prisma.academy.create({
            data: createAcademyInput,
            include: {
                courses: true,
            },
        });
    }

    async findAll() {
        return this.prisma.academy.findMany({
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                courses: true,
            },
        });
    }

    async findOne(id: string) {
        const academy = await this.prisma.academy.findUnique({
            where: { id },
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                courses: true,
            },
        });

        if (!academy) {
            throw new NotFoundException(`Academy with ID ${id} not found`);
        }

        return academy;
    }

    async update(id: string, updateAcademyInput: UpdateAcademyDto) {
        const academy = await this.findOne(id);

        return this.prisma.academy.update({
            where: { id },
            data: updateAcademyInput,
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                courses: true,
            },
        });
    }

    async remove(id: string) {
        const academy = await this.findOne(id);

        return this.prisma.academy.delete({
            where: { id },
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                courses: true,
            },
        });
    }

    async addInstructor(academyId: string, instructorId: string) {
        const academy = await this.findOne(academyId);
        if (!academy) {
            throw new NotFoundException(`Academy with ID ${academyId} not found`);
        }
        const instructor = await this.prisma.user.findUnique({
            where: { id: instructorId },
        });
        if (!instructor) {
            throw new NotFoundException(`Instructor with ID ${instructorId} not found`);
        }

        return this.prisma.academy.update({
            where: { id: academyId },
            data: {
                instructors: {
                    connect: { id: instructorId },
                },
            },
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                courses: true,
            },
        });
    }

    async removeInstructor(academyId: string, instructorId: string) {
        const academy = await this.findOne(academyId);

        return this.prisma.academy.update({
            where: { id: academyId },
            data: {
                instructors: {
                    disconnect: { id: instructorId },
                },
            },
            include: {
                instructors: true,
                courses: true,
            },
        });
    }
} 