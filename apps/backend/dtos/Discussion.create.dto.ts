import { ApiProperty } from "@nestjs/swagger";
import { Community, Post } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Discussion
export class CreateDiscussionDto {
  @ApiProperty({ type: "string" })
  // Field: communityId, Type: string
  @Column()
  communityId: string;

  @ApiProperty({ type: "string" })
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
