import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateFileDto } from 'dtos/File.create.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('المستندات')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post()
    createDocument(@Body() data: CreateFileDto, @Param('userId') userId: string) {
        return this.documentsService.createDocument(data, userId);
    }

    @Get(':id')
    getDocument(@Param('id') id: string) {
        return this.documentsService.getDocument(id);
    }

    @Put(':id')
    updateDocument(@Param('id') id: string, @Body() data: CreateFileDto) {
        return this.documentsService.updateDocument(id, data);
    }

    @Delete(':id')
    deleteDocument(@Param('id') id: string) {
        return this.documentsService.deleteDocument(id);
    }

    @Get()
    listDocuments(@Query('type') type?: string) {
        return this.documentsService.listDocuments(type);
    }
}