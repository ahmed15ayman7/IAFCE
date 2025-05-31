import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLegalCaseDto } from '../../dtos/LegalCase.create.dto';
import { UpdateLegalCaseDto } from '../../dtos/LegalCase.update.dto';
import { LegalCaseStatus, LegalCaseType } from '@shared/prisma';

@Injectable()
export class LegalAffairsService {
    constructor(private prisma: PrismaService) { }

    async create(createLegalCaseDto: CreateLegalCaseDto) {
        return this.prisma.legalCase.create({
            data: createLegalCaseDto,
            include: {
                assignedLawyer: {
                    include: {
                        user: true,
                    },
                },
                academy: true,
                relatedUser: true,
            },
        });
    }

    async findAll() {
        return this.prisma.legalCase.findMany({
            include: {
                assignedLawyer: {
                    include: {
                        user: true,
                    },
                },
                academy: true,
                relatedUser: true,
            },
        });
    }

    async findOne(id: string) {
        const legalCase = await this.prisma.legalCase.findUnique({
            where: { id },
            include: {
                assignedLawyer: {
                    include: {
                        user: true,
                    },
                },
                academy: true,
                relatedUser: true,
            },
        });

        if (!legalCase) {
            throw new NotFoundException(`Legal case with ID ${id} not found`);
        }

        return legalCase;
    }

    async update(id: string, updateLegalCaseDto: UpdateLegalCaseDto) {
        try {
            return await this.prisma.legalCase.update({
                where: { id },
                data: updateLegalCaseDto,
                include: {
                    assignedLawyer: {
                        include: {
                            user: true,
                        },
                    },
                    academy: true,
                    relatedUser: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`Legal case with ID ${id} not found`);
        }
    }

    async remove(id: string) {
        try {
            return await this.prisma.legalCase.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Legal case with ID ${id} not found`);
        }
    }

    async findByType(type: string) {
        return this.prisma.legalCase.findMany({
            where: { caseType: type as LegalCaseType },
            include: {
                assignedLawyer: {
                    include: {
                        user: true,
                    },
                },
                academy: true,
                relatedUser: true,
            },
        });
    }

    async findByStatus(status: string) {
        return this.prisma.legalCase.findMany({
            where: { status: status as LegalCaseStatus },
            include: {
                assignedLawyer: {
                    include: {
                        user: true,
                    },
                },
                academy: true,
                relatedUser: true,
            },
        });
    }

    async getUpcomingCases() {
        const now = new Date();
        return this.prisma.legalCase.findMany({
            where: {
                courtDate: {
                    gt: now,
                },
            },
            include: {
                assignedLawyer: {
                    include: {
                        user: true,
                    },
                },
                academy: true,
                relatedUser: true,
            },
            orderBy: {
                courtDate: 'asc',
            },
        });
    }

    async getLegalAffairsSummary() {
        const [totalCases, openCases, closedCases] = await Promise.all([
            this.prisma.legalCase.count(),
            this.prisma.legalCase.count({
                where: { status: 'OPEN' },
            }),
            this.prisma.legalCase.count({
                where: { status: 'CLOSED' },
            }),
        ]);

        const casesByType = await this.prisma.legalCase.groupBy({
            by: ['caseType'],
            _count: true,
        });

        return {
            totalCases,
            openCases,
            closedCases,
            casesByType: casesByType.reduce((acc, curr) => {
                acc[curr.caseType] = curr._count;
                return acc;
            }, {}),
        };
    }
} 