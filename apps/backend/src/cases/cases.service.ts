import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { LegalCaseType, LegalCaseStatus, NotificationType } from '@shared/prisma';

@Injectable()
export class CasesService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createCase(data: {
        caseTitle: string;
        caseType: LegalCaseType;
        description: string;
        courtDate?: Date;
        assignedLawyerId: string;
        academyId: string;
        relatedUserId?: string;
        userId: string;
    }) {
        const legalCase = await this.prisma.legalCase.create({
            data: {
                caseTitle: data.caseTitle,
                caseType: data.caseType,
                description: data.description,
                courtDate: data.courtDate,
                assignedLawyerId: data.assignedLawyerId,
                academyId: data.academyId,
                relatedUserId: data.relatedUserId,
            },
        });

        await this.notificationsService.create({
            userId: data.userId,
            type: NotificationType.MESSAGE,
            isImportant: false,
            urgent: false,
            read: false,
            createdAt: new Date(),
            title: 'قضية جديدة',
            message: `تم إنشاء قضية جديدة: ${data.caseTitle}`,
        });

        return legalCase;
    }

    async getCase(id: string) {
        return this.prisma.legalCase.findUnique({
            where: { id },
            include: {
                assignedLawyer: true,
                relatedUser: true,
            },
        });
    }

    async updateCase(
        id: string,
        data: {
            caseTitle?: string;
            caseType?: LegalCaseType;
            description?: string;
            courtDate?: Date;
            status?: LegalCaseStatus;
            assignedLawyerId?: string;
            relatedUserId?: string;
        },
    ) {
        return this.prisma.legalCase.update({
            where: { id },
            data,
        });
    }

    async deleteCase(id: string) {
        return this.prisma.legalCase.delete({
            where: { id },
        });
    }

    async listCases(academyId: string) {
        return this.prisma.legalCase.findMany({
            where: { academyId },
            include: {
                assignedLawyer: true,
                relatedUser: true,
            },
        });
    }

    async getCasesByType(academyId: string, type: LegalCaseType) {
        return this.prisma.legalCase.findMany({
            where: {
                academyId,
                caseType: type,
            },
            include: {
                assignedLawyer: true,
                relatedUser: true,
            },
        });
    }

    async getCasesByStatus(academyId: string, status: LegalCaseStatus) {
        return this.prisma.legalCase.findMany({
            where: {
                academyId,
                status,
            },
            include: {
                assignedLawyer: true,
                relatedUser: true,
            },
        });
    }
} 