import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@shared/prisma';
import { CreateFileDto } from 'dtos/File.create.dto';

@Injectable()
export class DocumentsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createDocument(data: CreateFileDto, userId: string) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: data.lessonId },
        });
        if (!lesson) {
            throw new NotFoundException('Lesson not found');
        }
        const document = await this.prisma.file.create({
            data: {
                name: data.name,
                url: data.url,
                type: data.type as any,
                lesson: {
                    connect: {
                        id: data.lessonId,
                    },
                },
            },
        });

        await this.notificationsService.create({
            userId: userId,
            type: NotificationType.MESSAGE,
            title: 'مستند جديد',
            message: 'تم إنشاء مستند جديد بنجاح',
            isImportant: false,
            urgent: false,
            read: false,
            createdAt: new Date(),
        });

        return document;
    }

    async getDocument(id: string) {
        return this.prisma.file.findUnique({
            where: { id },
        });
    }

    async updateDocument(
        id: string,
        data: {
            name?: string;
            url?: string;
            type?: string;
        },
    ) {
        return this.prisma.file.update({
            where: { id },
            data: {
                name: data.name,
                url: data.url,
                type: data.type as any,
            },
        });
    }

    async deleteDocument(id: string) {
        return this.prisma.file.delete({
            where: { id },
        });
    }

    async listDocuments(type?: string) {
        return this.prisma.file.findMany({
            where: type ? { type: type as any } : undefined,
        });
    }
} 