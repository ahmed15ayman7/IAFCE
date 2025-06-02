import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { EventsModule } from '../events/events.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PrismaModule,
        NotificationsModule,
        EventsModule,
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
    controllers: [CalendarController],
    providers: [CalendarService],
    exports: [CalendarService],
})
export class CalendarModule { } 