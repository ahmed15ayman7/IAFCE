import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { PostEntity } from "./Post.entity";
import { AdminEntity } from "./Admin.entity";
import { User, Post, Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Group
export class GroupDto {
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
  // Field: adminId, Type: string
  @Column()
  adminId: string;

  @ApiProperty({ type: PostEntity })
  // Field: posts, Type: Post[]
  @Column()
  posts: Post[];

  @ApiProperty({ type: AdminEntity })
  // Field: admin, Type: Admin
  @Column()
  admin: Admin;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
