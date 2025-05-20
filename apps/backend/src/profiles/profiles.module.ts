import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { PrismaModule } from '@/prisma/prisma.module';
import { ProfilesController } from './profiles.controller';

@Module({
    imports: [PrismaModule],
    controllers: [ProfilesController],
    providers: [ProfilesService],
    exports: [ProfilesService]
})
export class ProfilesModule { } 