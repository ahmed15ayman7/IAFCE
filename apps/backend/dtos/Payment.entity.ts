import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { LegalCaseEntity } from "./LegalCase.entity";
import { User, LegalCase } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Payment
export class PaymentEntity {
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
}
