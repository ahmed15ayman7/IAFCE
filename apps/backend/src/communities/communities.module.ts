import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { CommunitiesController } from './communities.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
    controllers: [CommunitiesController],
    providers: [CommunitiesService],
    exports: [CommunitiesService],
})
export class CommunitiesModule { } 