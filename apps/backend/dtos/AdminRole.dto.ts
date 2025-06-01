import { ApiProperty } from "@nestjs/swagger";
import { AdminAssignmentEntity } from "./AdminAssignment.entity";
import { ReportEntity } from "./Report.entity";
import { FileEntity } from "./File.entity";
import { EventEntity } from "./Event.entity";
import { ChannelEntity } from "./Channel.entity";
import {
  AdminRoleType,
  AdminAssignment,
  Report,
  File,
  Event,
  Channel,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for AdminRole
export class AdminRoleDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ enum: AdminRoleType })
  // Field: name, Type: AdminRoleType
  @Column()
  name: AdminRoleType;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: AdminAssignmentEntity })
  // Field: assignments, Type: AdminAssignment[]
  @Column()
  assignments: AdminAssignment[];

  @ApiProperty({ type: ReportEntity })
  // Field: reports, Type: Report[]
  @Column()
  reports: Report[];

  @ApiProperty({ type: FileEntity })
  // Field: files, Type: File[]
  @Column()
  files: File[];

  @ApiProperty({ type: EventEntity })
  // Field: events, Type: Event[]
  @Column()
  events: Event[];

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
