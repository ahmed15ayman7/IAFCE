import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Profile
export class CreateProfileDto {
  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: "string" })
  // Field: bio, Type: string
  @Column()
  bio?: string;

  @ApiProperty({ type: "string" })
  // Field: phone, Type: string
  @Column()
  phone?: string;

  @ApiProperty({ type: "string" })
  // Field: address, Type: string
  @Column()
  address?: string;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: preferences, Type: object
  @Column()
  preferences?: object;
}
