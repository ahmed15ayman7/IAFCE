import { ApiProperty } from "@nestjs/swagger";
import { User, InstallmentStatus, Payment, Branch } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Installment
export class CreateInstallmentDto {
  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: dueDate, Type: Date
  @Column()
  dueDate: Date;

  @ApiProperty({ enum: InstallmentStatus })
  // Field: status, Type: InstallmentStatus
  @Column()
  status: InstallmentStatus;

  @ApiProperty({ type: "string" })
  // Field: paymentId, Type: string
  @Column()
  paymentId?: string;

  @ApiProperty({ type: "string" })
  // Field: branchId, Type: string
  @Column()
  branchId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
