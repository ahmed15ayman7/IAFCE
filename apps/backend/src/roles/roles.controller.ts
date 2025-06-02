import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AdminRoleType } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateAdminRoleDto } from '../../dtos/AdminRole.create.dto';
import { UpdateAdminRoleDto } from '../../dtos/AdminRole.update.dto';

@ApiTags('الأدوار')
@Controller('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    async createRole(@Body() data: CreateAdminRoleDto) {
        return this.rolesService.createRole(data);
    }

    @Get(':id')
    async getRole(@Param('id') id: string) {
        return this.rolesService.getRole(id);
    }

    @Put(':id')
    async updateRole(
        @Param('id') id: string,
        @Body() data: UpdateAdminRoleDto,
    ) {
        return this.rolesService.updateRole(id, data);
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: string) {
        return this.rolesService.deleteRole(id);
    }

    @Get()
    async listRoles() {
        return this.rolesService.listRoles();
    }

    @Post('assign')
    async assignRole(@Body() data: {
        adminId: string;
        roleId: string;
        startDate: Date;
        endDate?: Date;
        userId: string;
    }) {
        return this.rolesService.assignRole(data);
    }
} 