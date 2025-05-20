import { Module } from '@nestjs/common';
import { AcademiesService } from './academies.service';
import { AcademiesResolver } from './academies.resolver';
import { PrismaModule } from '@/prisma/prisma.module';
import { AcademiesController } from './academies.controller';

@Module({
    imports: [PrismaModule],
    controllers: [AcademiesController],
    providers: [AcademiesService],
    exports: [AcademiesService],
})
export class AcademiesModule { } 