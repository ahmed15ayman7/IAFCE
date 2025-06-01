import { ApiProperty } from "@nestjs/swagger";
import { AdminEntity } from "./Admin.entity";
import { AcademyEntity } from "./Academy.entity";
import { MeetingParticipantEntity } from "./MeetingParticipant.entity";
import { FileEntity } from "./File.entity";
import { ReportEntity } from "./Report.entity";
import { ChannelEntity } from "./Channel.entity";
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
// This is the  Entity for Meeting
export class MeetingDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

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

  @ApiProperty({ type: "string", nullable: true })
  // Field: notes, Type: string
  @Column()
  notes?: string;

  @ApiProperty({ type: "string" })
  // Field: createdByAdminId, Type: string
  @Column()
  createdByAdminId: string;

  @ApiProperty({ type: AdminEntity })
  // Field: createdByAdmin, Type: Admin
  @Column()
  createdByAdmin: Admin;

  @ApiProperty({ type: "string" })
  // Field: academyId, Type: string
  @Column()
  academyId: string;

  @ApiProperty({ type: AcademyEntity })
  // Field: academy, Type: Academy
  @Column()
  academy: Academy;

  @ApiProperty({ type: MeetingParticipantEntity })
  // Field: participants, Type: MeetingParticipant[]
  @Column()
  participants: MeetingParticipant[];

  @ApiProperty({ type: FileEntity })
  // Field: files, Type: File[]
  @Column()
  files: File[];

  @ApiProperty({ type: ReportEntity })
  // Field: reports, Type: Report[]
  @Column()
  reports: Report[];

  @ApiProperty({ type: ChannelEntity })
  // Field: channels, Type: Channel[]
  @Column()
  channels: Channel[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
