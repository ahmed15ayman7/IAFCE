import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChannelDto } from 'dtos/Channel.create.dto';
import { UpdateChannelDto } from 'dtos/Channel.update.dto';

@Injectable()
export class ChannelsService {
    constructor(private prisma: PrismaService) { }

    async create(createChannelInput: CreateChannelDto) {
        const owner = await this.prisma.owner.findUnique({
            where: { id: createChannelInput.ownerId },
        });
        if (!owner) {
            throw new NotFoundException('Owner not found');
        }
        return this.prisma.channel.create({
            data: {
                ...createChannelInput,
                ownerId: owner.id,
            },
            include: {
                owner: true,
                members: true,
                messages: true,
            },
        });
    }

    async findAll() {
        return this.prisma.channel.findMany({
            include: {
                owner: true,
                members: true,
                messages: true,
            },
        });
    }

    async findOne(id: string) {
        const channel = await this.prisma.channel.findUnique({
            where: { id },
            include: {
                owner: true,
                members: true,
                messages: true,
            },
        });

        if (!channel) {
            throw new NotFoundException(`Channel with ID ${id} not found`);
        }

        return channel;
    }

    async update(id: string, updateChannelInput: UpdateChannelDto, userId: string) {
        const channel = await this.findOne(id);

        if (channel.ownerId !== userId) {
            throw new ForbiddenException('Only the channel owner can update the channel');
        }

        return this.prisma.channel.update({
            where: { id },
            data: updateChannelInput,
            include: {
                owner: true,
                members: true,
                messages: true,
            },
        });
    }

    async remove(id: string, userId: string) {
        const channel = await this.findOne(id);

        if (channel.ownerId !== userId) {
            throw new ForbiddenException('Only the channel owner can delete the channel');
        }

        return this.prisma.channel.delete({
            where: { id },
        });
    }

    async addMember(channelId: string, userId: string, ownerId: string) {
        const channel = await this.findOne(channelId);

        if (channel.ownerId !== ownerId) {
            throw new ForbiddenException('Only the channel owner can add members');
        }

        return this.prisma.channel.update({
            where: { id: channelId },
            data: {
                members: {
                    connect: { id: userId },
                },
            },
            include: {
                owner: true,
                members: true,
                messages: true,
            },
        });
    }

    async removeMember(channelId: string, userId: string, ownerId: string) {
        const channel = await this.findOne(channelId);

        if (channel.ownerId !== ownerId) {
            throw new ForbiddenException('Only the channel owner can remove members');
        }

        return this.prisma.channel.update({
            where: { id: channelId },
            data: {
                members: {
                    disconnect: { id: userId },
                },
            },
            include: {
                owner: true,
                members: true,
                messages: true,
            },
        });
    }

    async getUserChannels(userId: string) {
        return this.prisma.channel.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    {
                        members: {
                            some: { id: userId },
                        },
                    },
                ],
            },
            include: {
                owner: true,
                members: true,
                messages: true,
            },
        });
    }

    async sendMessage(channelId: string, userId: string, content: string) {
        const channel = await this.findOne(channelId);
        if (!channel) {
            throw new NotFoundException(`Channel with ID ${channelId} not found`);
        }

        const isMember = channel.members.some(member => member.id === userId);
        if (!isMember) {
            throw new ForbiddenException('Only channel members can send messages');
        }


        return this.prisma.message.create({
            data: {
                content,
                senderId: userId,
                Channel: {
                    connect: { id: channelId },
                },
            },
            include: {
                sender: true,
                Channel: true,
            },
        });
    }
} 