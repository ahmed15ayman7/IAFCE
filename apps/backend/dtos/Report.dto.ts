import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { AccountingEntryEntity } from "./AccountingEntry.entity";
import { MeetingEntity } from "./Meeting.entity";
import { AdminRoleEntity } from "./AdminRole.entity";
import { LegalCaseEntity } from "./LegalCase.entity";
import {
  User,
  AccountingEntry,
  Meeting,
  AdminRole,
  LegalCase,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Report
export class ReportDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "string", nullable: true })
  // Field: accountingEntryId, Type: string
  @Column()
  accountingEntryId?: string;

  @ApiProperty({ type: AccountingEntryEntity, nullable: true })
  // Field: accountingEntry, Type: AccountingEntry
  @Column()
  accountingEntry?: AccountingEntry;

  @ApiProperty({ type: "string", nullable: true })
  // Field: meetingId, Type: string
  @Column()
  meetingId?: string;

  @ApiProperty({ type: MeetingEntity, nullable: true })
  // Field: meeting, Type: Meeting
  @Column()
  meeting?: Meeting;

  @ApiProperty({ type: "string", nullable: true })
  // Field: adminRoleId, Type: string
  @Column()
  adminRoleId?: string;

  @ApiProperty({ type: AdminRoleEntity, nullable: true })
  // Field: adminRole, Type: AdminRole
  @Column()
  adminRole?: AdminRole;

  @ApiProperty({ type: "string", nullable: true })
  // Field: legalCaseId, Type: string
  @Column()
  legalCaseId?: string;

  @ApiProperty({ type: LegalCaseEntity, nullable: true })
  // Field: legalCase, Type: LegalCase
  @Column()
  legalCase?: LegalCase;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
