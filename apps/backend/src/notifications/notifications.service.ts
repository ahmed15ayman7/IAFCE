import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Notification } from '@shared/prisma';
import { CreateNotificationDto } from 'dtos/Notification.create.dto';
import { UpdateNotificationDto } from 'dtos/Notification.update.dto';


@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) { }

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.prisma.notification.create({
            data: createNotificationDto,
        });
    }

    async findAll(): Promise<Notification[]> {
        return this.prisma.notification.findMany();
    }

    async findOne(id: string): Promise<Notification> {
        return this.prisma.notification.findUnique({
            where: { id },
        });
    }

    async update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<Notification> {
        return this.prisma.notification.update({
            where: { id },
            data: updateNotificationDto,
        });
    }

    async remove(id: string): Promise<Notification> {
        return this.prisma.notification.delete({
            where: { id },
        });
    }


}