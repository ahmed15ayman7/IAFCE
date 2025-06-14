import { Module } from '@nestjs/common';
import { SecretariatController } from './secretariat.controller';
import { SecretariatService } from './secretariat.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsModule } from '../notifications/notifications.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { FilesModule } from '../files/files.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '1d' },
            }),
            inject: [ConfigService],
        }),
        NotificationsModule,
        WebsocketModule,
        FilesModule,
    ],
    controllers: [SecretariatController],
    providers: [SecretariatService, PrismaService],
    exports: [SecretariatService],
})
export class SecretariatModule { } 