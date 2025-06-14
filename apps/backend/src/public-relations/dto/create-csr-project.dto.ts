import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsArray, IsEnum } from 'class-validator';

export enum CSRProjectStatus {
    PLANNED = 'PLANNED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

export class CreateCSRProjectDto {
    @ApiProperty({ description: 'عنوان المشروع' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'وصف المشروع' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'تاريخ بداية المشروع' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تأثير المشروع' })
    @IsString()
    impact: string;

    @ApiProperty({ enum: CSRProjectStatus, description: 'حالة المشروع' })
    @IsEnum(CSRProjectStatus)
    status: CSRProjectStatus;

    @ApiProperty({ description: 'صور المشروع', type: [String] })
    @IsArray()
    @IsString({ each: true })
    images: string[];

    @ApiProperty({ description: 'معرف الأكاديمية' })
    @IsString()
    academyId: string;
} 