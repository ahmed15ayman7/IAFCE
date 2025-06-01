import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateAdminRoleDto } from 'dtos/AdminRole.create.dto';
import { CreatePermissionDto } from 'dtos/Permission.create.dto';
import { UpdateAdminRoleDto } from 'dtos/AdminRole.update.dto';
import { UpdatePermissionDto } from 'dtos/Permission.update.dto';

@ApiTags('الصلاحيات')
@Controller('permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) { }

    @Post()
    async createPermission(@Body() data: CreateAdminRoleDto, @Param('userId') userId: string) {
        return this.permissionsService.createPermission(data, userId);
    }

    @Get(':id')
    async getPermission(@Param('id') id: string) {
        return this.permissionsService.getPermission(id);
    }

    @Put(':id')
    async updatePermission(
        @Param('id') id: string,
        @Body() data: UpdateAdminRoleDto & { permission: CreatePermissionDto | UpdatePermissionDto },
    ) {
        return this.permissionsService.updatePermission(id, data);
    }

    @Delete(':id')
    async deletePermission(@Param('id') id: string) {
        return this.permissionsService.deletePermission(id);
    }

    @Get()
    async listPermissions() {
        return this.permissionsService.listPermissions();
    }

    @Post('assign')
    async assignPermission(@Body() data: {
        adminId: string;
        permissionId: string;
        startDate: Date;
        endDate?: Date;
        userId: string;
    }) {
        return this.permissionsService.assignPermission(data);
    }
} 