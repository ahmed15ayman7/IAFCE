import { ApiProperty } from "@nestjs/swagger";
import {
  LegalCaseType,
  LegalCaseStatus,
  Admin,
  Academy,
  User,
  File,
  Report,
  Event,
  Channel,
  Payment,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for LegalCase
export class CreateLegalCaseDto {
  @ApiProperty({ type: "string" })
  // Field: caseTitle, Type: string
  @Column()
  caseTitle: string;

  @ApiProperty({ enum: LegalCaseType })
  // Field: caseType, Type: LegalCaseType
  @Column()
  caseType: LegalCaseType;

  @ApiProperty({ enum: LegalCaseStatus })
  // Field: status, Type: LegalCaseStatus
  @Column()
  status: LegalCaseStatus;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: courtDate, Type: Date
  @Column()
  courtDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: assignedLawyerId, Type: string
  @Column()
  assignedLawyerId: string;

  @ApiProperty({ type: "string" })
  // Field: academyId, Type: string
  @Column()
  academyId: string;

  @ApiProperty({ type: "string" })
  // Field: relatedUserId, Type: string
  @Column()
  relatedUserId?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
