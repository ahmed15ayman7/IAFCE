import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto } from '../../dtos/Meeting.create.dto';
import { UpdateMeetingDto } from '../../dtos/Meeting.update.dto';
import { CreateMeetingParticipantDto } from '../../dtos/MeetingParticipant.create.dto';

@Injectable()
export class SecretariatService {
    constructor(private prisma: PrismaService) { }

    async createMeeting(createMeetingDto: CreateMeetingDto) {
        return this.prisma.meeting.create({
            data: createMeetingDto,
            include: {
                createdByAdmin: true,
                academy: true,
                participants: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async findAllMeetings() {
        return this.prisma.meeting.findMany({
            include: {
                createdByAdmin: true,
                academy: true,
                participants: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async findOneMeeting(id: string) {
        const meeting = await this.prisma.meeting.findUnique({
            where: { id },
            include: {
                createdByAdmin: true,
                academy: true,
                participants: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!meeting) {
            throw new NotFoundException(`Meeting with ID ${id} not found`);
        }

        return meeting;
    }

    async updateMeeting(id: string, updateMeetingDto: UpdateMeetingDto) {
        try {
            return await this.prisma.meeting.update({
                where: { id },
                data: updateMeetingDto,
                include: {
                    createdByAdmin: true,
                    academy: true,
                    participants: {
                        include: {
                            user: true,
                        },
                    },
                },
            });
        } catch (error) {
            throw new NotFoundException(`Meeting with ID ${id} not found`);
        }
    }

    async removeMeeting(id: string) {
        try {
            return await this.prisma.meeting.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`Meeting with ID ${id} not found`);
        }
    }

    async addParticipant(id: string, createMeetingParticipantDto: CreateMeetingParticipantDto) {
        const meeting = await this.findOneMeeting(id);

        return this.prisma.meetingParticipant.create({
            data: {
                ...createMeetingParticipantDto,
                meetingId: meeting.id,
            },
            include: {
                user: true,
                meeting: true,
            },
        });
    }

    async getParticipants(id: string) {
        const meeting = await this.findOneMeeting(id);

        return this.prisma.meetingParticipant.findMany({
            where: { meetingId: id },
            include: {
                user: true,
            },
        });
    }

    async getUpcomingMeetings() {
        const now = new Date();
        return this.prisma.meeting.findMany({
            where: {
                meetingDate: {
                    gt: now,
                },
            },
            include: {
                createdByAdmin: true,
                academy: true,
                participants: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                meetingDate: 'asc',
            },
        });
    }

    async getMeetingsSummary() {
        const [totalMeetings, upcomingMeetings, pastMeetings] = await Promise.all([
            this.prisma.meeting.count(),
            this.prisma.meeting.count({
                where: {
                    meetingDate: {
                        gt: new Date(),
                    },
                },
            }),
            this.prisma.meeting.count({
                where: {
                    meetingDate: {
                        lt: new Date(),
                    },
                },
            }),
        ]);

        return {
            totalMeetings,
            upcomingMeetings,
            pastMeetings,
        };
    }
} 