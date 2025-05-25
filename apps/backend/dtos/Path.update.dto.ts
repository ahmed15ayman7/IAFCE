import { ApiProperty } from "@nestjs/swagger";
import { Milestone, Course, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Path
export class UpdatePathDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string" })
  // Field: level, Type: string
  @Column()
  level: string;

  @ApiProperty({ type: "number" })
  // Field: completedTasks, Type: number
  @Column()
  completedTasks: number;

  @ApiProperty({ type: "number" })
  // Field: remainingTime, Type: number
  @Column()
  remainingTime: number;

  @ApiProperty({ type: "number" })
  // Field: studyTime, Type: number
  @Column()
  studyTime: number;

  @ApiProperty({ type: "number" })
  // Field: totalTasks, Type: number
  @Column()
  totalTasks: number;

  @ApiProperty({ type: "number" })
  // Field: progress, Type: number
  @Column()
  progress: number;

  @ApiProperty({ type: "number" })
  // Field: engagement, Type: number
  @Column()
  engagement: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
