import { ApiProperty } from "@nestjs/swagger";
import { CourseEntity } from "./Course.entity";
import { AcademyEntity } from "./Academy.entity";
import { Course, Academy } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Testimonial
export class TestimonialDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: feedback, Type: string
  @Column()
  feedback: string;

  @ApiProperty({ type: "number" })
  // Field: rating, Type: number
  @Column()
  rating: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: videoUrl, Type: string
  @Column()
  videoUrl?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: courseId, Type: string
  @Column()
  courseId?: string;

  @ApiProperty({ type: CourseEntity, nullable: true })
  // Field: course, Type: Course
  @Column()
  course?: Course;

  @ApiProperty({ type: "string" })
  // Field: academyId, Type: string
  @Column()
  academyId: string;

  @ApiProperty({ type: AcademyEntity })
  // Field: academy, Type: Academy
  @Column()
  academy: Academy;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
