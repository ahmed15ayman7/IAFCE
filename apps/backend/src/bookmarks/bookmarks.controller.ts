import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from '../../dtos/Bookmark.create.dto';
import { UpdateBookmarkDto } from '../../dtos/Bookmark.update.dto';
import { Bookmark } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('المفضلة')
@Controller('bookmarks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) { }

    @Post()
    async create(@Body() createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
        return this.bookmarksService.create(createBookmarkDto);
    }

    @Get()
    async findAll(): Promise<Bookmark[]> {
        return this.bookmarksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Bookmark> {
        return this.bookmarksService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateBookmarkDto: UpdateBookmarkDto,
    ): Promise<Bookmark> {
        return this.bookmarksService.update(id, updateBookmarkDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Bookmark> {
        return this.bookmarksService.remove(id);
    }
} 