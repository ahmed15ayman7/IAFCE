import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { ChannelEntity } from "./Channel.entity";
import { User, Channel } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Owner
export class OwnerEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: ChannelEntity })
  // Field: Channel, Type: Channel[]
  @Column()
  Channel: Channel[];
}
