import { ApiProperty } from "@nestjs/swagger";
import { AdminAssignmentEntity } from "./AdminAssignment.entity";
import { AdminRoleType, AdminAssignment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for AdminRole
export class AdminRoleEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ enum: AdminRoleType })
  // Field: name, Type: AdminRoleType
  @Column()
  name: AdminRoleType;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: AdminAssignmentEntity })
  // Field: assignments, Type: AdminAssignment[]
  @Column()
  assignments: AdminAssignment[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
