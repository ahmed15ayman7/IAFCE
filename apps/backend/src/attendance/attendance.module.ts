import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceResolver } from './attendance.resolver';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { AttendanceController } from './attendance.controller';
@Module({
    imports: [NotificationsModule, PrismaModule],
    controllers: [AttendanceController],
    providers: [AttendanceService],
    exports: [AttendanceService]
})
export class AttendanceModule { } 