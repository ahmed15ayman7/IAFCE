import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('العقود')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('contracts')
export class ContractsController {
    constructor(private readonly contractsService: ContractsService) { }

    @Post()
    async createContract(@Body() data: {
        caseTitle: string;
        description: string;
        assignedLawyerId: string;
        academyId: string;
        relatedUserId?: string;
        userId: string;
    }) {
        return this.contractsService.createContract(data);
    }

    @Get(':id')
    async getContract(@Param('id') id: string) {
        return this.contractsService.getContract(id);
    }

    @Put(':id')
    async updateContract(
        @Param('id') id: string,
        @Body() data: {
            caseTitle?: string;
            description?: string;
            assignedLawyerId?: string;
            relatedUserId?: string;
        },
    ) {
        return this.contractsService.updateContract(id, data);
    }

    @Delete(':id')
    async deleteContract(@Param('id') id: string) {
        return this.contractsService.deleteContract(id);
    }

    @Get()
    async listContracts(@Query('academyId') academyId: string) {
        return this.contractsService.listContracts(academyId);
    }

    @Get('status/:status')
    async getContractsByStatus(
        @Query('academyId') academyId: string,
        @Param('status') status: string,
    ) {
        return this.contractsService.getContractsByStatus(academyId, status);
    }
} 