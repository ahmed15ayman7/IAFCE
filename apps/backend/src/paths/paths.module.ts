import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { PathsController } from './paths.controller';

@Module({
    imports: [PrismaModule],
    controllers: [PathsController],
    providers: [PathsService],
    exports: [PathsService],
})
export class PathsModule { } 