import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from '../../dtos/Profile.create.dto';
import { UpdateProfileDto } from '../../dtos/Profile.update.dto';
import { Profile } from '@shared/prisma';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('الملفات الشخصية')
@Controller('profiles')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }

    @Post()
    async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
        return this.profilesService.create(createProfileDto);
    }

    @Get()
    async findAll(): Promise<Profile[]> {
        return this.profilesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Profile> {
        return this.profilesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Promise<Profile> {
        return this.profilesService.update(id, updateProfileDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Profile> {
        return this.profilesService.remove(id);
    }
} 