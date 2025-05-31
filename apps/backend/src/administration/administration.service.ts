import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminRoleDto } from '../../dtos/AdminRole.create.dto';
import { UpdateAdminRoleDto } from '../../dtos/AdminRole.update.dto';
import { CreateAdminAssignmentDto } from '../../dtos/AdminAssignment.create.dto';
import { UpdateAdminAssignmentDto } from '../../dtos/AdminAssignment.update.dto';

@Injectable()
export class AdministrationService {
    constructor(private prisma: PrismaService) { }

    async createRole(createAdminRoleDto: CreateAdminRoleDto) {
        return this.prisma.adminRole.create({
            data: createAdminRoleDto,
        });
    }

    async findAllRoles() {
        return this.prisma.adminRole.findMany({
            include: {
                assignments: {
                    include: {
                        admin: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findOneRole(id: string) {
        const role = await this.prisma.adminRole.findUnique({
            where: { id },
            include: {
                assignments: {
                    include: {
                        admin: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });

        if (!role) {
            throw new NotFoundException(`Admin role with ID ${id} not found`);
        }

        return role;
    }

    async updateRole(id: string, updateAdminRoleDto: UpdateAdminRoleDto) {
        try {
            return await this.prisma.adminRole.update({
                where: { id },
                data: updateAdminRoleDto,
                include: {
                    assignments: {
                        include: {
                            admin: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    },
                },
            });
        } catch (error) {
            throw new NotFoundException(`Admin role with ID ${id} not found`);
        }
    }

    async removeRole(id: string) {
        try {
            return await this.prisma.adminRole.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Admin role with ID ${id} not found`);
        }
    }

    async createAssignment(createAdminAssignmentDto: CreateAdminAssignmentDto) {
        return this.prisma.adminAssignment.create({
            data: createAdminAssignmentDto,
            include: {
                admin: {
                    include: {
                        user: true,
                    },
                },
                role: true,
            },
        });
    }

    async findAllAssignments() {
        return this.prisma.adminAssignment.findMany({
            include: {
                admin: {
                    include: {
                        user: true,
                    },
                },
                role: true,
            },
        });
    }

    async findOneAssignment(id: string) {
        const assignment = await this.prisma.adminAssignment.findUnique({
            where: { id },
            include: {
                admin: {
                    include: {
                        user: true,
                    },
                },
                role: true,
            },
        });

        if (!assignment) {
            throw new NotFoundException(`Admin assignment with ID ${id} not found`);
        }

        return assignment;
    }

    async updateAssignment(id: string, updateAdminAssignmentDto: UpdateAdminAssignmentDto) {
        try {
            return await this.prisma.adminAssignment.update({
                where: { id },
                data: updateAdminAssignmentDto,
                include: {
                    admin: {
                        include: {
                            user: true,
                        },
                    },
                    role: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`Admin assignment with ID ${id} not found`);
        }
    }

    async removeAssignment(id: string) {
        try {
            return await this.prisma.adminAssignment.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Admin assignment with ID ${id} not found`);
        }
    }

    async getRoleAssignments(id: string) {
        const role = await this.findOneRole(id);

        return this.prisma.adminAssignment.findMany({
            where: { roleId: id },
            include: {
                admin: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async getAdministrationSummary() {
        const [totalRoles, totalAssignments, activeAssignments] = await Promise.all([
            this.prisma.adminRole.count(),
            this.prisma.adminAssignment.count(),
            this.prisma.adminAssignment.count({
                where: { status: 'ACTIVE' },
            }),
        ]);

        return {
            totalRoles,
            totalAssignments,
            activeAssignments,
        };
    }
} 