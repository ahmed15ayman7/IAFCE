import { ApiProperty } from "@nestjs/swagger";
import { MeetingEntity } from "./Meeting.entity";
import { UserEntity } from "./User.entity";
import { Meeting, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for MeetingParticipant
export class MeetingParticipantEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: meetingId, Type: string
  @Column()
  meetingId: string;

  @ApiProperty({ type: MeetingEntity })
  // Field: meeting, Type: Meeting
  @Column()
  meeting: Meeting;

  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "boolean" })
  // Field: isAttended, Type: boolean
  @Column()
  isAttended: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
