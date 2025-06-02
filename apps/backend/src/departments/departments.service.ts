import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@shared/prisma';
import { CreateAdminRoleDto } from 'dtos/AdminRole.create.dto';
import { UpdateAdminRoleDto } from 'dtos/AdminRole.update.dto';

@Injectable()
export class DepartmentsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createDepartment(data: CreateAdminRoleDto) {
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

        const department = await this.prisma.adminRole.create({
            data: {
                name: data.name as any,
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
            title: 'قسم جديد',
            message: `تم إنشاء قسم جديد: ${data.name}`,
        });

        return department;
    }

    async getDepartment(id: string) {
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

    async updateDepartment(
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
            data: {
                name: data.name as any,
                description: data.description,
            },
        });
    }

    async deleteDepartment(id: string) {
        return this.prisma.adminRole.delete({
            where: { id },
        });
    }

    async listDepartments() {
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

    async assignManager(data: {
        departmentId: string;
        managerId: string;
        startDate: Date;
        endDate?: Date;
        userId: string;
    }) {
        const assignment = await this.prisma.adminAssignment.create({
            data: {
                adminId: data.managerId,
                roleId: data.departmentId,
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
            title: 'تعيين مدير قسم',
            message: 'تم تعيين مدير قسم جديد بنجاح',
        });

        return assignment;
    }
} 