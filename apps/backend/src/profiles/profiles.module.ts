import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProfilesController } from './profiles.controller';
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
    controllers: [ProfilesController],
    providers: [ProfilesService],
    exports: [ProfilesService]
})
export class ProfilesModule { } 