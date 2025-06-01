import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@shared/prisma';

@Injectable()
export class SocialMediaService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createPost(userId: string, content: string, title: string) {
        const post = await this.prisma.post.create({
            data: {
                authorId: userId,
                content,
                title,
            },
        });

        await this.notificationsService.create({
            userId,
            type: NotificationType.MESSAGE,
            isImportant: false,
            urgent: false,
            read: false,
            createdAt: new Date(),
            title: 'منشور جديد',
            message: `تم إنشاء منشور جديد بنجاح: ${title}`,
        });

        return post;
    }

    async getPost(id: string) {
        return this.prisma.post.findUnique({
            where: { id },
            include: {
                author: true,
                comments: true,
            },
        });
    }

    async updatePost(id: string, content: string, title: string) {
        return this.prisma.post.update({
            where: { id },
            data: {
                content,
                title,
            },
        });
    }

    async deletePost(id: string) {
        return this.prisma.post.delete({
            where: { id },
        });
    }

    async listPosts() {
        return this.prisma.post.findMany({
            include: {
                author: true,
                comments: true,
            },
        });
    }
} 