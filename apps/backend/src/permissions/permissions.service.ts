import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@shared/prisma';
import { CreateAdminRoleDto } from '../../dtos/AdminRole.create.dto';
import { UpdateAdminRoleDto } from 'dtos/AdminRole.update.dto';
import { CreatePermissionDto } from 'dtos/Permission.create.dto';
import { UpdatePermissionDto } from 'dtos/Permission.update.dto';

@Injectable()
export class PermissionsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createPermission(data: CreateAdminRoleDto, userId: string) {
        const permission = await this.prisma.adminRole.create({
            data: {
                ...data,
            },
        });

        await this.notificationsService.create({
            userId,
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
        data: UpdateAdminRoleDto & { permission: (CreatePermissionDto | UpdatePermissionDto) },
    ) {
        const permission = await this.prisma.adminRole.findUnique({
            where: { id },
        });

        if (!permission) {
            throw new NotFoundException('Permission not found');
        }
        const lastPermission = await this.prisma.permission.findFirst({
            where: {
                AdminRole: {
                    some: {
                        id: id,
                    },
                },
                name: data.permission.name,
            },
        });

        if (lastPermission) {
            await this.prisma.permission.update({
                where: { id: lastPermission.id },
                data: {
                    description: data.permission.description,
                    isActive: data.permission.isActive,
                },
            });
            return this.prisma.adminRole.update({
                where: { id },
                data: {
                    ...data,
                },
            });
        }

        const newPermission = await this.prisma.permission.create({
            data: {
                ...data.permission,
            },
        });

        await this.prisma.adminRole.update({
            where: { id },
            data: {
                permissions: {
                    connect: {
                        id: newPermission.id,
                    },
                },
            }
        });

        return this.prisma.adminRole.update({
            where: { id },
            data: {
                ...data,
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