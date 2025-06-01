import { ApiProperty } from "@nestjs/swagger";
import {
  AccountingType,
  Admin,
  Academy,
  Invoice,
  SalaryPayment,
  File,
  Report,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for AccountingEntry
export class CreateAccountingEntryDto {
  @ApiProperty({ enum: AccountingType })
  // Field: type, Type: AccountingType
  @Column()
  type: AccountingType;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

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
