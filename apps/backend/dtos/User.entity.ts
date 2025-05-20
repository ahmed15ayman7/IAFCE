import { ApiProperty } from "@nestjs/swagger";
import { AcademyEntity } from "./Academy.entity";
import { ProfileEntity } from "./Profile.entity";
import { EnrollmentEntity } from "./Enrollment.entity";
import { AchievementEntity } from "./Achievement.entity";
import { NotificationEntity } from "./Notification.entity";
import { MessageEntity } from "./Message.entity";
import { PostEntity } from "./Post.entity";
import { GroupEntity } from "./Group.entity";
import { ChannelEntity } from "./Channel.entity";
import { BookmarkEntity } from "./Bookmark.entity";
import { SubmissionEntity } from "./Submission.entity";
import { AttendanceEntity } from "./Attendance.entity";
import { InstructorEntity } from "./Instructor.entity";
import { OwnerEntity } from "./Owner.entity";
import { AdminEntity } from "./Admin.entity";
import { LessonEntity } from "./Lesson.entity";
import { PaymentEntity } from "./Payment.entity";
import { ReportEntity } from "./Report.entity";
import {
  UserRole,
  Academy,
  Profile,
  Enrollment,
  Achievement,
  Notification,
  Message,
  Post,
  Group,
  Channel,
  Bookmark,
  Submission,
  Attendance,
  Instructor,
  Owner,
  Admin,
  Lesson,
  Payment,
  Report,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for User
export class UserEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string" })
  // Field: password, Type: string
  @Column()
  password: string;

  @ApiProperty({ type: "string" })
  // Field: firstName, Type: string
  @Column()
  firstName: string;

  @ApiProperty({ type: "string" })
  // Field: lastName, Type: string
  @Column()
  lastName: string;

  @ApiProperty({ enum: UserRole })
  // Field: role, Type: UserRole
  @Column()
  role: UserRole;

  @ApiProperty({ type: "string", nullable: true })
  // Field: subRole, Type: string
  @Column()
  subRole?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: avatar, Type: string
  @Column()
  avatar?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: academyId, Type: string
  @Column()
  academyId?: string;

  @ApiProperty({ type: AcademyEntity, nullable: true })
  // Field: academy, Type: Academy
  @Column()
  academy?: Academy;

  @ApiProperty({ type: ProfileEntity, nullable: true })
  // Field: profile, Type: Profile
  @Column()
  profile?: Profile;

  @ApiProperty({ type: EnrollmentEntity })
  // Field: enrollments, Type: Enrollment[]
  @Column()
  enrollments: Enrollment[];

  @ApiProperty({ type: AchievementEntity })
  // Field: achievements, Type: Achievement[]
  @Column()
  achievements: Achievement[];

  @ApiProperty({ type: NotificationEntity })
  // Field: notifications, Type: Notification[]
  @Column()
  notifications: Notification[];

  @ApiProperty({ type: MessageEntity })
  // Field: messages, Type: Message[]
  @Column()
  messages: Message[];

  @ApiProperty({ type: PostEntity })
  // Field: posts, Type: Post[]
  @Column()
  posts: Post[];

  @ApiProperty({ type: GroupEntity })
  // Field: groups, Type: Group[]
  @Column()
  groups: Group[];

  @ApiProperty({ type: ChannelEntity })
  // Field: channels, Type: Channel[]
  @Column()
  channels: Channel[];

  @ApiProperty({ type: BookmarkEntity })
  // Field: bookmarks, Type: Bookmark[]
  @Column()
  bookmarks: Bookmark[];

  @ApiProperty({ type: SubmissionEntity })
  // Field: Submission, Type: Submission[]
  @Column()
  Submission: Submission[];

  @ApiProperty({ type: AttendanceEntity })
  // Field: Attendance, Type: Attendance[]
  @Column()
  Attendance: Attendance[];

  @ApiProperty({ type: InstructorEntity })
  // Field: Instructor, Type: Instructor[]
  @Column()
  Instructor: Instructor[];

  @ApiProperty({ type: OwnerEntity })
  // Field: Owner, Type: Owner[]
  @Column()
  Owner: Owner[];

  @ApiProperty({ type: AdminEntity })
  // Field: Admin, Type: Admin[]
  @Column()
  Admin: Admin[];

  @ApiProperty({ type: LessonEntity })
  // Field: Lesson, Type: Lesson[]
  @Column()
  Lesson: Lesson[];

  @ApiProperty({ type: PaymentEntity })
  // Field: Payment, Type: Payment[]
  @Column()
  Payment: Payment[];

  @ApiProperty({ type: ReportEntity })
  // Field: Report, Type: Report[]
  @Column()
  Report: Report[];
}
