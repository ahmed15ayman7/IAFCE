import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsEventService } from '../services/news-event.service';
import { CreateNewsEventDto } from '../../../dtos/NewsEvent.create.dto';
import { UpdateNewsEventDto } from '../../../dtos/NewsEvent.update.dto';

@Controller('public-relations/news-events')
export class NewsEventController {
    constructor(private readonly newsEventService: NewsEventService) { }

    @Post()
    create(@Body() createNewsEventDto: CreateNewsEventDto) {
        return this.newsEventService.create(createNewsEventDto);
    }

    @Get()
    findAll(
        @Query('type') type?: string,
        @Query('startDate') startDate?: Date,
        @Query('endDate') endDate?: Date,
    ) {
        if (type) {
            return this.newsEventService.findByType(type);
        }
        if (startDate && endDate) {
            return this.newsEventService.findByDateRange(startDate, endDate);
        }
        return this.newsEventService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsEventService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNewsEventDto: UpdateNewsEventDto) {
        return this.newsEventService.update(id, updateNewsEventDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.newsEventService.remove(id);
    }
}