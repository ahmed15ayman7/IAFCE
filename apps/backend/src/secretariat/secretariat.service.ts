import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto } from '../../dtos/Meeting.create.dto';
import { UpdateMeetingDto } from '../../dtos/Meeting.update.dto';
import { CreateMeetingParticipantDto } from '../../dtos/MeetingParticipant.create.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FilesService } from '../files/files.service';
import { CreateTrainingScheduleDto } from '../../dtos/TrainingSchedule.create.dto';
import { CreatePaymentLogBySecretaryDto } from '../../dtos/PaymentLogBySecretary.create.dto';
import { CreateEmployeeAttendanceLogDto } from '../../dtos/EmployeeAttendanceLog.create.dto';
import { UpdateTraineeDto } from '../dtos/secretariat/update-trainee.dto';
import { NotificationType } from '@shared/prisma';
import { CreateFileDto } from '../../dtos/File.create.dto';
import { CreateInternalMessageDto } from '../../dtos/InternalMessage.create.dto';

@Injectable()
export class SecretariatService {
    constructor(
        private prisma: PrismaService,
        private notificationsService: NotificationsService,
        private websocketGateway: WebsocketGateway,
        private filesService: FilesService,
    ) { }

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

    // لوحة التحكم
    async getDashboardStats() {
        const [
            totalStudents,
            activeCourses,
            todayMeetings,
            newNotifications,
            totalPayments,
        ] = await Promise.all([
            this.prisma.user.count({
                where: { role: 'STUDENT' },
            }),
            this.prisma.course.count({
                where: { status: 'ACTIVE' },
            }),
            this.prisma.trainingSchedule.count({
                where: {
                    startTime: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            }),
            this.prisma.notification.count({
                where: { read: false },
            }),
            this.prisma.payment.aggregate({
                _sum: { amount: true },
                where: {
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
            }),
        ]);

        return {
            totalStudents,
            activeCourses,
            todayMeetings,
            newNotifications,
            totalPayments: totalPayments._sum.amount || 0,
        };
    }

    // إدارة المتدربين
    async getTrainees(params: {
        skip?: number;
        take?: number;
        search?: string;
        status?: string;
    }) {
        const { skip, take, search, status } = params;
        const where = {
            ...(search && {
                OR: [
                    { user: { firstName: { contains: search } } },
                    { user: { lastName: { contains: search } } },
                    { user: { email: { contains: search } } },
                ],
            }),
            ...(status && { status }),
        };

        const [trainees, total] = await Promise.all([
            this.prisma.traineeManagement.findMany({
                where,
                skip,
                take,
                include: {
                    user: true,
                    enrollment: {
                        include: {
                            course: true,
                        },
                    },
                    documents: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.traineeManagement.count({ where }),
        ]);

        return {
            data: trainees,
            total,
        };
    }

    async getTraineeById(id: string) {
        return this.prisma.traineeManagement.findUnique({
            where: { id },
            include: {
                user: true,
                enrollment: {
                    include: {
                        course: true,
                    },
                },
                documents: true,
            },
        });
    }

    async updateTrainee(id: string, data: UpdateTraineeDto) {
        return this.prisma.traineeManagement.update({
            where: { id },
            data,
            include: {
                user: true,
                enrollment: {
                    include: {
                        course: true,
                    },
                },
            },
        });
    }

    // إدارة المواعيد
    async getSchedule(params: {
        startDate: Date;
        endDate: Date;
        type?: string;
    }) {
        const { startDate, endDate, type } = params;
        return this.prisma.trainingSchedule.findMany({
            where: {
                startTime: { gte: startDate },
                endTime: { lte: endDate },
                ...(type && { type }),
            },
            include: {
                course: true,
                participants: true,
            },
            orderBy: { startTime: 'asc' },
        });
    }

    async createSchedule(data: CreateTrainingScheduleDto) {
        let course = await this.prisma.course.findUnique({
            where: { id: data.courseId },
        });
        if (!course) {
            throw new NotFoundException(`Course with ID ${data.courseId} not found`);
        }
        let participants = await this.prisma.user.findMany({
            where: {
                enrollments: {
                    some: {
                        courseId: course.id,
                    },
                },
            },
        });
        const schedule = await this.prisma.trainingSchedule.create({
            data: {
                ...data,
                notifications: {
                    create: {
                        title: `موعد جديد: ${data.title}`,
                        message: data.description || 'لديك موعد جديد',
                        type: NotificationType.EVENT,
                        userId: participants[0].id,
                    },
                },
            },
            include: {
                course: true,
                participants: true,
            },
        });

        // إرسال إشعار في الوقت الفعلي
        this.websocketGateway.server.emit('newSchedule', schedule);

        return schedule;
    }

    // إدارة الدفعات
    async getPaymentLogs(params: {
        skip?: number;
        take?: number;
        startDate?: Date;
        endDate?: Date;
    }) {
        const { skip, take, startDate, endDate } = params;
        const where = {
            ...(startDate && endDate && {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            }),
        };

        const [logs, total] = await Promise.all([
            this.prisma.paymentLogBySecretary.findMany({
                where,
                skip,
                take,
                include: {
                    payment: {
                        include: {
                            user: true,
                        },
                    },
                    secretary: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.paymentLogBySecretary.count({ where }),
        ]);

        return {
            data: logs,
            total,
        };
    }

    async createPaymentLog(data: CreatePaymentLogBySecretaryDto) {
        return this.prisma.paymentLogBySecretary.create({
            data,
            include: {
                payment: {
                    include: {
                        user: true,
                    },
                },
                secretary: true,
            },
        });
    }

    // إدارة الملفات
    async getSecretaryFiles(params: {
        skip?: number;
        take?: number;
        category?: string;
        search?: string;
    }) {
        const { skip, take, category, search } = params;
        const where = {
            ...(category && { category }),
            ...(search && {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        };

        const [files, total] = await Promise.all([
            this.prisma.secretaryFiles.findMany({
                where,
                skip,
                take,
                include: {
                    file: true,
                    secretary: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.secretaryFiles.count({ where }),
        ]);

        return {
            data: files,
            total,
        };
    }

    async uploadFile(file: CreateFileDto, data: any) {
        const uploadedFile = await this.filesService.create(file);
        return this.prisma.secretaryFiles.create({
            data: {
                ...data,
                fileId: uploadedFile.id,
            },
            include: {
                file: true,
                secretary: true,
            },
        });
    }

    // إدارة الحضور
    async getEmployeeAttendance(params: {
        skip?: number;
        take?: number;
        startDate?: Date;
        endDate?: Date;
        status?: string;
    }) {
        const { skip, take, startDate, endDate, status } = params;
        const where = {
            ...(startDate && endDate && {
                checkIn: {
                    gte: startDate,
                    lte: endDate,
                },
            }),
            ...(status && { status }),
        };

        const [logs, total] = await Promise.all([
            this.prisma.employeeAttendanceLog.findMany({
                where,
                skip,
                take,
                include: {
                    employee: true,
                    secretary: true,
                },
                orderBy: { checkIn: 'desc' },
            }),
            this.prisma.employeeAttendanceLog.count({ where }),
        ]);

        return {
            data: logs,
            total,
        };
    }

    async createAttendanceLog(data: CreateEmployeeAttendanceLogDto) {
        return this.prisma.employeeAttendanceLog.create({
            data,
            include: {
                employee: true,
                secretary: true,
            },
        });
    }

    // الرسائل الداخلية
    async getInternalMessages(params: {
        skip?: number;
        take?: number;
        priority?: string;
        isRead?: boolean;
    }) {
        const { skip, take, priority, isRead } = params;
        const where = {
            ...(priority && { priority }),
            ...(isRead !== undefined && { isRead }),
        };

        const [messages, total] = await Promise.all([
            this.prisma.internalMessage.findMany({
                where,
                skip,
                take,
                include: {
                    sender: true,
                    recipients: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.internalMessage.count({ where }),
        ]);

        return {
            data: messages,
            total,
        };
    }

    async createInternalMessage(data: CreateInternalMessageDto) {
        const message = await this.prisma.internalMessage.create({
            data,
            include: {
                sender: true,
                recipients: true,
            },
        });

        // إرسال إشعار في الوقت الفعلي
        this.websocketGateway.server.emit('newInternalMessage', message);

        return message;
    }

    async markMessageAsRead(id: string) {
        return this.prisma.internalMessage.update({
            where: { id },
            data: { isRead: true },
            include: {
                sender: true,
                recipients: true,
            },
        });
    }
} 