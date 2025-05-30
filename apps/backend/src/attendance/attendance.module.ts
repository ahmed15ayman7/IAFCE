import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { AttendanceController } from './attendance.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [NotificationsModule, PrismaModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AttendanceController],
    providers: [AttendanceService],
    exports: [AttendanceService]
})
export class AttendanceModule { } 