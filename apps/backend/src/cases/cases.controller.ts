import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CasesService } from './cases.service';
import { LegalCaseType, LegalCaseStatus } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('القضايا')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cases')
export class CasesController {
    constructor(private readonly casesService: CasesService) { }

    @Post()
    async createCase(@Body() data: {
        caseTitle: string;
        caseType: LegalCaseType;
        description: string;
        courtDate?: Date;
        assignedLawyerId: string;
        academyId: string;
        relatedUserId?: string;
        userId: string;
    }) {
        return this.casesService.createCase(data);
    }

    @Get(':id')
    async getCase(@Param('id') id: string) {
        return this.casesService.getCase(id);
    }

    @Put(':id')
    async updateCase(
        @Param('id') id: string,
        @Body() data: {
            caseTitle?: string;
            caseType?: LegalCaseType;
            description?: string;
            courtDate?: Date;
            status?: LegalCaseStatus;
            assignedLawyerId?: string;
            relatedUserId?: string;
        },
    ) {
        return this.casesService.updateCase(id, data);
    }

    @Delete(':id')
    async deleteCase(@Param('id') id: string) {
        return this.casesService.deleteCase(id);
    }

    @Get()
    async listCases(@Query('academyId') academyId: string) {
        return this.casesService.listCases(academyId);
    }

    @Get('type/:type')
    async getCasesByType(
        @Query('academyId') academyId: string,
        @Param('type') type: LegalCaseType,
    ) {
        return this.casesService.getCasesByType(academyId, type);
    }

    @Get('status/:status')
    async getCasesByStatus(
        @Query('academyId') academyId: string,
        @Param('status') status: LegalCaseStatus,
    ) {
        return this.casesService.getCasesByStatus(academyId, status);
    }
} 