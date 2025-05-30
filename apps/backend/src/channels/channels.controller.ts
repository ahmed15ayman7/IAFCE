import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from '../../dtos/Channel.create.dto';
import { UpdateChannelDto } from '../../dtos/Channel.update.dto';
import { ChannelDto } from '../../dtos/Channel.dto';
import { Channel } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
@ApiTags('القنوات')
@Controller('channels')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ChannelsController {
    constructor(private readonly channelsService: ChannelsService) { }

    @Post()
    async create(@Body() createChannelDto: CreateChannelDto): Promise<ChannelDto> {
        return this.channelsService.create(createChannelDto);
    }

    @Get()
    async findAll(): Promise<ChannelDto[]> {
        return this.channelsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ChannelDto> {
        return this.channelsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Query('userId') userId: string,
        @Body() updateChannelDto: UpdateChannelDto,
    ): Promise<ChannelDto> {
        return this.channelsService.update(id, updateChannelDto, userId);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Query('userId') userId: string): Promise<Channel> {
        return this.channelsService.remove(id, userId);
    }
} 