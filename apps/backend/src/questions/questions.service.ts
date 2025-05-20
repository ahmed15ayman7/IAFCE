import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from 'dtos/Question.create.dto';
import { UpdateQuestionDto } from 'dtos/Question.update.dto';

@Injectable()
export class QuestionsService {
    constructor(private prisma: PrismaService) { }

    async create(createQuestionInput: CreateQuestionDto) {
        return this.prisma.question.create({
            data: createQuestionInput,
            include: {
                quiz: true,
            },
        });
    }

    async findAll() {
        return this.prisma.question.findMany({
            include: {
                quiz: true,
            },
        });
    }

    async findOne(id: string) {
        const question = await this.prisma.question.findUnique({
            where: { id },
            include: {
                quiz: true,
            },
        });

        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }

        return question;
    }

    async update(id: string, updateQuestionInput: UpdateQuestionDto) {
        const question = await this.findOne(id);

        return this.prisma.question.update({
            where: { id },
            data: updateQuestionInput,
            include: {
                quiz: true,
            },
        });
    }

    async remove(id: string) {
        const question = await this.findOne(id);
        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }

        return this.prisma.question.delete({
            where: { id },
        });
    }

    async markAsAnswered(id: string) {
        const question = await this.findOne(id);
        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }

        return this.prisma.question.update({
            where: { id },
            data: {
                isAnswered: true,
            },
            include: {
                quiz: true,
            },
        });
    }

    async markAsUnanswered(id: string) {
        const question = await this.findOne(id);
        if (!question) {
            throw new NotFoundException(`Question with ID ${id} not found`);
        }

        return this.prisma.question.update({
            where: { id },
            data: {
                isAnswered: false,
            },
            include: {
                quiz: true,
            },
        });
    }
} 