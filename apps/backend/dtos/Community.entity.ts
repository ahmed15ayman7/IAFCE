import { ApiProperty } from "@nestjs/swagger";
import { GroupEntity } from "./Group.entity";
import { LiveRoomEntity } from "./LiveRoom.entity";
import { UserEntity } from "./User.entity";
import { PostEntity } from "./Post.entity";
import { DiscussionEntity } from "./Discussion.entity";
import { Group, LiveRoom, User, Post, Discussion } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Community
export class CommunityEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ type: GroupEntity })
  // Field: groups, Type: Group[]
  @Column()
  groups: Group[];

  @ApiProperty({ type: LiveRoomEntity })
  // Field: liveRoom, Type: LiveRoom[]
  @Column()
  liveRoom: LiveRoom[];

  @ApiProperty({ type: UserEntity })
  // Field: participants, Type: User[]
  @Column()
  participants: User[];

  @ApiProperty({ type: PostEntity })
  // Field: posts, Type: Post[]
  @Column()
  posts: Post[];

  @ApiProperty({ type: DiscussionEntity })
  // Field: discussions, Type: Discussion[]
  @Column()
  discussions: Discussion[];

  @ApiProperty({ type: "number" })
  // Field: likes, Type: number
  @Column()
  likes: number;

  @ApiProperty({ type: "number" })
  // Field: dislikes, Type: number
  @Column()
  dislikes: number;

  @ApiProperty({ type: "number" })
  // Field: views, Type: number
  @Column()
  views: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
