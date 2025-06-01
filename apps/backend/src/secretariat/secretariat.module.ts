import { Module } from '@nestjs/common';
import { SecretariatService } from './secretariat.service';
import { SecretariatController } from './secretariat.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '../notifications/notifications.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { FilesModule } from '../files/files.module';


@Module({
    imports: [
        PrismaModule,
        NotificationsModule,
        WebsocketModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
                },
            }),
            inject: [ConfigService],
        }),

        FilesModule,
    ],
    controllers: [SecretariatController],
    providers: [SecretariatService],
    exports: [SecretariatService],
})
export class SecretariatModule { } 