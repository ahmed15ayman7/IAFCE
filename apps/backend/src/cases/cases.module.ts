import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { FilesModule } from '../files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PrismaModule,
        NotificationsModule,
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
    controllers: [CasesController],
    providers: [CasesService],
    exports: [CasesService],
})
export class CasesModule { } 