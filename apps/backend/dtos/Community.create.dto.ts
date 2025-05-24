import { ApiProperty } from "@nestjs/swagger";
import { Group, LiveRoom, User, Post, Discussion } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Community
export class CreateCommunityDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

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
