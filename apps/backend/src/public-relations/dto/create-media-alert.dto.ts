import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsBoolean, IsEnum } from 'class-validator';

export enum SourceType {
    COURSE = 'COURSE',
    EVENT = 'EVENT',
    INTERNAL = 'INTERNAL',
}

export class CreateMediaAlertDto {
    @ApiProperty({ description: 'عنوان التنبيه' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'تاريخ التنبيه' })
    @IsDate()
    triggerDate: Date;

    @ApiProperty({ enum: SourceType, description: 'نوع المصدر' })
    @IsEnum(SourceType)
    sourceType: SourceType;

    @ApiProperty({ description: 'معرف المصدر' })
    @IsString()
    sourceId: string;

    @ApiProperty({ description: 'حالة التنبيه' })
    @IsBoolean()
    generated: boolean;

    @ApiProperty({ description: 'معرف الأكاديمية' })
    @IsString()
    academyId: string;
} 