import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from '../../dtos/Certificate.create.dto';
import { UpdateCertificateDto } from '../../dtos/Certificate.update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Academy, Certificate } from '@shared/prisma';
@Controller('academies')
@UseGuards(JwtAuthGuard)
export class CertificateController {
    constructor(private readonly certificateService: CertificateService) { }

    @Post()
    async create(@Body() createAcademyDto: CreateCertificateDto): Promise<Certificate> {
        return this.certificateService.create(createAcademyDto);
    }

    @Get()
    async findAll(): Promise<Certificate[]> {
        return this.certificateService.findAll();
    }

    @Get('student')
    async findByStudent(@Query('userId') userId: string): Promise<Certificate[]> {
        return this.certificateService.findByStudent(userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Certificate> {
        return this.certificateService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAcademyDto: UpdateCertificateDto,
    ): Promise<Certificate> {
        return this.certificateService.update(id, updateAcademyDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Certificate> {
        return this.certificateService.remove(id);
    }
} 