import { ApiProperty } from "@nestjs/swagger";
import { LessonEntity } from "./Lesson.entity";
import { Lesson } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for File
export class FileDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: url, Type: string
  @Column()
  url: string;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ type: "string" })
  // Field: lessonId, Type: string
  @Column()
  lessonId: string;

  @ApiProperty({ type: LessonEntity })
  // Field: lesson, Type: Lesson
  @Column()
  lesson: Lesson;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
