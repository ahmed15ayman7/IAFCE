import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from 'dtos/Event.create.dto';
import { UpdateEventDto } from 'dtos/Event.update.dto';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async create(createEventInput: CreateEventDto) {
        return this.prisma.event.create({
            data: createEventInput
        });
    }

    async findAll() {
        return this.prisma.event.findMany();
    }

    async findOne(id: string) {
        return this.prisma.event.findUnique({
            where: { id }
        });
    }

    async update(id: string, updateEventInput: UpdateEventDto) {
        return this.prisma.event.update({
            where: { id },
            data: updateEventInput
        });
    }

    async remove(id: string) {
        return this.prisma.event.delete({
            where: { id }
        });
    }
} 