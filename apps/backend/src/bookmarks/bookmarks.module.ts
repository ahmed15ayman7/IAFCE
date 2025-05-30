import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { BookmarksController } from './bookmarks.controller';
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
    controllers: [BookmarksController],
    providers: [BookmarksService],
    exports: [BookmarksService]
})
export class BookmarksModule { } 