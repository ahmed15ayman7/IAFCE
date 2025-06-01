import { ApiProperty } from "@nestjs/swagger";
import { AdminRoleEntity } from "./AdminRole.entity";
import { AdminRole } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Permission
export class PermissionEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "boolean" })
  // Field: isActive, Type: boolean
  @Column()
  isActive: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: AdminRoleEntity })
  // Field: AdminRole, Type: AdminRole[]
  @Column()
  AdminRole: AdminRole[];
}
