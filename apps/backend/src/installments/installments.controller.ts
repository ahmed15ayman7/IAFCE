import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { InstallmentsService } from './installments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, InstallmentStatus } from '@shared/prisma';
import { CreateInstallmentDto } from 'dtos/Installment.create.dto';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('installments')
@UseGuards(AuthGuard, RolesGuard)
export class InstallmentsController {
    constructor(private readonly installmentsService: InstallmentsService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createInstallmentDto: CreateInstallmentDto) {
        return this.installmentsService.createInstallment(createInstallmentDto);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    findAll(@Param("skip") skip: number, @Param("take") take: number, @Param("where") where: any, @Param("orderBy") orderBy: any) {
        return this.installmentsService.getInstallments({ skip, take, where, orderBy });
    }

    @Get('overdue')
    @Roles(UserRole.ADMIN)
    findOverdue() {
        return this.installmentsService.getOverdueInstallments();
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    findOne(@Param('id') id: string) {
        return this.installmentsService.getInstallmentById(id);
    }

    @Patch(':id/status')
    @Roles(UserRole.ADMIN)
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: InstallmentStatus,
    ) {
        return this.installmentsService.updateInstallmentStatus(id, status);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.installmentsService.deleteInstallment(id);
    }

    @Get('statistics')
    async getStatistics(@Query('branchId') branchId?: string) {
        return this.installmentsService.getStatistics(branchId);
    }

    @Get('statistics/status')
    async getStatusStatistics(@Query('branchId') branchId?: string) {
        return this.installmentsService.getStatusStatistics(branchId);
    }

    @Get('statistics/overdue')
    async getOverdueStatistics(@Query('branchId') branchId?: string) {
        return this.installmentsService.getOverdueStatistics(branchId);
    }
} 