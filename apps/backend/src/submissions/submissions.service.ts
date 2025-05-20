import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionDto } from 'dtos/Submission.create.dto';
import { UpdateSubmissionDto } from 'dtos/Submission.update.dto';

@Injectable()
export class SubmissionsService {
    constructor(private prisma: PrismaService) { }

    async create(createSubmissionInput: CreateSubmissionDto) {
        return this.prisma.submission.create({
            data: {
                ...createSubmissionInput,
                createdAt: new Date(),
            },
            include: {
                user: true,
                quiz: true,
            },
        });
    }

    async findAll() {
        return this.prisma.submission.findMany({
            include: {
                user: true,
                quiz: true,
            },
        });
    }

    async findOne(id: string) {
        const submission = await this.prisma.submission.findUnique({
            where: { id },
            include: {
                user: true,
                quiz: true,
            },
        });

        if (!submission) {
            throw new NotFoundException(`Submission with ID ${id} not found`);
        }

        return submission;
    }

    async update(id: string, updateSubmissionInput: UpdateSubmissionDto) {
        const submission = await this.findOne(id);
        if (!submission) {
            throw new NotFoundException(`Submission with ID ${id} not found`);
        }

        return this.prisma.submission.update({
            where: { id },
            data: {
                ...updateSubmissionInput,
                updatedAt: new Date(),
            },
            include: {
                user: true,
                quiz: true,
            },
        });
    }

    async remove(id: string) {
        const submission = await this.findOne(id);

        return this.prisma.submission.delete({
            where: { id },
        });
    }

    async gradeSubmission(id: string, grade: number, feedback: string) {
        const submission = await this.findOne(id);

        return this.prisma.submission.update({
            where: { id },
            data: {
                score: grade,
                feedback,
                passed: grade >= 50,
                updatedAt: new Date(),
            },
            include: {
                user: true,
                quiz: true,
            },
        });
    }

    async getUserSubmissions(userId: string) {
        return this.prisma.submission.findMany({
            where: { userId },
            include: {
                user: true,
                quiz: true,
            },
        });
    }

    async getQuizSubmissions(quizId: string) {
        return this.prisma.submission.findMany({
            where: { quizId },
            include: {
                user: true,
                quiz: true,
            },
        });
    }
} 