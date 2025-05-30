import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../../dtos/Message.create.dto';
import { UpdateMessageDto } from '../../dtos/Message.update.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Message } from '@shared/prisma';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('الرسائل')
@Controller('messages')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post()
    async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
        return this.messagesService.create(createMessageDto);
    }

    @Get()
    async findAll(): Promise<Message[]> {
        return this.messagesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Message> {
        return this.messagesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateMessageDto: UpdateMessageDto,
    ): Promise<Message> {
        return this.messagesService.update(id, updateMessageDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Message> {
        return this.messagesService.remove(id);
    }
} 