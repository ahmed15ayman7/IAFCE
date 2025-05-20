import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from 'dtos/Course.create.dto';
import { UpdateCourseDto } from 'dtos/Course.update.dto';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) { }

    async create(createCourseInput: CreateCourseDto) {
        return this.prisma.course.create({
            data: {
                ...createCourseInput,
            },
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                enrollments: {
                    include: {
                        user: true,
                    },
                },
                lessons: true,
                quizzes: true,
            },
        });
    }

    async findAll() {
        return this.prisma.course.findMany({
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                enrollments: {
                    include: {
                        user: true,
                    },
                },
                lessons: true,
                quizzes: true,
            },
        });
    }

    async findOne(id: string) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                enrollments: {
                    include: {
                        user: true,
                    },
                },
                quizzes: true,
            },
        });

        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }

        return course;
    }

    async update(id: string, updateCourseInput: UpdateCourseDto) {
        await this.findOne(id);
        return this.prisma.course.update({
            where: { id },
            data: updateCourseInput,
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                enrollments: {
                    include: {
                        user: true,
                    },
                },
                quizzes: true,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.course.delete({
            where: { id },
        });
    }

    async enrollStudent(courseId: string, studentId: string) {
        let course = await this.findOne(courseId);
        if (!course) {
            throw new NotFoundException('Course  no found');
        }
        return this.prisma.course.update({
            where: { id: courseId },
            data: {
                enrollments: {
                    connect: { id: studentId },
                },
            },
            include: {
                instructors: {
                    include: {
                        user: true,
                    },
                },
                quizzes: true,
                enrollments: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async getCourseLessons(courseId: string) {
        await this.findOne(courseId);
        return this.prisma.lesson.findMany({
            where: { courseId },
            include: {
                course: true,
            },
        });
    }

    async getCourseQuizzes(courseId: string) {
        await this.findOne(courseId);
        return this.prisma.quiz.findMany({
            where: { Course: { some: { id: courseId } } },
            include: {
                Course: true,
                questions: true,
            },
        });
    }

    async getCourseStudents(courseId: string) {
        await this.findOne(courseId);
        return this.prisma.user.findMany({
            where: {
                enrollments: {
                    some: { courseId },
                },
            },
        });
    }
} 