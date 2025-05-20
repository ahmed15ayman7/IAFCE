import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsResolver } from './enrollments.resolver';
@Module({
    imports: [PrismaModule],
    controllers: [EnrollmentsController],
    providers: [EnrollmentsService],
    exports: [EnrollmentsService]
})
export class EnrollmentsModule { } 