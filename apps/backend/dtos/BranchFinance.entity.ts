import { ApiProperty } from "@nestjs/swagger";
import { BranchEntity } from "./Branch.entity";
import { Branch } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for BranchFinance
export class BranchFinanceEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: branchId, Type: string
  @Column()
  branchId: string;

  @ApiProperty({ type: BranchEntity })
  // Field: branch, Type: Branch
  @Column()
  branch: Branch;

  @ApiProperty({ type: "number" })
  // Field: totalIncome, Type: number
  @Column()
  totalIncome: number;

  @ApiProperty({ type: "number" })
  // Field: totalExpenses, Type: number
  @Column()
  totalExpenses: number;

  @ApiProperty({ type: "number" })
  // Field: balance, Type: number
  @Column()
  balance: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: lastUpdated, Type: Date
  @Column()
  lastUpdated: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
