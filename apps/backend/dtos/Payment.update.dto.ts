import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  PaymentMethod,
  Branch,
  Installment,
  LegalCase,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Payment
export class UpdatePaymentDto {
  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

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

  @ApiProperty({ type: "string", nullable: true })
  // Field: legalCaseId, Type: string
  @Column()
  legalCaseId?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
