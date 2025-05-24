import { ApiProperty } from "@nestjs/swagger";
import { CommunityEntity } from "./Community.entity";
import { PostEntity } from "./Post.entity";
import { Community, Post } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Discussion
export class DiscussionDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: communityId, Type: string
  @Column()
  communityId: string;

  @ApiProperty({ type: CommunityEntity })
  // Field: community, Type: Community
  @Column()
  community: Community;

  @ApiProperty({ type: "string", nullable: true })
  // Field: postId, Type: string
  @Column()
  postId?: string;

  @ApiProperty({ type: PostEntity, nullable: true })
  // Field: post, Type: Post
  @Column()
  post?: Post;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
