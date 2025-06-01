import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  Owner,
  Message,
  PublicRelationsRecord,
  Meeting,
  AdminRole,
  LegalCase,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Channel
export class UpdateChannelDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: ownerId, Type: string
  @Column()
  ownerId: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: prRecordId, Type: string
  @Column()
  prRecordId?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: meetingId, Type: string
  @Column()
  meetingId?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: adminRoleId, Type: string
  @Column()
  adminRoleId?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: legalCaseId, Type: string
  @Column()
  legalCaseId?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
