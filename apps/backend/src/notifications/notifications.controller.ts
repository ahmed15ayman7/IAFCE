import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from 'dtos/Notification.create.dto';
import { UpdateNotificationDto } from 'dtos/Notification.update.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Notification } from '@shared/prisma';
@ApiTags('الإشعارات')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إشعار جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الإشعار بنجاح' })
    create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationsService.create(createNotificationDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب الإشعارات بنجاح' })
    findAll(): Promise<Notification[]> {
        return this.notificationsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الإشعار بنجاح' })
    findOne(@Param('id') id: string) {
        return this.notificationsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إشعار' })
    @ApiResponse({ status: 200, description: 'تم تحديث الإشعار بنجاح' })
    update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
        return this.notificationsService.update(id, updateNotificationDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إشعار' })
    @ApiResponse({ status: 200, description: 'تم حذف الإشعار بنجاح' })
    remove(@Param('id') id: string) {
        return this.notificationsService.remove(id);
    }
} 