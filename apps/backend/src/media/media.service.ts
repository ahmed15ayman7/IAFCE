import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileType } from '@shared/prisma';
import { CreateFileDto } from 'dtos/File.create.dto';

@Injectable()
export class MediaService {
    constructor(private prisma: PrismaService) { }

    async uploadMedia(file: CreateFileDto, type: FileType, lessonId: string) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: lessonId },
        });
        if (!lesson) {
            throw new NotFoundException('Lesson not found');
        }
        return this.prisma.file.create({
            data: {
                name: file.name,
                url: file.url,
                type: type,
                lessonId: lesson.id,
            },
        });
    }

    async getMedia(id: string) {
        return this.prisma.file.findUnique({
            where: { id },
        });
    }

    async deleteMedia(id: string) {
        return this.prisma.file.delete({
            where: { id },
        });
    }

    async listMedia(type?: FileType) {
        return this.prisma.file.findMany({
            where: type ? { type } : undefined,
        });
    }
} 