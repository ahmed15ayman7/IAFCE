import { Module } from '@nestjs/common';
import { AcademiesService } from './academies.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { AcademiesController } from './academies.controller';
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
    controllers: [AcademiesController],
    providers: [AcademiesService],
    exports: [AcademiesService],
})
export class AcademiesModule { } 