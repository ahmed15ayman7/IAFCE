import { ApiProperty } from "@nestjs/swagger";
import { PaymentEntity } from "./Payment.entity";
import { AdminEntity } from "./Admin.entity";
import { Payment, Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for PaymentLogBySecretary
export class PaymentLogBySecretaryEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: paymentId, Type: string
  @Column()
  paymentId: string;

  @ApiProperty({ type: PaymentEntity })
  // Field: payment, Type: Payment
  @Column()
  payment: Payment;

  @ApiProperty({ type: "string" })
  // Field: secretaryId, Type: string
  @Column()
  secretaryId: string;

  @ApiProperty({ type: AdminEntity })
  // Field: secretary, Type: Admin
  @Column()
  secretary: Admin;

  @ApiProperty({ type: "string", nullable: true })
  // Field: notes, Type: string
  @Column()
  notes?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
