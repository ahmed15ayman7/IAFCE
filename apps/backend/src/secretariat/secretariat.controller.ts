import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SecretariatService } from './secretariat.service';
import { CreateMeetingDto } from '../../dtos/Meeting.create.dto';
import { UpdateMeetingDto } from '../../dtos/Meeting.update.dto';
import { CreateMeetingParticipantDto } from '../../dtos/MeetingParticipant.create.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('المكتب المركزي')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('secretariat')
export class SecretariatController {
    constructor(private readonly secretariatService: SecretariatService) { }

    @Post('meetings')
    createMeeting(@Body() createMeetingDto: CreateMeetingDto) {
        return this.secretariatService.createMeeting(createMeetingDto);
    }

    @Get('meetings')
    findAllMeetings() {
        return this.secretariatService.findAllMeetings();
    }

    @Get('meetings/:id')
    findOneMeeting(@Param('id') id: string) {
        return this.secretariatService.findOneMeeting(id);
    }

    @Patch('meetings/:id')
    updateMeeting(@Param('id') id: string, @Body() updateMeetingDto: UpdateMeetingDto) {
        return this.secretariatService.updateMeeting(id, updateMeetingDto);
    }

    @Delete('meetings/:id')
    removeMeeting(@Param('id') id: string) {
        return this.secretariatService.removeMeeting(id);
    }

    @Post('meetings/:id/participants')
    addParticipant(
        @Param('id') id: string,
        @Body() createMeetingParticipantDto: CreateMeetingParticipantDto,
    ) {
        return this.secretariatService.addParticipant(id, createMeetingParticipantDto);
    }

    @Get('meetings/:id/participants')
    getParticipants(@Param('id') id: string) {
        return this.secretariatService.getParticipants(id);
    }

    @Get('meetings/upcoming')
    getUpcomingMeetings() {
        return this.secretariatService.getUpcomingMeetings();
    }

    @Get('meetings/summary')
    getMeetingsSummary() {
        return this.secretariatService.getMeetingsSummary();
    }
} 