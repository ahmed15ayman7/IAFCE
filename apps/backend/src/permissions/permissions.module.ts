import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesModule } from '../roles/roles.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        PrismaModule,
        RolesModule,
        NotificationsModule, JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [PermissionsController],
    providers: [PermissionsService],
    exports: [PermissionsService],
})
export class PermissionsModule { } 