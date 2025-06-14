import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { BranchEntity } from "./Branch.entity";
import { InstallmentEntity } from "./Installment.entity";
import { LegalCaseEntity } from "./LegalCase.entity";
import { PaymentLogBySecretaryEntity } from "./PaymentLogBySecretary.entity";
import {
  User,
  PaymentMethod,
  Branch,
  Installment,
  LegalCase,
  PaymentLogBySecretary,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Payment
export class PaymentDto {
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

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ enum: PaymentMethod })
  // Field: method, Type: PaymentMethod
  @Column()
  method: PaymentMethod;

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

  @ApiProperty({ type: InstallmentEntity })
  // Field: installments, Type: Installment[]
  @Column()
  installments: Installment[];

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

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: PaymentLogBySecretaryEntity })
  // Field: secretaryLogs, Type: PaymentLogBySecretary[]
  @Column()
  secretaryLogs: PaymentLogBySecretary[];
}
