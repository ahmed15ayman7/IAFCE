import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { UserAcademyCEOEntity } from "./UserAcademyCEO.entity";
import { CourseEntity } from "./Course.entity";
import { InstructorEntity } from "./Instructor.entity";
import { EventEntity } from "./Event.entity";
import { AccountingEntryEntity } from "./AccountingEntry.entity";
import { PublicRelationsRecordEntity } from "./PublicRelationsRecord.entity";
import { MeetingEntity } from "./Meeting.entity";
import { LegalCaseEntity } from "./LegalCase.entity";
import {
  User,
  UserAcademyCEO,
  Course,
  Instructor,
  Event,
  AccountingEntry,
  PublicRelationsRecord,
  Meeting,
  LegalCase,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Academy
export class AcademyDto {
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

  @ApiProperty({ type: "string", nullable: true })
  // Field: logo, Type: string
  @Column()
  logo?: string;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: settings, Type: object
  @Column()
  settings?: object;

  @ApiProperty({ type: UserEntity })
  // Field: users, Type: User[]
  @Column()
  users: User[];

  @ApiProperty({ type: UserAcademyCEOEntity })
  // Field: ceos, Type: UserAcademyCEO[]
  @Column()
  ceos: UserAcademyCEO[];

  @ApiProperty({ type: CourseEntity })
  // Field: courses, Type: Course[]
  @Column()
  courses: Course[];

  @ApiProperty({ type: InstructorEntity })
  // Field: instructors, Type: Instructor[]
  @Column()
  instructors: Instructor[];

  @ApiProperty({ type: EventEntity })
  // Field: events, Type: Event[]
  @Column()
  events: Event[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: AccountingEntryEntity })
  // Field: AccountingEntry, Type: AccountingEntry[]
  @Column()
  AccountingEntry: AccountingEntry[];

  @ApiProperty({ type: PublicRelationsRecordEntity })
  // Field: PublicRelationsRecord, Type: PublicRelationsRecord[]
  @Column()
  PublicRelationsRecord: PublicRelationsRecord[];

  @ApiProperty({ type: MeetingEntity })
  // Field: Meeting, Type: Meeting[]
  @Column()
  Meeting: Meeting[];

  @ApiProperty({ type: LegalCaseEntity })
  // Field: LegalCase, Type: LegalCase[]
  @Column()
  LegalCase: LegalCase[];
}
