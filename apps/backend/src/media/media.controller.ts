import { Controller, Get, Post, Delete, Param, Query, UseInterceptors, UseGuards, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { FileType } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateFileDto } from 'dtos/File.create.dto';

@ApiTags('الوسائط')
@Controller('media')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadMedia(
        @Body() file: CreateFileDto,
        @Query('type') type: FileType,
        @Query('lessonId') lessonId: string,
    ) {
        return this.mediaService.uploadMedia(file, type, lessonId);
    }

    @Get(':id')
    async getMedia(@Param('id') id: string) {
        return this.mediaService.getMedia(id);
    }

    @Delete(':id')
    async deleteMedia(@Param('id') id: string) {
        return this.mediaService.deleteMedia(id);
    }

    @Get()
    async listMedia(@Query('type') type?: FileType) {
        return this.mediaService.listMedia(type);
    }
} 