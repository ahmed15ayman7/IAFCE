import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsResolver } from './lessons.resolver';
import { PrismaModule } from '@/prisma/prisma.module';
import { LessonsController } from './lessons.controller';

@Module({
    imports: [PrismaModule],
    controllers: [LessonsController],
    providers: [LessonsService],
    exports: [LessonsService],
})
export class LessonsModule { } 