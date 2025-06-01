import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '../notifications/notifications.module';
import { ReportsModule } from '../reports/reports.module';
import { PaymentsModule } from '../payments/payments.module';
import { FilesModule } from '../files/files.module';

@Module({
    imports: [
        PrismaModule,
        NotificationsModule,
        ReportsModule,
        PaymentsModule,
        FilesModule,
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
    controllers: [AccountingController],
    providers: [AccountingService],
    exports: [AccountingService],
})
export class AccountingModule { } 