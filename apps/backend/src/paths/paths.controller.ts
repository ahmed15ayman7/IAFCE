import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { PathsService } from './paths.service';
import { AuthGuard } from '../auth/auth.guard';
import { Path } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePathDto } from 'dtos/Path.create.dto';
import { UpdatePathDto } from 'dtos/Path.update.dto';
@ApiTags('المسارات')
@Controller('paths')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PathsController {
    constructor(private readonly pathsService: PathsService) { }

    @Post()
    async create(@Body() createPathDto: CreatePathDto): Promise<Path> {
        return this.pathsService.create(createPathDto);
    }

    @Get()
    async findAll(): Promise<Path[]> {
        return this.pathsService.findAll();
    }

    @Get('student')
    async findByCourse(@Query('courseId') courseId: string): Promise<Path[]> {
        return this.pathsService.findByCourse(courseId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Path> {
        return this.pathsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePathDto: UpdatePathDto,
    ): Promise<Path> {
        return this.pathsService.update(id, updatePathDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Path> {
        return this.pathsService.remove(id);
    }
} 