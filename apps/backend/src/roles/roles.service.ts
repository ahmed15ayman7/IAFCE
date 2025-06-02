import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AdminRoleType, NotificationType } from '@shared/prisma';
import { CreateAdminRoleDto } from 'dtos/AdminRole.create.dto';
import { UpdateAdminRoleDto } from 'dtos/AdminRole.update.dto';

@Injectable()
export class RolesService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createRole(data: CreateAdminRoleDto) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id: data.adminId,
            },
            include: {
                user: true,
            },
        });

        if (!admin) {
            throw new NotFoundException('Admin not found');
        }

        const role = await this.prisma.adminRole.create({
            data: {
                name: data.name,
                description: data.description,
                admin: {
                    connect: {
                        id: admin.id,
                    },
                },
            },
        });

        await this.notificationsService.create({
            userId: admin.user.id,
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
        data: UpdateAdminRoleDto
    ) {
        const role = await this.prisma.adminRole.findUnique({
            where: { id },
        });

        if (!role) {
            throw new NotFoundException('Role not found');
        }

        const admin = await this.prisma.admin.findUnique({
            where: {
                id: role.adminId,
            },
            include: {
                user: true,
            },
        });

        if (!admin) {
            throw new NotFoundException('Admin not found');
        }

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