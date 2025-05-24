import { ApiProperty } from "@nestjs/swagger";
import { Community, User, Course } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for LiveRoom
export class UpdateLiveRoomDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: topic, Type: string
  @Column()
  topic?: string;

  @ApiProperty({ type: "number" })
  // Field: participants, Type: number
  @Column()
  participants: number;

  @ApiProperty({ type: "boolean" })
  // Field: isLive, Type: boolean
  @Column()
  isLive: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isActive, Type: boolean
  @Column()
  isActive: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isPublic, Type: boolean
  @Column()
  isPublic: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isPrivate, Type: boolean
  @Column()
  isPrivate: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isPasswordProtected, Type: boolean
  @Column()
  isPasswordProtected: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: "string" })
  // Field: communityId, Type: string
  @Column()
  communityId: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: courseId, Type: string
  @Column()
  courseId?: string;
}
