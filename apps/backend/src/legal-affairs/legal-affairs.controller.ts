import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LegalAffairsService } from './legal-affairs.service';
import { CreateLegalCaseDto } from '../../dtos/LegalCase.create.dto';
import { UpdateLegalCaseDto } from '../../dtos/LegalCase.update.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('القضايا القانونية')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('legal-affairs')
export class LegalAffairsController {
    constructor(private readonly legalAffairsService: LegalAffairsService) { }

    @Post('cases')
    create(@Body() createLegalCaseDto: CreateLegalCaseDto) {
        return this.legalAffairsService.create(createLegalCaseDto);
    }

    @Get('cases')
    findAll() {
        return this.legalAffairsService.findAll();
    }

    @Get('cases/:id')
    findOne(@Param('id') id: string) {
        return this.legalAffairsService.findOne(id);
    }

    @Patch('cases/:id')
    update(@Param('id') id: string, @Body() updateLegalCaseDto: UpdateLegalCaseDto) {
        return this.legalAffairsService.update(id, updateLegalCaseDto);
    }

    @Delete('cases/:id')
    remove(@Param('id') id: string) {
        return this.legalAffairsService.remove(id);
    }

    @Get('cases/type/:type')
    findByType(@Param('type') type: string) {
        return this.legalAffairsService.findByType(type);
    }

    @Get('cases/status/:status')
    findByStatus(@Param('status') status: string) {
        return this.legalAffairsService.findByStatus(status);
    }

    @Get('cases/upcoming')
    getUpcomingCases() {
        return this.legalAffairsService.getUpcomingCases();
    }

    @Get('summary')
    getLegalAffairsSummary() {
        return this.legalAffairsService.getLegalAffairsSummary();
    }
} 