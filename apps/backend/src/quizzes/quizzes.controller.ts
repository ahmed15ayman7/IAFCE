import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from 'dtos/Quiz.create.dto';
import { UpdateQuizDto } from 'dtos/Quiz.update.dto';
import { CreateQuestionDto } from 'dtos/Question.create.dto';
import { CreateSubmissionDto } from 'dtos/Submission.create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

interface UserPayload {
    id: string;
    email: string;
    role: string;
}

interface RequestWithUser extends Request {
    user: UserPayload;
}

@Controller('quizzes')
@UseGuards(JwtAuthGuard)
export class QuizzesController {
    constructor(private readonly quizzesService: QuizzesService) { }

    @Post()
    async create(@Body() createQuizInput: CreateQuizDto) {
        return this.quizzesService.create(createQuizInput);
    }

    @Get()
    async findAll() {
        return this.quizzesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.quizzesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateQuizInput: UpdateQuizDto,
    ) {
        return this.quizzesService.update(id, updateQuizInput);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.quizzesService.remove(id);
    }




    @Post(':id/submit')
    async submitQuiz(
        @Param('id') quizId: string,
        @Body() submitQuizInput: CreateSubmissionDto,
        @Req() req: RequestWithUser,
    ) {
        return this.quizzesService.submitQuizAttempt(
            req.user.id,
            quizId,
            submitQuizInput.answers as { questionId: string; answer: string }[],
        );
    }
} 