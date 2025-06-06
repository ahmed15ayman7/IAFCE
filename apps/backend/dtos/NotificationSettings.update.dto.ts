import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for NotificationSettings
export class UpdateNotificationSettingsDto {
  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: "boolean" })
  // Field: assignments, Type: boolean
  @Column()
  assignments: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: grades, Type: boolean
  @Column()
  grades: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: messages, Type: boolean
  @Column()
  messages: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: achievements, Type: boolean
  @Column()
  achievements: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: urgent, Type: boolean
  @Column()
  urgent: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: email, Type: boolean
  @Column()
  email: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: push, Type: boolean
  @Column()
  push: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
