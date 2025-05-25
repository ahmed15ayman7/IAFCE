import { ApiProperty } from "@nestjs/swagger";
import { PathEntity } from "./Path.entity";
import { MilestoneStatus, Path } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Milestone
export class MilestoneEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
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

  @ApiProperty({ type: PathEntity })
  // Field: path, Type: Path
  @Column()
  path: Path;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
