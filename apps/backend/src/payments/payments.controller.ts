import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from 'dtos/Payment.create.dto';
import { UpdatePaymentDto } from 'dtos/Payment.update.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('المدفوعات')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء دفعة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الدفعة بنجاح' })
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المدفوعات' })
    @ApiResponse({ status: 200, description: 'تم جلب المدفوعات بنجاح' })
    findAll() {
        return this.paymentsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على دفعة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الدفعة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.paymentsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث دفعة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الدفعة بنجاح' })
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentsService.update(id, updatePaymentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف دفعة' })
    @ApiResponse({ status: 200, description: 'تم حذف الدفعة بنجاح' })
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(id);
    }
} 