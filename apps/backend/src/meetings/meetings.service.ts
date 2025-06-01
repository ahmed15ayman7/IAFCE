import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '@shared/prisma';

@Injectable()
export class MeetingsService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
    ) { }

    async createMeeting(data: {
        meetingTitle: string;
        meetingDate: Date;
        location: string;
        notes?: string;
        createdByAdminId: string;
        academyId: string;
        participants: string[];
    }) {
        const meeting = await this.prisma.meeting.create({
            data: {
                meetingTitle: data.meetingTitle,
                meetingDate: data.meetingDate,
                location: data.location,
                notes: data.notes,
                createdByAdminId: data.createdByAdminId,
                academyId: data.academyId,
                participants: {
                    create: data.participants.map(userId => ({
                        userId,
                        isAttended: false,
                    })),
                },
            },
            include: {
                participants: true,
            },
        });

        // إرسال إشعارات للمشاركين
        for (const participantId of data.participants) {
            await this.notificationsService.create({
                userId: participantId,
                type: NotificationType.MESSAGE,
                isImportant: false,
                urgent: false,
                read: false,
                createdAt: new Date(),
                title: 'اجتماع جديد',
                message: `تمت دعوتك لحضور اجتماع: ${data.meetingTitle}`,
            });
        }

        return meeting;
    }

    async getMeeting(id: string) {
        return this.prisma.meeting.findUnique({
            where: { id },
            include: {
                participants: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async updateMeeting(
        id: string,
        data: {
            meetingTitle?: string;
            meetingDate?: Date;
            location?: string;
            notes?: string;
        },
    ) {
        return this.prisma.meeting.update({
            where: { id },
            data,
        });
    }

    async deleteMeeting(id: string) {
        return this.prisma.meeting.delete({
            where: { id },
        });
    }

    async listMeetings() {
        return this.prisma.meeting.findMany({
            include: {
                participants: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async updateAttendance(meetingId: string, userId: string, isAttended: boolean) {
        const meetingParticipant = await this.prisma.meetingParticipant.findFirst({
            where: {
                meetingId: meetingId,
                userId: userId,
            },
        });
        return this.prisma.meetingParticipant.update({
            where: {
                id: meetingParticipant.id,
                userId: userId,
            },
            data: {
                isAttended,
            },
        });
    }
} 