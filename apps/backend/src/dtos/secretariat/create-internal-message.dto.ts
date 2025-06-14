import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsEnum, IsOptional } from 'class-validator';

export enum MessagePriority {
    HIGH = 'HIGH',
    NORMAL = 'NORMAL',
    LOW = 'LOW',
}

export class CreateInternalMessageDto {
    @ApiProperty({ description: 'عنوان الرسالة' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'محتوى الرسالة' })
    @IsString()
    content: string;

    @ApiProperty({ description: 'معرفات المستلمين' })
    @IsArray()
    @IsString({ each: true })
    recipients: string[];

    @ApiProperty({ description: 'الأولوية', enum: MessagePriority, default: MessagePriority.NORMAL })
    @IsEnum(MessagePriority)
    @IsOptional()
    priority?: MessagePriority = MessagePriority.NORMAL;
} 