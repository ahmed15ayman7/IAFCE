import { ApiProperty } from "@nestjs/swagger";
import { Community, Post } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Discussion
export class UpdateDiscussionDto {
  @ApiProperty({ type: "string" })
  // Field: communityId, Type: string
  @Column()
  communityId: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: postId, Type: string
  @Column()
  postId?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
