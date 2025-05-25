import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { CommunitiesController } from './communities.controller';

@Module({
    imports: [PrismaModule],
    controllers: [CommunitiesController],
    providers: [CommunitiesService],
    exports: [CommunitiesService],
})
export class CommunitiesModule { } 