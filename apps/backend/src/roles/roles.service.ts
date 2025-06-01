import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AdminRoleType, NotificationType } from '@shared/prisma';

@Injectable()
export class RolesService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createRole(data: {
        name: AdminRoleType;
        description?: string;
        userId: string;
    }) {
        const role = await this.prisma.adminRole.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });

        await this.notificationsService.create({
            userId: data.userId,
            type: NotificationType.MESSAGE,
            isImportant: false,
            urgent: false,
            read: false,
            createdAt: new Date(),
            title: 'دور جديد',
            message: `تم إنشاء دور جديد: ${data.name}`,
        });

        return role;
    }

    async getRole(id: string) {
        return this.prisma.adminRole.findUnique({
            where: { id },
            include: {
                assignments: {
                    include: {
                        admin: true,
                    },
                },
            },
        });
    }

    async updateRole(
        id: string,
        data: {
            name?: AdminRoleType;
            description?: string;
        },
    ) {
        return this.prisma.adminRole.update({
            where: { id },
            data,
        });
    }

    async deleteRole(id: string) {
        return this.prisma.adminRole.delete({
            where: { id },
        });
    }

    async listRoles() {
        return this.prisma.adminRole.findMany({
            include: {
                assignments: {
                    include: {
                        admin: true,
                    },
                },
            },
        });
    }

    async assignRole(data: {
        adminId: string;
        roleId: string;
        startDate: Date;
        endDate?: Date;
        userId: string;
    }) {
        const assignment = await this.prisma.adminAssignment.create({
            data: {
                adminId: data.adminId,
                roleId: data.roleId,
                startDate: data.startDate,
                endDate: data.endDate,
            },
        });

        await this.notificationsService.create({
            userId: data.userId,
            type: NotificationType.MESSAGE,
            isImportant: false,
            urgent: false,
            read: false,
            createdAt: new Date(),
            title: 'تعيين دور جديد',
            message: 'تم تعيين دور جديد بنجاح',
        });

        return assignment;
    }
} 