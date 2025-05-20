import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { ChannelsResolver } from './channels.resolver';
@Module({
    imports: [PrismaModule],
    controllers: [ChannelsController],
    providers: [ChannelsService],
    exports: [ChannelsService],
})
export class ChannelsModule { } 