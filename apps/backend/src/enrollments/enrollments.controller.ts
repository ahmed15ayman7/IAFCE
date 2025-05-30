import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from '../../dtos/Enrollment.create.dto';
import { UpdateEnrollmentDto } from '../../dtos/Enrollment.update.dto';
import { EnrollmentDto } from '../../dtos/Enrollment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Enrollment } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('التسجيلات')
@Controller('enrollments')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) { }

    @Post()
    async create(@Body() createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
        return this.enrollmentsService.create(createEnrollmentDto);
    }

    @Get()
    async findAll(): Promise<Enrollment[]> {
        return this.enrollmentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Enrollment> {
        return this.enrollmentsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEnrollmentDto: UpdateEnrollmentDto,
    ): Promise<Enrollment> {
        return this.enrollmentsService.update(id, updateEnrollmentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Enrollment> {
        return this.enrollmentsService.remove(id);
    }

    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: string): Promise<Enrollment[]> {
        return this.enrollmentsService.findByUserId(userId);
    }

} 