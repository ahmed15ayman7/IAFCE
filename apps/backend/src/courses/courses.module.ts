import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { CoursesResolver } from './courses.resolver';
@Module({
    imports: [PrismaModule],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports: [CoursesService],
})
export class CoursesModule { } 