import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { ChannelEntity } from "./Channel.entity";
import { User, Channel } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Message
export class MessageEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: senderId, Type: string
  @Column()
  senderId: string;

  @ApiProperty({ type: UserEntity })
  // Field: sender, Type: User
  @Column()
  sender: User;

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

  @ApiProperty({ type: ChannelEntity })
  // Field: Channel, Type: Channel[]
  @Column()
  Channel: Channel[];
}
