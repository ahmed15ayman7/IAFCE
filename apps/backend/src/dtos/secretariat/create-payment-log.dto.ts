import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePaymentLogDto {
    @ApiProperty({ description: 'معرف الدفعة' })
    @IsString()
    paymentId: string;

    @ApiProperty({ description: 'ملاحظات', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 