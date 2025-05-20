import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { CommentEntity } from "./Comment.entity";
import { GroupEntity } from "./Group.entity";
import { User, Comment, Group } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Post
export class PostEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: authorId, Type: string
  @Column()
  authorId: string;

  @ApiProperty({ type: UserEntity })
  // Field: author, Type: User
  @Column()
  author: User;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "number" })
  // Field: likesCount, Type: number
  @Column()
  likesCount: number;

  @ApiProperty({ type: CommentEntity })
  // Field: comments, Type: Comment[]
  @Column()
  comments: Comment[];

  @ApiProperty({ type: GroupEntity })
  // Field: Group, Type: Group[]
  @Column()
  Group: Group[];
}
