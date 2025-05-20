import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from 'dtos/Quiz.create.dto';
import { UpdateQuizDto } from 'dtos/Quiz.update.dto';

@Injectable()
export class QuizzesService {
    constructor(private prisma: PrismaService) { }

    async create(createQuizInput: CreateQuizDto) {
        return this.prisma.quiz.create({
            data: {
                title: createQuizInput.title,
                description: createQuizInput.description,
                lessonId: createQuizInput.lessonId,
                timeLimit: createQuizInput.timeLimit,
                passingScore: createQuizInput.passingScore,
            },
            include: {
                questions: true,
            }
        });
    }

    async findAll() {
        return this.prisma.quiz.findMany({
            include: {
                questions: true,
            },
        });
    }

    async findOne(id: string) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: true,
            },
        });

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        return quiz;
    }

    async update(id: string, updateQuizInput: UpdateQuizDto) {
        return this.prisma.quiz.update({
            where: { id },
            data: {
                title: updateQuizInput.title,
                description: updateQuizInput.description,
                timeLimit: updateQuizInput.timeLimit,
                passingScore: updateQuizInput.passingScore,
            },
            include: {
                questions: true,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.quiz.delete({
            where: { id },
        });
    }


    async submitQuizAttempt(userId: string, quizId: string, answers: { questionId: string; answer: string }[]) {
        const quiz = await this.findOne(quizId);
        let score = 0;
        let totalPoints = 0;

        for (const question of quiz.questions) {
            totalPoints += question.points;
            const userAnswer = answers.find(a => a.questionId === question.id);
            if (userAnswer) {
                const answer = question.answer == userAnswer.answer;
                if (answer) {
                    score += question.points;
                }
            }
        }

        const percentage = (score / totalPoints) * 100;
        const passed = percentage >= quiz.passingScore;

        return this.prisma.submission.create({
            data: {
                userId,
                quizId,
                score: percentage,
                passed,
                answers: {
                    create: answers.map(answer => ({
                        questionId: answer.questionId,
                        answer: answer.answer,
                    })),
                },
            },

        });
    }
} 