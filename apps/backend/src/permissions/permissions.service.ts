import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@shared/prisma';

@Injectable()
export class PermissionsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createPermission(data: {
        name: string;
        description?: string;
        userId: string;
    }) {
        const permission = await this.prisma.adminRole.create({
            data: {
                name: data.name as any,
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
            title: 'إذن جديد',
            message: `تم إنشاء إذن جديد: ${data.name}`,
        });

        return permission;
    }

    async getPermission(id: string) {
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

    async updatePermission(
        id: string,
        data: {
            name?: string;
            description?: string;
        },
    ) {
        return this.prisma.adminRole.update({
            where: { id },
            data: {
                name: data.name as any,
                description: data.description,
            },
        });
    }

    async deletePermission(id: string) {
        return this.prisma.adminRole.delete({
            where: { id },
        });
    }

    async listPermissions() {
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

    async assignPermission(data: {
        adminId: string;
        permissionId: string;
        startDate: Date;
        endDate?: Date;
        userId: string;
    }) {
        const assignment = await this.prisma.adminAssignment.create({
            data: {
                adminId: data.adminId,
                roleId: data.permissionId,
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
            title: 'تعيين إذن جديد',
            message: 'تم تعيين إذن جديد بنجاح',
        });

        return assignment;
    }
} 