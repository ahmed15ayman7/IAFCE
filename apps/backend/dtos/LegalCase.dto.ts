import { ApiProperty } from "@nestjs/swagger";
import { AdminEntity } from "./Admin.entity";
import { AcademyEntity } from "./Academy.entity";
import { UserEntity } from "./User.entity";
import {
  LegalCaseType,
  LegalCaseStatus,
  Admin,
  Academy,
  User,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for LegalCase
export class LegalCaseDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

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

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: courtDate, Type: Date
  @Column()
  courtDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: assignedLawyerId, Type: string
  @Column()
  assignedLawyerId: string;

  @ApiProperty({ type: AdminEntity })
  // Field: assignedLawyer, Type: Admin
  @Column()
  assignedLawyer: Admin;

  @ApiProperty({ type: "string" })
  // Field: academyId, Type: string
  @Column()
  academyId: string;

  @ApiProperty({ type: AcademyEntity })
  // Field: academy, Type: Academy
  @Column()
  academy: Academy;

  @ApiProperty({ type: "string", nullable: true })
  // Field: relatedUserId, Type: string
  @Column()
  relatedUserId?: string;

  @ApiProperty({ type: UserEntity, nullable: true })
  // Field: relatedUser, Type: User
  @Column()
  relatedUser?: User;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
