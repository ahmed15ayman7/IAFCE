import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from 'dtos/Report.create.dto';
import { UpdateReportDto } from 'dtos/Report.update.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('التقارير')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء تقرير جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء التقرير بنجاح' })
    create(@Body() createReportDto: CreateReportDto) {
        return this.reportsService.create(createReportDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع التقارير' })
    @ApiResponse({ status: 200, description: 'تم جلب التقارير بنجاح' })
    findAll() {
        return this.reportsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تقرير محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب التقرير بنجاح' })
    findOne(@Param('id') id: string) {
        return this.reportsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث تقرير' })
    @ApiResponse({ status: 200, description: 'تم تحديث التقرير بنجاح' })
    update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
        return this.reportsService.update(id, updateReportDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف تقرير' })
    @ApiResponse({ status: 200, description: 'تم حذف التقرير بنجاح' })
    remove(@Param('id') id: string) {
        return this.reportsService.remove(id);
    }
} 