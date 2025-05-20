import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from 'dtos/Message.create.dto';
import { UpdateMessageDto } from 'dtos/Message.update.dto';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) { }

    async create(createMessageInput: CreateMessageDto) {
        return this.prisma.message.create({
            data: createMessageInput,
            include: {
                sender: true,
                Channel: true,
            },
        });
    }

    async findAll() {
        return this.prisma.message.findMany({
            include: {
                sender: true,
                Channel: true,
            },
        });
    }

    async findOne(id: string) {
        const message = await this.prisma.message.findUnique({
            where: { id },
            include: {
                sender: true,
                Channel: true,
            },
        });

        if (!message) {
            throw new NotFoundException(`Message with ID ${id} not found`);
        }

        return message;
    }

    async update(id: string, updateMessageInput: UpdateMessageDto) {
        const message = await this.findOne(id);

        return this.prisma.message.update({
            where: { id },
            data: updateMessageInput,
            include: {
                sender: true,
                Channel: true,
            },
        });
    }

    async remove(id: string) {
        const message = await this.findOne(id);

        return this.prisma.message.delete({
            where: { id },
        });
    }

    async markAsRead(id: string) {
        const message = await this.findOne(id);

        return this.prisma.message.update({
            where: { id },
            data: {
                isRead: true,
            },
            include: {
                sender: true,
                Channel: true,
            },
        });
    }

    async getUserMessages(userId: string) {
        return this.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId },
                ],
            },
            include: {
                sender: true,
                Channel: true,
            },
        });
    }

    async getConversation(userId1: string, userId2: string) {
        return this.prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: userId1,
                        Channel: {
                            some: {
                                members: {
                                    some: {
                                        id: userId2,
                                    },
                                },
                            },
                        }
                    },
                    {
                        senderId: userId2,
                        Channel: {
                            some: {
                                members: {
                                    some: {
                                        id: userId1,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                sender: true,
                Channel: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }
} 