import { ApiProperty } from "@nestjs/swagger";
import { User, Channel } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Message
export class UpdateMessageDto {
  @ApiProperty({ type: "string" })
  // Field: senderId, Type: string
  @Column()
  senderId: string;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "boolean" })
  // Field: isRead, Type: boolean
  @Column()
  isRead: boolean;
}
