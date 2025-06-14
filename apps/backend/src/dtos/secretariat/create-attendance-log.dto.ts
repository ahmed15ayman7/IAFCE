import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum, IsOptional } from 'class-validator';

export enum AttendanceStatus {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    LATE = 'LATE',
}

export class CreateAttendanceLogDto {
    @ApiProperty({ description: 'معرف الموظف' })
    @IsString()
    employeeId: string;

    @ApiProperty({ description: 'وقت الحضور' })
    @IsDate()
    checkIn: Date;

    @ApiProperty({ description: 'وقت الانصراف', required: false })
    @IsDate()
    @IsOptional()
    checkOut?: Date;

    @ApiProperty({ description: 'الحالة', enum: AttendanceStatus })
    @IsEnum(AttendanceStatus)
    status: AttendanceStatus;

    @ApiProperty({ description: 'ملاحظات', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 