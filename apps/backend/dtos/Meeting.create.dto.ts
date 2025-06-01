import { ApiProperty } from "@nestjs/swagger";
import {
  Admin,
  Academy,
  MeetingParticipant,
  File,
  Report,
  Channel,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Meeting
export class CreateMeetingDto {
  @ApiProperty({ type: "string" })
  // Field: meetingTitle, Type: string
  @Column()
  meetingTitle: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: meetingDate, Type: Date
  @Column()
  meetingDate: Date;

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location: string;

  @ApiProperty({ type: "string" })
  // Field: notes, Type: string
  @Column()
  notes?: string;

  @ApiProperty({ type: "string" })
  // Field: createdByAdminId, Type: string
  @Column()
  createdByAdminId: string;

  @ApiProperty({ type: "string" })
  // Field: academyId, Type: string
  @Column()
  academyId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
