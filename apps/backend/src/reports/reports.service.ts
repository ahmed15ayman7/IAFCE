import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from 'dtos/Report.create.dto';
import { UpdateReportDto } from 'dtos/Report.update.dto';

@Injectable()
export class ReportsService {
    constructor(private prisma: PrismaService) { }

    async create(createReportDto: CreateReportDto) {
        return this.prisma.report.create({ data: createReportDto });
    }

    async findAll() {
        return this.prisma.report.findMany();
    }

    async findOne(id: string) {
        return this.prisma.report.findUnique({ where: { id } });
    }

    async update(id: string, updateReportDto: UpdateReportDto) {
        return this.prisma.report.update({ where: { id }, data: updateReportDto });
    }

    async remove(id: string) {
        return this.prisma.report.delete({ where: { id } });
    }

}