import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { OwnerEntity } from "./Owner.entity";
import { MessageEntity } from "./Message.entity";
import { User, Owner, Message } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Channel
export class ChannelEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: UserEntity })
  // Field: members, Type: User[]
  @Column()
  members: User[];

  @ApiProperty({ type: "string" })
  // Field: ownerId, Type: string
  @Column()
  ownerId: string;

  @ApiProperty({ type: OwnerEntity })
  // Field: owner, Type: Owner
  @Column()
  owner: Owner;

  @ApiProperty({ type: MessageEntity })
  // Field: messages, Type: Message[]
  @Column()
  messages: Message[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
