import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { EnrollmentEntity } from "./Enrollment.entity";
import { FileEntity } from "./File.entity";
import { User, Enrollment, File } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TraineeManagement
export class TraineeManagementEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: userId, Type: string
  @Column()
  userId: string;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "string" })
  // Field: enrollmentId, Type: string
  @Column()
  enrollmentId: string;

  @ApiProperty({ type: EnrollmentEntity })
  // Field: enrollment, Type: Enrollment
  @Column()
  enrollment: Enrollment;

  @ApiProperty({ type: "string", nullable: true })
  // Field: notes, Type: string
  @Column()
  notes?: string;

  @ApiProperty({ type: FileEntity })
  // Field: documents, Type: File[]
  @Column()
  documents: File[];

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
