import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ContactMessageService } from '../services/contact-message.service';
import { CreateContactMessageDto } from '../../../dtos/ContactMessage.create.dto';
import { UpdateContactMessageDto } from '../../../dtos/ContactMessage.update.dto';

@Controller('public-relations/contact-messages')
export class ContactMessageController {
    constructor(private readonly contactMessageService: ContactMessageService) { }

    @Post()
    create(@Body() createContactMessageDto: CreateContactMessageDto) {
        return this.contactMessageService.create(createContactMessageDto);
    }

    @Get()
    findAll(@Query('status') status?: string) {
        if (status) {
            return this.contactMessageService.findByStatus(status);
        }
        return this.contactMessageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contactMessageService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateContactMessageDto: UpdateContactMessageDto) {
        return this.contactMessageService.update(id, updateContactMessageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.contactMessageService.remove(id);
    }
}
