import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminAuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateAdmin(email: string, password: string) {
        const admin = await this.prisma.admin.findFirst({
            where: {
                user: {
                    email,
                },
            },
            include: {
                user: true,
                assignments: {
                    include: {
                        role: {
                            include: {
                                permissions: true,
                            },
                        },
                    },
                },
            },
        });

        if (!admin) {
            throw new UnauthorizedException('بيانات الدخول غير صحيحة');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('بيانات الدخول غير صحيحة');
        }

        return admin;
    }

    async login(email: string, password: string) {
        const admin = await this.validateAdmin(email, password);

        const permissions = admin.assignments
            .flatMap((assignment) => assignment.role.permissions)
            .map((permission) => permission.name);

        const roles = admin.assignments.map((assignment) => assignment.role.name);

        const payload = {
            sub: admin.id,
            email: admin.user.email,
            permissions,
            roles,
        };

        return {
            access_token: this.jwtService.sign(payload),
            admin: {
                id: admin.id,
                email: admin.user.email,
                firstName: admin.user.firstName,
                lastName: admin.user.lastName,
                permissions,
                roles,
            },
        };
    }

    async getProfile(adminId: string) {
        const admin = await this.prisma.admin.findUnique({
            where: { id: adminId },
            include: {
                user: true,
                assignments: {
                    include: {
                        role: {
                            include: {
                                permissions: true,
                            },
                        },
                    },
                },
            },
        });

        if (!admin) {
            throw new UnauthorizedException('المسؤول غير موجود');
        }

        const permissions = admin.assignments
            .flatMap((assignment) => assignment.role.permissions)
            .map((permission) => permission.name);

        const roles = admin.assignments.map((assignment) => assignment.role.name);

        return {
            id: admin.id,
            email: admin.user.email,
            firstName: admin.user.firstName,
            lastName: admin.user.lastName,
            permissions,
            roles,
        };
    }
} 