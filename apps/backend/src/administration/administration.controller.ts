import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdministrationService } from './administration.service';
import { CreateAdminRoleDto } from '../../dtos/AdminRole.create.dto';
import { UpdateAdminRoleDto } from '../../dtos/AdminRole.update.dto';
import { CreateAdminAssignmentDto } from '../../dtos/AdminAssignment.create.dto';
import { UpdateAdminAssignmentDto } from '../../dtos/AdminAssignment.update.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Administration')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('administration')
export class AdministrationController {
    constructor(private readonly administrationService: AdministrationService) { }

    @Post('roles')
    createRole(@Body() createAdminRoleDto: CreateAdminRoleDto) {
        return this.administrationService.createRole(createAdminRoleDto);
    }

    @Get('roles')
    findAllRoles() {
        return this.administrationService.findAllRoles();
    }

    @Get('roles/:id')
    findOneRole(@Param('id') id: string) {
        return this.administrationService.findOneRole(id);
    }

    @Patch('roles/:id')
    updateRole(@Param('id') id: string, @Body() updateAdminRoleDto: UpdateAdminRoleDto) {
        return this.administrationService.updateRole(id, updateAdminRoleDto);
    }

    @Delete('roles/:id')
    removeRole(@Param('id') id: string) {
        return this.administrationService.removeRole(id);
    }

    @Post('assignments')
    createAssignment(@Body() createAdminAssignmentDto: CreateAdminAssignmentDto) {
        return this.administrationService.createAssignment(createAdminAssignmentDto);
    }

    @Get('assignments')
    findAllAssignments() {
        return this.administrationService.findAllAssignments();
    }

    @Get('assignments/:id')
    findOneAssignment(@Param('id') id: string) {
        return this.administrationService.findOneAssignment(id);
    }

    @Patch('assignments/:id')
    updateAssignment(
        @Param('id') id: string,
        @Body() updateAdminAssignmentDto: UpdateAdminAssignmentDto,
    ) {
        return this.administrationService.updateAssignment(id, updateAdminAssignmentDto);
    }

    @Delete('assignments/:id')
    removeAssignment(@Param('id') id: string) {
        return this.administrationService.removeAssignment(id);
    }

    @Get('roles/:id/assignments')
    getRoleAssignments(@Param('id') id: string) {
        return this.administrationService.getRoleAssignments(id);
    }

    @Get('summary')
    getAdministrationSummary() {
        return this.administrationService.getAdministrationSummary();
    }
} 