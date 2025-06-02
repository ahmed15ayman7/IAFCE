import { ApiProperty } from "@nestjs/swagger";
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
// This is the Create Entity for Admin
export class CreateAdminDto {
  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
