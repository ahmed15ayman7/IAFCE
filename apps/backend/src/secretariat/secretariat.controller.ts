import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Query,
    UseGuards,
    UploadedFile,
    UseInterceptors,
    Patch,
    Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SecretariatService } from './secretariat.service';
import { CreateMeetingDto } from '../../dtos/Meeting.create.dto';
import { UpdateMeetingDto } from '../../dtos/Meeting.update.dto';
import { CreateMeetingParticipantDto } from '../../dtos/MeetingParticipant.create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminRoleType, UserRole } from '@shared/prisma';
import { CreateTrainingScheduleDto } from '../../dtos/TrainingSchedule.create.dto';
import { CreatePaymentLogBySecretaryDto } from '../../dtos/PaymentLogBySecretary.create.dto';
import { CreateEmployeeAttendanceLogDto } from '../../dtos/EmployeeAttendanceLog.create.dto';
import { CreateInternalMessageDto } from '../../dtos/InternalMessage.create.dto';
import { UpdateTraineeDto } from '../dtos/secretariat/update-trainee.dto';
import { CreateFileDto } from '../../dtos/File.create.dto';

@ApiTags('المكتب المركزي')
@ApiBearerAuth()
@UseGuards(AuthGuard, JwtAuthGuard, RolesGuard)
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

    // لوحة التحكم
    @Get('dashboard')
    async getDashboardStats() {
        return this.secretariatService.getDashboardStats();
    }

    // إدارة المتدربين
    @Get('trainees')
    async getTrainees(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('search') search?: string,
        @Query('status') status?: string,
    ) {
        return this.secretariatService.getTrainees({
            skip: Number(skip),
            take: Number(take),
            search,
            status,
        });
    }

    @Get('trainees/:id')
    async getTraineeById(@Param('id') id: string) {
        return this.secretariatService.getTraineeById(id);
    }

    @Put('trainees/:id')
    async updateTrainee(
        @Param('id') id: string,
        @Body() data: UpdateTraineeDto,
    ) {
        return this.secretariatService.updateTrainee(id, data);
    }

    // إدارة المواعيد
    @Get('schedule')
    async getSchedule(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('type') type?: string,
    ) {
        return this.secretariatService.getSchedule({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            type,
        });
    }

    @Post('schedule')
    async createSchedule(@Body() data: CreateTrainingScheduleDto) {
        return this.secretariatService.createSchedule(data);
    }

    // إدارة الدفعات
    @Get('payment-logs')
    async getPaymentLogs(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.secretariatService.getPaymentLogs({
            skip: Number(skip),
            take: Number(take),
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
        });
    }

    @Post('payment-logs')
    async createPaymentLog(@Body() data: CreatePaymentLogBySecretaryDto) {
        return this.secretariatService.createPaymentLog(data);
    }

    // إدارة الملفات
    @Get('files')
    async getSecretaryFiles(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('category') category?: string,
        @Query('search') search?: string,
    ) {
        return this.secretariatService.getSecretaryFiles({
            skip: Number(skip),
            take: Number(take),
            category,
            search,
        });
    }

    @Post('files')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: CreateFileDto,
        @Body() data: any,
    ) {
        return this.secretariatService.uploadFile(file, data);
    }

    // إدارة الحضور
    @Get('attendance')
    async getEmployeeAttendance(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('status') status?: string,
    ) {
        return this.secretariatService.getEmployeeAttendance({
            skip: Number(skip),
            take: Number(take),
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined,
            status,
        });
    }

    @Post('attendance')
    async createAttendanceLog(@Body() data: CreateEmployeeAttendanceLogDto) {
        return this.secretariatService.createAttendanceLog(data);
    }

    // الرسائل الداخلية
    @Get('messages')
    async getInternalMessages(
        @Query('skip') skip?: number,
        @Query('take') take?: number,
        @Query('priority') priority?: string,
        @Query('isRead') isRead?: string,
    ) {
        return this.secretariatService.getInternalMessages({
            skip: Number(skip),
            take: Number(take),
            priority,
            isRead: isRead === undefined ? undefined : isRead === 'true',
        });
    }

    @Post('messages')
    async createInternalMessage(@Body() data: CreateInternalMessageDto) {
        return this.secretariatService.createInternalMessage(data);
    }

    @Put('messages/:id/read')
    async markMessageAsRead(@Param('id') id: string) {
        return this.secretariatService.markMessageAsRead(id);
    }
} 