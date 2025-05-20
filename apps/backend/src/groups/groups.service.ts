import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupDto } from 'dtos/Group.create.dto';
import { UpdateGroupDto } from 'dtos/Group.update.dto';

@Injectable()
export class GroupsService {
    constructor(private prisma: PrismaService) { }

    async create(createGroupInput: CreateGroupDto) {
        return this.prisma.group.create({
            data: {
                ...createGroupInput,
                members: {
                    connect: { id: createGroupInput.adminId },
                },
            },
            include: {
                admin: true,
                members: true,
                posts: true,
            },
        });
    }

    async findAll() {
        return this.prisma.group.findMany({
            include: {
                admin: true,
                members: true,
                posts: true,
            },
        });
    }

    async findOne(id: string) {
        const group = await this.prisma.group.findUnique({
            where: { id },
            include: {
                admin: true,
                members: true,
                posts: true,
            },
        });

        if (!group) {
            throw new NotFoundException(`Group with ID ${id} not found`);
        }

        return group;
    }

    async update(id: string, updateGroupInput: UpdateGroupDto, userId: string) {
        const group = await this.findOne(id);

        if (group.adminId !== userId) {
            throw new ForbiddenException('Only the group admin can update the group');
        }

        return this.prisma.group.update({
            where: { id },
            data: updateGroupInput,
            include: {
                admin: true,
                members: true,
                posts: true,
            },
        });
    }

    async remove(id: string, userId: string) {
        const group = await this.findOne(id);

        if (group.adminId !== userId) {
            throw new ForbiddenException('Only the group admin can delete the group');
        }

        return this.prisma.group.delete({
            where: { id },
        });
    }

    async addMember(groupId: string, userId: string, adminId: string) {
        const group = await this.findOne(groupId);

        if (group.adminId !== adminId) {
            throw new ForbiddenException('Only the group admin can add members');
        }

        return this.prisma.group.update({
            where: { id: groupId },
            data: {
                members: {
                    connect: { id: userId },
                },
            },
            include: {
                admin: true,
                members: true,
                posts: true,
            },
        });
    }

    async removeMember(groupId: string, userId: string, adminId: string) {
        const group = await this.findOne(groupId);

        if (group.adminId !== adminId) {
            throw new ForbiddenException('Only the group admin can remove members');
        }

        return this.prisma.group.update({
            where: { id: groupId },
            data: {
                members: {
                    disconnect: { id: userId },
                },
            },
            include: {
                admin: true,
                members: true,
                posts: true,
            },
        });
    }

    async getUserGroups(userId: string) {
        return this.prisma.group.findMany({
            where: {
                OR: [
                    { adminId: userId },
                    {
                        members: {
                            some: { id: userId },
                        },
                    },
                ],
            },
            include: {
                admin: true,
                members: true,
                posts: true,
            },
        });
    }

    async getPosts(groupId: string) {
        return this.prisma.post.findMany({
            where: { Group: { some: { id: groupId } } },
        });
    }
} 