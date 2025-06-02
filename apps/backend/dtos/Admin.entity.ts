import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { GroupEntity } from "./Group.entity";
import { AccountingEntryEntity } from "./AccountingEntry.entity";
import { PublicRelationsRecordEntity } from "./PublicRelationsRecord.entity";
import { PRResponseEntity } from "./PRResponse.entity";
import { MeetingEntity } from "./Meeting.entity";
import { AdminAssignmentEntity } from "./AdminAssignment.entity";
import { LegalCaseEntity } from "./LegalCase.entity";
import { AdminRoleEntity } from "./AdminRole.entity";
import {
  User,
  Group,
  AccountingEntry,
  PublicRelationsRecord,
  PRResponse,
  Meeting,
  AdminAssignment,
  LegalCase,
  AdminRole,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Admin
export class AdminEntity {
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

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: GroupEntity })
  // Field: Group, Type: Group[]
  @Column()
  Group: Group[];

  @ApiProperty({ type: AccountingEntryEntity })
  // Field: accountingEntries, Type: AccountingEntry[]
  @Column()
  accountingEntries: AccountingEntry[];

  @ApiProperty({ type: PublicRelationsRecordEntity })
  // Field: prRecords, Type: PublicRelationsRecord[]
  @Column()
  prRecords: PublicRelationsRecord[];

  @ApiProperty({ type: PRResponseEntity })
  // Field: prResponses, Type: PRResponse[]
  @Column()
  prResponses: PRResponse[];

  @ApiProperty({ type: MeetingEntity })
  // Field: meetings, Type: Meeting[]
  @Column()
  meetings: Meeting[];

  @ApiProperty({ type: AdminAssignmentEntity })
  // Field: assignments, Type: AdminAssignment[]
  @Column()
  assignments: AdminAssignment[];

  @ApiProperty({ type: LegalCaseEntity })
  // Field: legalCases, Type: LegalCase[]
  @Column()
  legalCases: LegalCase[];

  @ApiProperty({ type: AdminRoleEntity })
  // Field: AdminRole, Type: AdminRole[]
  @Column()
  AdminRole: AdminRole[];
}
