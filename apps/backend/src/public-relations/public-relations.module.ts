import { Module } from '@nestjs/common';
import { PublicRelationsService } from './public-relations.service';
import { PublicRelationsController } from './public-relations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from '../notifications/notifications.module';
import { AboutSectionController } from './controllers/about-section.controller';
import { NewsEventController } from './controllers/news-event.controller';
import { TestimonialController } from './controllers/testimonial.controller';
import { ContactMessageController } from './controllers/contact-message.controller';
import { FaqController } from './controllers/faq.controller';
import { AboutSectionService } from './services/about-section.service';
import { NewsEventService } from './services/news-event.service';
import { TestimonialService } from './services/testimonial.service';
import { ContactMessageService } from './services/contact-message.service';
import { FaqService } from './services/faq.service';

@Module({
    imports: [
        PrismaModule,
        NotificationsModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_ACCESS_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [
        PublicRelationsController,
        AboutSectionController,
        NewsEventController,
        TestimonialController,
        ContactMessageController,
        FaqController,
    ],
    providers: [
        PublicRelationsService,
        AboutSectionService,
        NewsEventService,
        TestimonialService,
        ContactMessageService,
        FaqService,
    ],
    exports: [
        PublicRelationsService,
        AboutSectionService,
        NewsEventService,
        TestimonialService,
        ContactMessageService,
        FaqService,
    ],
})
export class PublicRelationsModule { } 