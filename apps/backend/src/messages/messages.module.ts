import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from '@/prisma/prisma.module';
@Module({
    imports: [PrismaModule],
    controllers: [MessagesController],
    providers: [MessagesService],
    exports: [MessagesService]
})
export class MessagesModule { } 