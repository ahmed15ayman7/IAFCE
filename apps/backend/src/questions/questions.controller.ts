import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from 'dtos/Question.create.dto';
import { UpdateQuestionDto } from 'dtos/Question.update.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('الاسئلة')
@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) { }

    @Post()
    create(@Body() createQuestionDto: CreateQuestionDto) {
        return this.questionsService.create(createQuestionDto);
    }

    @Get()
    findAll() {
        return this.questionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.questionsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
        return this.questionsService.update(id, updateQuestionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.questionsService.remove(id);
    }

    @Post(':id/mark-as-answered')
    markAsAnswered(@Param('id') id: string) {
        return this.questionsService.markAsAnswered(id);
    }

    @Post(':id/mark-as-unanswered')
    markAsUnanswered(@Param('id') id: string) {
        return this.questionsService.markAsUnanswered(id);
    }

}
