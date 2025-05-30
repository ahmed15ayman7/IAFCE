import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { CertificateController } from './certificate.controller';
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
    controllers: [CertificateController],
    providers: [CertificateService],
    exports: [CertificateService],
})
export class CertificateModule { } 