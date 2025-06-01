import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { LegalCaseType, NotificationType } from '@shared/prisma';

@Injectable()
export class ContractsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createContract(data: {
        caseTitle: string;
        description: string;
        assignedLawyerId: string;
        academyId: string;
        relatedUserId?: string;
        userId: string;
    }) {
        const contract = await this.prisma.legalCase.create({
            data: {
                caseTitle: data.caseTitle,
                caseType: 'CONTRACT' as LegalCaseType,
                description: data.description,
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
            title: 'عقد جديد',
            message: `تم إنشاء عقد جديد: ${data.caseTitle}`,
        });

        return contract;
    }

    async getContract(id: string) {
        return this.prisma.legalCase.findUnique({
            where: { id },
            include: {
                assignedLawyer: true,
                relatedUser: true,
            },
        });
    }

    async updateContract(
        id: string,
        data: {
            caseTitle?: string;
            description?: string;
            assignedLawyerId?: string;
            relatedUserId?: string;
        },
    ) {
        return this.prisma.legalCase.update({
            where: { id },
            data,
        });
    }

    async deleteContract(id: string) {
        return this.prisma.legalCase.delete({
            where: { id },
        });
    }

    async listContracts(academyId: string) {
        return this.prisma.legalCase.findMany({
            where: {
                academyId,
                caseType: LegalCaseType.CONTRACT,
            },
            include: {
                assignedLawyer: true,
                relatedUser: true,
            },
        });
    }

    async getContractsByStatus(academyId: string, status: string) {
        return this.prisma.legalCase.findMany({
            where: {
                academyId,
                caseType: 'CONTRACT',
                status: status as any,
            },
            include: {
                assignedLawyer: true,
                relatedUser: true,
            },
        });
    }
} 