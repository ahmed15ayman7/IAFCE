import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum, IsArray, IsOptional } from 'class-validator';

export enum ScheduleType {
    CLASS = 'CLASS',
    MEETING = 'MEETING',
    EXAM = 'EXAM',
}

export class CreateScheduleDto {
    @ApiProperty({ description: 'عنوان الموعد' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'وصف الموعد', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'وقت البدء' })
    @IsDate()
    startTime: Date;

    @ApiProperty({ description: 'وقت الانتهاء' })
    @IsDate()
    endTime: Date;

    @ApiProperty({ description: 'نوع الموعد', enum: ScheduleType })
    @IsEnum(ScheduleType)
    type: ScheduleType;

    @ApiProperty({ description: 'معرف الدورة', required: false })
    @IsString()
    @IsOptional()
    courseId?: string;

    @ApiProperty({ description: 'الموقع', required: false })
    @IsString()
    @IsOptional()
    location?: string;

    @ApiProperty({ description: 'معرفات المشاركين' })
    @IsArray()
    @IsString({ each: true })
    participants: string[];
} 