import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AboutSectionService } from '../services/about-section.service';
import { CreateAboutSectionDto } from '../../../dtos/AboutSection.create.dto';
import { UpdateAboutSectionDto } from '../../../dtos/AboutSection.update.dto';

@Controller('public-relations/about')
export class AboutSectionController {
    constructor(private readonly aboutSectionService: AboutSectionService) { }

    @Post()
    create(@Body() createAboutSectionDto: CreateAboutSectionDto) {
        return this.aboutSectionService.create(createAboutSectionDto);
    }

    @Get()
    findAll(@Query('type') type?: string) {
        if (type) {
            return this.aboutSectionService.findByType(type);
        }
        return this.aboutSectionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.aboutSectionService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAboutSectionDto: UpdateAboutSectionDto) {
        return this.aboutSectionService.update(id, updateAboutSectionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.aboutSectionService.remove(id);
    }
} 