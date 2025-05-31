import { Module } from '@nestjs/common';
import { AdministrationService } from './administration.service';
import { AdministrationController } from './administration.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '../notifications/notifications.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        PrismaModule,
        NotificationsModule,
        WebsocketModule,
        UsersModule,
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
    controllers: [AdministrationController],
    providers: [AdministrationService],
    exports: [AdministrationService],
})
export class AdministrationModule { } 