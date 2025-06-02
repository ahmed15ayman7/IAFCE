import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        PrismaModule,
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
    providers: [AdminAuthService],
    controllers: [AdminAuthController],
    exports: [AdminAuthService],
})
export class AdminAuthModule { } 