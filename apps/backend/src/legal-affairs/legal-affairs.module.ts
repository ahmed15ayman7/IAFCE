import { Module } from '@nestjs/common';
import { LegalAffairsService } from './legal-affairs.service';
import { LegalAffairsController } from './legal-affairs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '../notifications/notifications.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { UsersModule } from '../users/users.module';
import { FilesModule } from '../files/files.module';

@Module({
    imports: [
        PrismaModule,
        NotificationsModule,
        WebsocketModule,
        UsersModule,
        FilesModule,
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
    controllers: [LegalAffairsController],
    providers: [LegalAffairsService],
    exports: [LegalAffairsService],
})
export class LegalAffairsModule { } 