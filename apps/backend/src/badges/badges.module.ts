import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { BadgesController } from './badges.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [PrismaModule,
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
    controllers: [BadgesController],
    providers: [BadgesService],
    exports: [BadgesService],
})
export class BadgesModule { } 