import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FilesModule } from '../files/files.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        PrismaModule,
        FilesModule,
        NotificationsModule,
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
    controllers: [DocumentsController],
    providers: [DocumentsService],
    exports: [DocumentsService],
})
export class DocumentsModule { } 