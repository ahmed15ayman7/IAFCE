import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('القسم')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) { }

    @Post()
    async createDepartment(@Body() data: {
        name: string;
        description?: string;
        managerId: string;
        userId: string;
    }) {
        return this.departmentsService.createDepartment(data);
    }

    @Get(':id')
    async getDepartment(@Param('id') id: string) {
        return this.departmentsService.getDepartment(id);
    }

    @Put(':id')
    async updateDepartment(
        @Param('id') id: string,
        @Body() data: {
            name?: string;
            description?: string;
            managerId?: string;
        },
    ) {
        return this.departmentsService.updateDepartment(id, data);
    }

    @Delete(':id')
    async deleteDepartment(@Param('id') id: string) {
        return this.departmentsService.deleteDepartment(id);
    }

    @Get()
    async listDepartments() {
        return this.departmentsService.listDepartments();
    }

    @Post('assign-manager')
    async assignManager(@Body() data: {
        departmentId: string;
        managerId: string;
        startDate: Date;
        endDate?: Date;
        userId: string;
    }) {
        return this.departmentsService.assignManager(data);
    }
} 