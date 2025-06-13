import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FaqService } from '../services/faq.service';
import { CreateFAQDto } from '../../../dtos/FAQ.create.dto';
import { UpdateFAQDto } from '../../../dtos/FAQ.update.dto';


@Controller('public-relations/faqs')
export class FaqController {
    constructor(private readonly faqService: FaqService) { }

    @Post()
    create(@Body() createFaqDto: CreateFAQDto) {
        return this.faqService.create(createFaqDto);
    }

    @Get()
    findAll(@Query('category') category?: string) {
        if (category) {
            return this.faqService.findByCategory(category);
        }
        return this.faqService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.faqService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFaqDto: UpdateFAQDto) {
        return this.faqService.update(id, updateFaqDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.faqService.remove(id);
    }

    @Patch(':id/toggle-active')
    toggleActive(@Param('id') id: string) {
        return this.faqService.toggleActive(id);
    }
}

