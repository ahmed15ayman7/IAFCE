import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { BadgesController } from './badges.controller';

@Module({
    imports: [PrismaModule],
    controllers: [BadgesController],
    providers: [BadgesService],
    exports: [BadgesService],
})
export class BadgesModule { } 