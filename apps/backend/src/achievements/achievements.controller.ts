import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from '../../dtos/Achievement.create.dto';
import { UpdateAchievementDto } from '../../dtos/Achievement.update.dto';
import { Achievement } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('الانجازات')
@Controller('achievements')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AchievementsController {
    constructor(private readonly achievementsService: AchievementsService) { }

    @Post()
    async create(@Body() createAchievementDto: CreateAchievementDto): Promise<Achievement> {
        return this.achievementsService.create(createAchievementDto);
    }

    @Get()
    async findAll(): Promise<Achievement[]> {
        return this.achievementsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Achievement> {
        return this.achievementsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAchievementDto: UpdateAchievementDto,
    ): Promise<Achievement> {
        return this.achievementsService.update(id, updateAchievementDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Achievement> {
        return this.achievementsService.remove(id);
    }

    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string): Promise<Achievement[]> {
        return this.achievementsService.findByUserId(userId);
    }
} 