import { Controller, Get, Param, UseGuards, Post, Body, Put, Delete } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CreateSubmissionDto } from 'dtos/Submission.create.dto';
import { UpdateSubmissionDto } from 'dtos/Submission.update.dto';

@Controller('submissions')
export class SubmissionsController {
    constructor(private readonly submissionsService: SubmissionsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getSubmissions() {
        return this.submissionsService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async createSubmission(@Body() createSubmissionDto: CreateSubmissionDto) {
        return this.submissionsService.create(createSubmissionDto);
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateSubmission(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
        return this.submissionsService.update(id, updateSubmissionDto);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteSubmission(@Param('id') id: string) {
        return this.submissionsService.remove(id);
    }

    @Get('quiz/:quizId')
    async getQuizReports(@Param('quizId') quizId: string) {
        return this.submissionsService.getQuizSubmissions(quizId);
    }


    @Get('user/:userId')
    async getUserReports(@Param('userId') userId: string) {
        return this.submissionsService.getUserSubmissions(userId);
    }

}