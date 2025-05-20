import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsResolver } from './achievements.resolver';
import { PrismaModule } from '@/prisma/prisma.module';
import { AchievementsController } from './achievements.controller';

@Module({
    imports: [PrismaModule],
    controllers: [AchievementsController],
    providers: [AchievementsService],
    exports: [AchievementsService],
})
export class AchievementsModule { } 