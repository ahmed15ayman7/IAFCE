import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PublicRelationsService } from './public-relations.service';
import { CreatePublicRelationsRecordDto } from '../../dtos/PublicRelationsRecord.create.dto';
import { UpdatePublicRelationsRecordDto } from '../../dtos/PublicRelationsRecord.update.dto';
import { CreatePRResponseDto } from '../../dtos/PRResponse.create.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Public Relations')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('public-relations')
export class PublicRelationsController {
    constructor(private readonly publicRelationsService: PublicRelationsService) { }

    @Post()
    create(@Body() createPublicRelationsRecordDto: CreatePublicRelationsRecordDto) {
        return this.publicRelationsService.create(createPublicRelationsRecordDto);
    }

    @Get()
    findAll() {
        return this.publicRelationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.publicRelationsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePublicRelationsRecordDto: UpdatePublicRelationsRecordDto,
    ) {
        return this.publicRelationsService.update(id, updatePublicRelationsRecordDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.publicRelationsService.remove(id);
    }

    @Post(':id/responses')
    addResponse(
        @Param('id') id: string,
        @Body() createPRResponseDto: CreatePRResponseDto,
    ) {
        return this.publicRelationsService.addResponse(id, createPRResponseDto);
    }

    @Get(':id/responses')
    getResponses(@Param('id') id: string) {
        return this.publicRelationsService.getResponses(id);
    }

    @Get('status/summary')
    getStatusSummary() {
        return this.publicRelationsService.getStatusSummary();
    }
} 