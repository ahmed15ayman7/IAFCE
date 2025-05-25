import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Path } from '@shared/prisma';
import { CreatePathDto } from 'dtos/Path.create.dto';
import { UpdatePathDto } from 'dtos/Path.update.dto';
@Injectable()
export class PathsService {
    constructor(private prisma: PrismaService) { }

    async create(createCertificateInput: CreatePathDto): Promise<Path> {
        return this.prisma.path.create({
            data: createCertificateInput,
            include: {
                courses: true,
                milestones: true,
            },
        });
    }

    async findAll(): Promise<Path[]> {
        return this.prisma.path.findMany({
            include: {
                courses: true,
            },
        });
    }

    async findByCourse(courseId: string): Promise<Path[]> {
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }

        return this.prisma.path.findMany({
            where: {
                courses: {
                    some: {
                        id: courseId,
                    },
                },
            },
        });
    }

    async findOne(id: string): Promise<Path> {
        const path = await this.prisma.path.findUnique({
            where: { id },
            include: {
                courses: true,
                milestones: true,
            },
        });

        if (!path) {
            throw new NotFoundException(`Path with ID ${id} not found`);
        }

        return path;
    }

    async update(id: string, updatePathInput: UpdatePathDto): Promise<Path> {
        const path = await this.findOne(id);
        if (!path) {
            throw new NotFoundException(`Path with ID ${id} not found`);
        }

        return this.prisma.path.update({
            where: { id },
            data: updatePathInput,
            include: {
                courses: true,
                milestones: true,
            },
        });
    }

    async remove(id: string): Promise<Path> {
        const path = await this.findOne(id);
        if (!path) {
            throw new NotFoundException(`Path with ID ${id} not found`);
        }

        return this.prisma.path.delete({
            where: { id },
            include: {
                courses: true,
                milestones: true,
            },
        });
    }

}