import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum TraineeStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    COMPLETED = 'COMPLETED',
}

export class UpdateTraineeDto {
    @ApiProperty({ description: 'ملاحظات', required: false })
    @IsString()
    @IsOptional()
    notes?: string;

    @ApiProperty({ description: 'الحالة', enum: TraineeStatus })
    @IsEnum(TraineeStatus)
    @IsOptional()
    status?: TraineeStatus;
} 