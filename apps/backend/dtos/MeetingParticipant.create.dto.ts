import { ApiProperty } from "@nestjs/swagger";
import { Meeting, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for MeetingParticipant
export class CreateMeetingParticipantDto {
  @ApiProperty({ type: "string" })
  // Field: meetingId, Type: string
  @Column()
  meetingId: string;

  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

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
