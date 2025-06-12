import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { PaymentEntity } from "./Payment.entity";
import { BranchEntity } from "./Branch.entity";
import { User, InstallmentStatus, Payment, Branch } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Installment
export class InstallmentDto {
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

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: dueDate, Type: Date
  @Column()
  dueDate: Date;

  @ApiProperty({ enum: InstallmentStatus })
  // Field: status, Type: InstallmentStatus
  @Column()
  status: InstallmentStatus;

  @ApiProperty({ type: "string", nullable: true })
  // Field: paymentId, Type: string
  @Column()
  paymentId?: string;

  @ApiProperty({ type: PaymentEntity, nullable: true })
  // Field: payment, Type: Payment
  @Column()
  payment?: Payment;

  @ApiProperty({ type: "string" })
  // Field: branchId, Type: string
  @Column()
  branchId: string;

  @ApiProperty({ type: BranchEntity })
  // Field: branch, Type: Branch
  @Column()
  branch: Branch;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
