import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { CertificateController } from './certificate.controller';

@Module({
    imports: [PrismaModule],
    controllers: [CertificateController],
    providers: [CertificateService],
    exports: [CertificateService],
})
export class CertificateModule { } 