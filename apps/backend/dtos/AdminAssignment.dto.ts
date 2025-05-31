import { ApiProperty } from "@nestjs/swagger";
import { AdminEntity } from "./Admin.entity";
import { AdminRoleEntity } from "./AdminRole.entity";
import { Admin, AdminRole } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for AdminAssignment
export class AdminAssignmentDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: adminId, Type: string
  @Column()
  adminId: string;

  @ApiProperty({ type: AdminEntity })
  // Field: admin, Type: Admin
  @Column()
  admin: Admin;

  @ApiProperty({ type: "string" })
  // Field: roleId, Type: string
  @Column()
  roleId: string;

  @ApiProperty({ type: AdminRoleEntity })
  // Field: role, Type: AdminRole
  @Column()
  role: AdminRole;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: status, Type: string
  @Column()
  status: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
