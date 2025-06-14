import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PublicRelationsService } from './public-relations.service';
import { CreateMediaAlertDto } from '../../dtos/MediaAlert.create.dto';
import { CreatePartnershipAgreementDto } from '../../dtos/PartnershipAgreement.create.dto';
import { CreateCSRProjectDto } from '../../dtos/CSRProject.create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('العلاقات العامة')
@Controller('public-relations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PublicRelationsController {
    constructor(private readonly prService: PublicRelationsService) { }

    // Media Alerts
    @Post('alerts')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'إنشاء تنبيه إعلامي جديد' })
    createMediaAlert(@Body() dto: CreateMediaAlertDto) {
        return this.prService.createMediaAlert(dto);
    }

    @Get('alerts')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على التنبيهات الإعلامية' })
    getMediaAlerts(@Query('academyId') academyId: string) {
        return this.prService.getMediaAlerts(academyId);
    }

    @Get('alerts/source/:sourceType/:sourceId')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على التنبيهات حسب المصدر' })
    getMediaAlertsBySource(
        @Param('sourceType') sourceType: string,
        @Param('sourceId') sourceId: string,
    ) {
        return this.prService.getMediaAlertsBySource(sourceType, sourceId);
    }

    // Partnership Agreements
    @Post('partnerships')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'إنشاء اتفاقية شراكة جديدة' })
    createPartnershipAgreement(@Body() dto: CreatePartnershipAgreementDto) {
        return this.prService.createPartnershipAgreement(dto);
    }

    @Get('partnerships')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على اتفاقيات الشراكة' })
    getPartnershipAgreements(@Query('academyId') academyId: string) {
        return this.prService.getPartnershipAgreements(academyId);
    }

    @Get('partnerships/active')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على الشراكات النشطة' })
    getActivePartnerships(@Query('academyId') academyId: string) {
        return this.prService.getActivePartnerships(academyId);
    }

    // CSR Projects
    @Post('csr-projects')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'إنشاء مشروع مسؤولية مجتمعية جديد' })
    createCSRProject(@Body() dto: CreateCSRProjectDto) {
        return this.prService.createCSRProject(dto);
    }

    @Get('csr-projects')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على مشاريع المسؤولية المجتمعية' })
    getCSRProjects(@Query('academyId') academyId: string) {
        return this.prService.getCSRProjects(academyId);
    }

    @Get('csr-projects/status/:status')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على مشاريع المسؤولية المجتمعية حسب الحالة' })
    getCSRProjectsByStatus(
        @Query('academyId') academyId: string,
        @Param('status') status: string,
    ) {
        return this.prService.getCSRProjectsByStatus(academyId, status);
    }

    // Analytics
    @Get('analytics/media')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على تحليلات الوسائط' })
    getMediaAnalytics(@Query('academyId') academyId: string) {
        return this.prService.getMediaAnalytics(academyId);
    }

    @Get('analytics/partnerships')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على تحليلات الشراكات' })
    getPartnershipAnalytics(@Query('academyId') academyId: string) {
        return this.prService.getPartnershipAnalytics(academyId);
    }

    @Get('analytics/csr')
    // @Roles('ADMIN', 'PUBLIC_RELATIONS')
    @ApiOperation({ summary: 'الحصول على تحليلات المسؤولية المجتمعية' })
    getCSRAnalytics(@Query('academyId') academyId: string) {
        return this.prService.getCSRAnalytics(academyId);
    }
} 