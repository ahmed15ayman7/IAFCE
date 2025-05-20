import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { EventsController } from './events.controller';
import { EventsResolver } from './events.resolver';
@Module({
    imports: [PrismaModule],
    controllers: [EventsController],
    providers: [EventsService],
    exports: [EventsService]
})
export class EventsModule { } 