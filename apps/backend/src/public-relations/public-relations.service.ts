import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicRelationsRecordDto } from '../../dtos/PublicRelationsRecord.create.dto';
import { UpdatePublicRelationsRecordDto } from '../../dtos/PublicRelationsRecord.update.dto';
import { CreatePRResponseDto } from '../../dtos/PRResponse.create.dto';
import { CreateMediaAlertDto } from '../../dtos/MediaAlert.create.dto';
import { CreateCSRProjectDto } from '../../dtos/CSRProject.create.dto';
import { CreatePartnershipAgreementDto } from '../../dtos/PartnershipAgreement.create.dto';

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

    // Media Alerts
    async createMediaAlert(dto: CreateMediaAlertDto) {
        return this.prisma.mediaAlert.create({
            data: dto,
        });
    }

    async getMediaAlerts(academyId: string) {
        return this.prisma.mediaAlert.findMany({
            where: { academyId },
            orderBy: { triggerDate: 'desc' },
        });
    }

    async getMediaAlertsBySource(sourceType: string, sourceId: string) {
        return this.prisma.mediaAlert.findMany({
            where: { sourceType, sourceId },
            orderBy: { triggerDate: 'desc' },
        });
    }

    // Partnership Agreements
    async createPartnershipAgreement(dto: CreatePartnershipAgreementDto) {
        return this.prisma.partnershipAgreement.create({
            data: dto,
        });
    }

    async getPartnershipAgreements(academyId: string) {
        return this.prisma.partnershipAgreement.findMany({
            where: { academyId },
            orderBy: { startDate: 'desc' },
        });
    }

    async getActivePartnerships(academyId: string) {
        return this.prisma.partnershipAgreement.findMany({
            where: {
                academyId,
                status: 'ACTIVE',
                OR: [
                    { endDate: null },
                    { endDate: { gt: new Date() } },
                ],
            },
        });
    }

    // CSR Projects
    async createCSRProject(dto: CreateCSRProjectDto) {
        return this.prisma.cSRProject.create({
            data: dto,
        });
    }

    async getCSRProjects(academyId: string) {
        return this.prisma.cSRProject.findMany({
            where: { Academy: { some: { id: academyId } } },
            orderBy: { startDate: 'desc' },
        });
    }

    async getCSRProjectsByStatus(academyId: string, status: string) {
        return this.prisma.cSRProject.findMany({
            where: { Academy: { some: { id: academyId } }, status },
            orderBy: { startDate: 'desc' },
        });
    }

    // Analytics
    async getMediaAnalytics(academyId: string) {
        const [alertsByType, alertsByDate] = await Promise.all([
            this.prisma.mediaAlert.groupBy({
                by: ['sourceType'],
                where: { academyId },
                _count: true,
            }),
            this.prisma.mediaAlert.groupBy({
                by: ['triggerDate'],
                where: { academyId },
                _count: true,
            }),
        ]);

        return {
            alertsByType,
            alertsByDate,
        };
    }

    async getPartnershipAnalytics(academyId: string) {
        const [partnershipsByType, activePartnerships] = await Promise.all([
            this.prisma.partnershipAgreement.groupBy({
                by: ['type'],
                where: { academyId },
                _count: true,
            }),
            this.prisma.partnershipAgreement.count({
                where: {
                    academyId,
                    status: 'ACTIVE',
                    OR: [
                        { endDate: null },
                        { endDate: { gt: new Date() } },
                    ],
                },
            }),
        ]);

        return {
            partnershipsByType,
            activePartnerships,
        };
    }

    async getCSRAnalytics(academyId: string) {
        const [projectsByStatus, totalProjects] = await Promise.all([
            this.prisma.cSRProject.groupBy({
                by: ['status'],
                where: { Academy: { some: { id: academyId } } },
                _count: true,
            }),
            this.prisma.cSRProject.count({
                where: { Academy: { some: { id: academyId } } },
            }),
        ]);

        return {
            projectsByStatus,
            totalProjects,
        };
    }
} 