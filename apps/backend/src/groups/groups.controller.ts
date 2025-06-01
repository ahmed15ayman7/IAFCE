import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from '../../dtos/Group.create.dto';
import { UpdateGroupDto } from '../../dtos/Group.update.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Group, Post as PostEntity } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('المجموعات')
@Controller('groups')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { }

    @Post()
    async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
        return this.groupsService.create(createGroupDto);
    }

    @Get()
    async findAll(): Promise<Group[]> {
        return this.groupsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Group> {
        return this.groupsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateGroupDto: UpdateGroupDto,
        @Param('userId') userId: string,
    ): Promise<Group> {
        return this.groupsService.update(id, updateGroupDto, userId);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Param('userId') userId: string): Promise<Group> {
        return this.groupsService.remove(id, userId);
    }

    @Post(':id/members')
    async addMember(@Param('id') id: string, @Body() addMemberDto: { userId: string }, @Param('userId') userId: string): Promise<Group> {
        return this.groupsService.addMember(id, addMemberDto.userId, userId);
    }

    @Delete(':id/members/:userId')
    async removeMember(@Param('id') id: string, @Param('userId') userId: string, @Param('adminId') adminId: string): Promise<Group> {
        return this.groupsService.removeMember(id, userId, adminId);
    }

    @Get(':id/members')
    async getMembers(@Param('id') id: string): Promise<Group[]> {
        return this.groupsService.getUserGroups(id);
    }

    @Get(':id/posts')
    async getPosts(@Param('id') id: string): Promise<PostEntity[]> {
        return this.groupsService.getPosts(id);
    }
} 