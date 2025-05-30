import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AcademiesService } from './academies.service';
import { CreateAcademyDto } from '../../dtos/Academy.create.dto';
import { UpdateAcademyDto } from '../../dtos/Academy.update.dto';
import { Academy } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('الاكاديميات')
@Controller('academies')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AcademiesController {
    constructor(private readonly academiesService: AcademiesService) { }

    @Post()
    async create(@Body() createAcademyDto: CreateAcademyDto): Promise<Academy> {
        return this.academiesService.create(createAcademyDto);
    }

    @Get()
    async findAll(): Promise<Academy[]> {
        return this.academiesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Academy> {
        return this.academiesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAcademyDto: UpdateAcademyDto,
    ): Promise<Academy> {
        return this.academiesService.update(id, updateAcademyDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Academy> {
        return this.academiesService.remove(id);
    }
} 