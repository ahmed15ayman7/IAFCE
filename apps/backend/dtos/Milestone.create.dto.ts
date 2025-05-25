import { ApiProperty } from "@nestjs/swagger";
import { MilestoneStatus, Path } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Milestone
export class CreateMilestoneDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ enum: MilestoneStatus })
  // Field: status, Type: MilestoneStatus
  @Column()
  status: MilestoneStatus;

  @ApiProperty({ type: "string" })
  // Field: pathId, Type: string
  @Column()
  pathId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
