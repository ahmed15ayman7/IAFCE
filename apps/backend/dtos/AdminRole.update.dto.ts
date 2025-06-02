import { ApiProperty } from "@nestjs/swagger";
import {
  AdminRoleType,
  Admin,
  AdminAssignment,
  Permission,
  Report,
  File,
  Event,
  Channel,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for AdminRole
export class UpdateAdminRoleDto {
  @ApiProperty({ enum: AdminRoleType })
  // Field: name, Type: AdminRoleType
  @Column()
  name: AdminRoleType;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string" })
  // Field: adminId, Type: string
  @Column()
  adminId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
