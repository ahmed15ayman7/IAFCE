import { ApiProperty } from "@nestjs/swagger";
import { MilestoneEntity } from "./Milestone.entity";
import { CourseEntity } from "./Course.entity";
import { UserEntity } from "./User.entity";
import { Milestone, Course, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Path
export class PathDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: MilestoneEntity })
  // Field: milestones, Type: Milestone[]
  @Column()
  milestones: Milestone[];

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

  @ApiProperty({ type: CourseEntity })
  // Field: courses, Type: Course[]
  @Column()
  courses: Course[];

  @ApiProperty({ type: UserEntity })
  // Field: peers, Type: User[]
  @Column()
  peers: User[];

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
