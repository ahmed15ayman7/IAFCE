import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('الاجتماعات')
@Controller('meetings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) { }

    @Post()
    async createMeeting(@Body() data: {
        meetingTitle: string;
        meetingDate: Date;
        location: string;
        notes?: string;
        createdByAdminId: string;
        academyId: string;
        participants: string[];
    }) {
        return this.meetingsService.createMeeting(data);
    }

    @Get(':id')
    async getMeeting(@Param('id') id: string) {
        return this.meetingsService.getMeeting(id);
    }

    @Put(':id')
    async updateMeeting(
        @Param('id') id: string,
        @Body() data: {
            meetingTitle?: string;
            meetingDate?: Date;
            location?: string;
            notes?: string;
        },
    ) {
        return this.meetingsService.updateMeeting(id, data);
    }

    @Delete(':id')
    async deleteMeeting(@Param('id') id: string) {
        return this.meetingsService.deleteMeeting(id);
    }

    @Get()
    async listMeetings() {
        return this.meetingsService.listMeetings();
    }

    @Put(':meetingId/attendance/:userId')
    async updateAttendance(
        @Param('meetingId') meetingId: string,
        @Param('userId') userId: string,
        @Body('isAttended') isAttended: boolean,
    ) {
        return this.meetingsService.updateAttendance(meetingId, userId, isAttended);
    }
} 