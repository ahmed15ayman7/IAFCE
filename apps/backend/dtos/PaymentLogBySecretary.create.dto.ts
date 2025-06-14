import { ApiProperty } from "@nestjs/swagger";
import { Payment, Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for PaymentLogBySecretary
export class CreatePaymentLogBySecretaryDto {
  @ApiProperty({ type: "string" })
  // Field: paymentId, Type: string
  @Column()
  paymentId: string;

  @ApiProperty({ type: "string" })
  // Field: secretaryId, Type: string
  @Column()
  secretaryId: string;

  @ApiProperty({ type: "string" })
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
