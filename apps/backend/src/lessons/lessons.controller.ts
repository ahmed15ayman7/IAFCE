import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from '../../dtos/Lesson.create.dto';
import { UpdateLessonDto } from '../../dtos/Lesson.update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Lesson } from '@shared/prisma';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('الدروس')
@Controller('lessons')
@UseGuards(JwtAuthGuard)
export class LessonsController {
    constructor(private readonly lessonsService: LessonsService) { }

    @Post()
    async create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
        return this.lessonsService.create(createLessonDto);
    }

    @Get()
    async findAll(): Promise<Lesson[]> {
        return this.lessonsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Lesson> {
        return this.lessonsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateLessonDto: UpdateLessonDto,
    ): Promise<Lesson> {
        return this.lessonsService.update(id, updateLessonDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Lesson> {
        return this.lessonsService.remove(id);
    }
} 