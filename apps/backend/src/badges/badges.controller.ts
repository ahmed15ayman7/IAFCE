import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { CreateBadgeDto } from '../../dtos/Badge.create.dto';
import { UpdateBadgeDto } from '../../dtos/Badge.update.dto';
import { Badge } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('البطاقات')
@Controller('badges')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class BadgesController {
    constructor(private readonly badgesService: BadgesService) { }

    @Post()
    async create(@Body() createBadgeDto: CreateBadgeDto): Promise<Badge> {
        return this.badgesService.create(createBadgeDto);
    }

    @Get()
    async findAll(): Promise<Badge[]> {
        return this.badgesService.findAll();
    }

    @Get('student')
    async findByStudent(@Query('userId') userId: string): Promise<Badge[]> {
        return this.badgesService.findByStudent(userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Badge> {
        return this.badgesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateBadgeDto: UpdateBadgeDto,
    ): Promise<Badge> {
        return this.badgesService.update(id, updateBadgeDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Badge> {
        return this.badgesService.remove(id);
    }
} 