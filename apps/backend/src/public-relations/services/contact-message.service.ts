import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactMessageDto } from '../../../dtos/ContactMessage.create.dto';
import { UpdateContactMessageDto } from '../../../dtos/ContactMessage.update.dto';

@Injectable()
export class ContactMessageService {
    constructor(private prisma: PrismaService) { }

    async create(createContactMessageDto: CreateContactMessageDto) {
        return this.prisma.contactMessage.create({
            data: createContactMessageDto,
        });
    }

    async findAll() {
        return this.prisma.contactMessage.findMany({
            include: {
                respondedBy: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.contactMessage.findUnique({
            where: { id },
            include: {
                respondedBy: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async update(id: string, updateContactMessageDto: UpdateContactMessageDto) {
        return this.prisma.contactMessage.update({
            where: { id },
            data: updateContactMessageDto,
            include: {
                respondedBy: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async remove(id: string) {
        return this.prisma.contactMessage.delete({
            where: { id },
        });
    }

    async findByStatus(status: string) {
        return this.prisma.contactMessage.findMany({
            where: { status },
            include: {
                respondedBy: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
