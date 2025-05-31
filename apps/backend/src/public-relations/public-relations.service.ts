import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicRelationsRecordDto } from '../../dtos/PublicRelationsRecord.create.dto';
import { UpdatePublicRelationsRecordDto } from '../../dtos/PublicRelationsRecord.update.dto';
import { CreatePRResponseDto } from '../../dtos/PRResponse.create.dto';

@Injectable()
export class PublicRelationsService {
    constructor(private prisma: PrismaService) { }

    async create(createPublicRelationsRecordDto: CreatePublicRelationsRecordDto) {
        return this.prisma.publicRelationsRecord.create({
            data: createPublicRelationsRecordDto,
            include: {
                handledByAdmin: true,
                academy: true,
                responses: {
                    include: {
                        respondedByAdmin: true,
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.publicRelationsRecord.findMany({
            include: {
                handledByAdmin: true,
                academy: true,
                responses: {
                    include: {
                        respondedByAdmin: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        const record = await this.prisma.publicRelationsRecord.findUnique({
            where: { id },
            include: {
                handledByAdmin: true,
                academy: true,
                responses: {
                    include: {
                        respondedByAdmin: true,
                    },
                },
            },
        });

        if (!record) {
            throw new NotFoundException(`Public relations record with ID ${id} not found`);
        }

        return record;
    }

    async update(id: string, updatePublicRelationsRecordDto: UpdatePublicRelationsRecordDto) {
        try {
            return await this.prisma.publicRelationsRecord.update({
                where: { id },
                data: updatePublicRelationsRecordDto,
                include: {
                    handledByAdmin: true,
                    academy: true,
                    responses: {
                        include: {
                            respondedByAdmin: true,
                        },
                    },
                },
            });
        } catch (error) {
            throw new NotFoundException(`Public relations record with ID ${id} not found`);
        }
    }

    async remove(id: string) {
        try {
            return await this.prisma.publicRelationsRecord.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Public relations record with ID ${id} not found`);
        }
    }

    async addResponse(id: string, createPRResponseDto: CreatePRResponseDto) {
        const record = await this.findOne(id);

        return this.prisma.pRResponse.create({
            data: {
                ...createPRResponseDto,
                prRecordId: record.id,
            },
            include: {
                respondedByAdmin: true,
                prRecord: true,
            },
        });
    }

    async getResponses(id: string) {
        const record = await this.findOne(id);

        return this.prisma.pRResponse.findMany({
            where: { prRecordId: id },
            include: {
                respondedByAdmin: true,
            },
        });
    }

    async getStatusSummary() {
        const records = await this.prisma.publicRelationsRecord.groupBy({
            by: ['status'],
            _count: true,
        });

        return records.reduce((acc, curr) => {
            acc[curr.status] = curr._count;
            return acc;
        }, {});
    }
} 