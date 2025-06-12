import { ApiProperty } from "@nestjs/swagger";
import { PaymentEntity } from "./Payment.entity";
import { InstallmentEntity } from "./Installment.entity";
import { ExpenseEntity } from "./Expense.entity";
import { BranchFinanceEntity } from "./BranchFinance.entity";
import { Payment, Installment, Expense, BranchFinance } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Branch
export class BranchEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: address, Type: string
  @Column()
  address?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: phone, Type: string
  @Column()
  phone?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: email, Type: string
  @Column()
  email?: string;

  @ApiProperty({ type: PaymentEntity })
  // Field: payments, Type: Payment[]
  @Column()
  payments: Payment[];

  @ApiProperty({ type: InstallmentEntity })
  // Field: installments, Type: Installment[]
  @Column()
  installments: Installment[];

  @ApiProperty({ type: ExpenseEntity })
  // Field: expenses, Type: Expense[]
  @Column()
  expenses: Expense[];

  @ApiProperty({ type: BranchFinanceEntity, nullable: true })
  // Field: finance, Type: BranchFinance
  @Column()
  finance?: BranchFinance;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
