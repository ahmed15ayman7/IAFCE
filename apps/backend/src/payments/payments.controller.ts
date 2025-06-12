import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@shared/prisma';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePaymentDto } from 'dtos/Payment.create.dto';

@ApiTags('المدفوعات')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'إنشاء دفعة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الدفعة بنجاح' })
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.createPayment(createPaymentDto);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'الحصول على جميع المدفوعات' })
    @ApiResponse({ status: 200, description: 'تم جلب المدفوعات بنجاح' })
    findAll(@Param("skip") skip: number, @Param("take") take: number, @Param("where") where: any, @Param("orderBy") orderBy: any) {
        return this.paymentsService.getPayments({ skip, take, where, orderBy });
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'الحصول على دفعة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الدفعة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.paymentsService.getPaymentById(id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'تحديث دفعة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الدفعة بنجاح' })
    update(@Param('id') id: string, @Body() updatePaymentDto: any) {
        return this.paymentsService.updatePayment(id, updatePaymentDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'حذف دفعة' })
    @ApiResponse({ status: 200, description: 'تم حذف الدفعة بنجاح' })
    remove(@Param('id') id: string) {
        return this.paymentsService.deletePayment(id);
    }

    @Get('statistics')
    async getStatistics(@Query('branchId') branchId?: string) {
        return this.paymentsService.getStatistics(branchId);
    }

    @Get('statistics/daily')
    async getDailyStatistics(@Query('branchId') branchId?: string) {
        return this.paymentsService.getDailyStatistics(branchId);
    }

    @Get('statistics/weekly')
    async getWeeklyStatistics(@Query('branchId') branchId?: string) {
        return this.paymentsService.getWeeklyStatistics(branchId);
    }

    @Get('statistics/monthly')
    async getMonthlyStatistics(@Query('branchId') branchId?: string) {
        return this.paymentsService.getMonthlyStatistics(branchId);
    }

    @Get('statistics/yearly')
    async getYearlyStatistics(@Query('branchId') branchId?: string) {
        return this.paymentsService.getYearlyStatistics(branchId);
    }
} 