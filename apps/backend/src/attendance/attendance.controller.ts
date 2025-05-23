import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from '../../dtos/Attendance.create.dto';
import { UpdateAttendanceDto } from '../../dtos/Attendance.update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Attendance } from '@shared/prisma';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('الحضور والانصراف')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post()
    async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
        return this.attendanceService.create(createAttendanceDto);
    }

    @Get()
    async findAll(): Promise<Attendance[]> {
        return this.attendanceService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Attendance> {
        return this.attendanceService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAttendanceDto: UpdateAttendanceDto,
    ): Promise<Attendance> {
        return this.attendanceService.update(id, updateAttendanceDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Attendance> {
        return this.attendanceService.remove(id);
    }
} 