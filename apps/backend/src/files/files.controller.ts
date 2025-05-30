import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from '../../dtos/File.create.dto';
import { UpdateFileDto } from '../../dtos/File.update.dto';
import { FileDto } from '../../dtos/File.dto';
import { AuthGuard } from '../auth/auth.guard';
import { File } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('الملفات')
@Controller('files')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class FilesController {
    constructor(private readonly filesService: FilesService) { }

    @Post()
    async create(@Body() createFileDto: CreateFileDto): Promise<File> {
        return this.filesService.create(createFileDto);
    }

    @Get()
    async findAll(): Promise<File[]> {
        return this.filesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<File> {
        return this.filesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateFileDto: UpdateFileDto,
    ): Promise<File> {
        return this.filesService.update(id, updateFileDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<File> {
        return this.filesService.remove(id);
    }
} 