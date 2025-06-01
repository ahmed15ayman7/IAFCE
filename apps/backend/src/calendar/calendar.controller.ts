import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('التقويم')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) { }

    @Post()
    async createEvent(@Body() data: {
        title: string;
        description?: string;
        startTime: Date;
        endTime: Date;
        academyId: string;
        userId: string;
    }) {
        return this.calendarService.createEvent(data);
    }

    @Get(':id')
    async getEvent(@Param('id') id: string) {
        return this.calendarService.getEvent(id);
    }

    @Put(':id')
    async updateEvent(
        @Param('id') id: string,
        @Body() data: {
            title?: string;
            description?: string;
            startTime?: Date;
            endTime?: Date;
        },
    ) {
        return this.calendarService.updateEvent(id, data);
    }

    @Delete(':id')
    async deleteEvent(@Param('id') id: string) {
        return this.calendarService.deleteEvent(id);
    }

    @Get()
    async listEvents(@Query('academyId') academyId: string) {
        return this.calendarService.listEvents(academyId);
    }

    @Get('range')
    async getEventsByDateRange(
        @Query('academyId') academyId: string,
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ) {
        return this.calendarService.getEventsByDateRange(academyId, startDate, endDate);
    }
} 