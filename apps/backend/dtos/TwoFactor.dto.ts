import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TwoFactor
export class TwoFactorDto {
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

  @ApiProperty({ type: "boolean" })
  // Field: email, Type: boolean
  @Column()
  email: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: sms, Type: boolean
  @Column()
  sms: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: authenticator, Type: boolean
  @Column()
  authenticator: boolean;

  @ApiProperty({ type: "string", nullable: true })
  // Field: secret, Type: string
  @Column()
  secret?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
