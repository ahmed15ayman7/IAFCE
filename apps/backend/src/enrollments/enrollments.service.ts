import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from 'dtos/Enrollment.create.dto';
import { UpdateEnrollmentDto } from 'dtos/Enrollment.update.dto';

@Injectable()
export class EnrollmentsService {
    constructor(private prisma: PrismaService) { }

    async create(createEnrollmentInput: CreateEnrollmentDto) {
        return this.prisma.enrollment.create({
            data: createEnrollmentInput
        });
    }

    async findAll() {
        return this.prisma.enrollment.findMany();
    }

    async findOne(id: string) {
        return this.prisma.enrollment.findUnique({
            where: { id }
        });
    }

    async update(id: string, updateEnrollmentInput: UpdateEnrollmentDto) {
        return this.prisma.enrollment.update({
            where: { id },
            data: updateEnrollmentInput
        });
    }

    async remove(id: string) {
        return this.prisma.enrollment.delete({
            where: { id }
        });
    }

    async findByUserId(userId: string) {
        return this.prisma.enrollment.findMany({
            where: { userId }
        });
    }
} 