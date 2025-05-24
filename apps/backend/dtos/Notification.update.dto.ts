import { ApiProperty } from "@nestjs/swagger";
import { User, NotificationType } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Notification
export class UpdateNotificationDto {
  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ enum: NotificationType })
  // Field: type, Type: NotificationType
  @Column()
  type: NotificationType;

  @ApiProperty({ type: "string" })
  // Field: message, Type: string
  @Column()
  message: string;

  @ApiProperty({ type: "boolean" })
  // Field: isImportant, Type: boolean
  @Column()
  isImportant: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: urgent, Type: boolean
  @Column()
  urgent: boolean;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: actionUrl, Type: string
  @Column()
  actionUrl?: string;

  @ApiProperty({ type: "boolean" })
  // Field: read, Type: boolean
  @Column()
  read: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
