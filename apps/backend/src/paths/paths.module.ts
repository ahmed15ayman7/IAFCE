import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { PathsController } from './paths.controller';
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
    controllers: [PathsController],
    providers: [PathsService],
    exports: [PathsService],
})
export class PathsModule { } 