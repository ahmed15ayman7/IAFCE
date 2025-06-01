import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  AccountingEntry,
  Meeting,
  AdminRole,
  LegalCase,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Report
export class UpdateReportDto {
  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: accountingEntryId, Type: string
  @Column()
  accountingEntryId?: string;

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
