import { Module } from '@nestjs/common';
import { PublicRelationsService } from './public-relations.service';
import { PublicRelationsController } from './public-relations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [
        PrismaModule,
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
    controllers: [PublicRelationsController],
    providers: [PublicRelationsService],
    exports: [PublicRelationsService],
})
export class PublicRelationsModule { } 