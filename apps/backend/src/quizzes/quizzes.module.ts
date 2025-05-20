import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesResolver } from './quizzes.resolver';
import { PrismaModule } from '@/prisma/prisma.module';
import { QuizzesController } from './quizzes.controller';

@Module({
    imports: [PrismaModule],
    controllers: [QuizzesController],
    providers: [QuizzesService],
    exports: [QuizzesService],
})
export class QuizzesModule { } 