import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { AccountingEntryEntity } from "./AccountingEntry.entity";
import { User, AccountingEntry } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for SalaryPayment
export class SalaryPaymentEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: employeeId, Type: string
  @Column()
  employeeId: string;

  @ApiProperty({ type: UserEntity })
  // Field: employee, Type: User
  @Column()
  employee: User;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ type: "number" })
  // Field: month, Type: number
  @Column()
  month: number;

  @ApiProperty({ type: "number" })
  // Field: year, Type: number
  @Column()
  year: number;

  @ApiProperty({ type: "string" })
  // Field: accountingEntryId, Type: string
  @Column()
  accountingEntryId: string;

  @ApiProperty({ type: AccountingEntryEntity })
  // Field: accountingEntry, Type: AccountingEntry
  @Column()
  accountingEntry: AccountingEntry;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
