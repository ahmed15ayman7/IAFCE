import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from '../../dtos/Attendance.create.dto';
import { UpdateAttendanceDto } from '../../dtos/Attendance.update.dto';
import { Attendance } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('الحضور والانصراف')
@Controller('attendance')
@ApiBearerAuth()
@UseGuards(AuthGuard)
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