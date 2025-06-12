import { ApiProperty } from "@nestjs/swagger";
import { BranchEntity } from "./Branch.entity";
import { AdminEntity } from "./Admin.entity";
import { ExpenseType, Branch, Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Expense
export class ExpenseDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ enum: ExpenseType })
  // Field: type, Type: ExpenseType
  @Column()
  type: ExpenseType;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: paidAt, Type: Date
  @Column()
  paidAt: Date;

  @ApiProperty({ type: "string" })
  // Field: branchId, Type: string
  @Column()
  branchId: string;

  @ApiProperty({ type: BranchEntity })
  // Field: branch, Type: Branch
  @Column()
  branch: Branch;

  @ApiProperty({ type: "string" })
  // Field: createdBy, Type: string
  @Column()
  createdBy: string;

  @ApiProperty({ type: AdminEntity })
  // Field: createdByAdmin, Type: Admin
  @Column()
  createdByAdmin: Admin;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
