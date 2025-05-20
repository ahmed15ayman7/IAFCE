import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from 'dtos/Bookmark.create.dto';
import { UpdateBookmarkDto } from 'dtos/Bookmark.update.dto';

@Injectable()
export class BookmarksService {
    constructor(private prisma: PrismaService) { }

    async create(createBookmarkInput: CreateBookmarkDto) {
        return this.prisma.bookmark.create({
            data: createBookmarkInput
        });
    }

    async findAll() {
        return this.prisma.bookmark.findMany();
    }

    async findOne(id: string) {
        return this.prisma.bookmark.findUnique({
            where: { id }
        });
    }

    async update(id: string, updateBookmarkInput: UpdateBookmarkDto) {
        return this.prisma.bookmark.update({
            where: { id },
            data: updateBookmarkInput
        });
    }

    async remove(id: string) {
        return this.prisma.bookmark.delete({
            where: { id }
        });
    }
} 