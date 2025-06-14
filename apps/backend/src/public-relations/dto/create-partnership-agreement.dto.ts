import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';

export enum PartnershipType {
    LOCAL = 'LOCAL',
    INTERNATIONAL = 'INTERNATIONAL',
    ACADEMIC = 'ACADEMIC',
    COMMUNITY = 'COMMUNITY',
}

export class CreatePartnershipAgreementDto {
    @ApiProperty({ description: 'اسم الشريك' })
    @IsString()
    partnerName: string;

    @ApiProperty({ description: 'وصف الشراكة' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'شعار الشريك', required: false })
    @IsString()
    @IsOptional()
    logo?: string;

    @ApiProperty({ enum: PartnershipType, description: 'نوع الشراكة' })
    @IsEnum(PartnershipType)
    type: PartnershipType;

    @ApiProperty({ description: 'تاريخ بداية الشراكة' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية الشراكة', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'معرف الأكاديمية' })
    @IsString()
    academyId: string;
} 