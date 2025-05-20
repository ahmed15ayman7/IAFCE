import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Profile
export class ProfileDto {
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

  @ApiProperty({ type: "string", nullable: true })
  // Field: bio, Type: string
  @Column()
  bio?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: phone, Type: string
  @Column()
  phone?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: address, Type: string
  @Column()
  address?: string;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: preferences, Type: object
  @Column()
  preferences?: object;
}
