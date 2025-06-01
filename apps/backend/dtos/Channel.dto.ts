import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { OwnerEntity } from "./Owner.entity";
import { MessageEntity } from "./Message.entity";
import { PublicRelationsRecordEntity } from "./PublicRelationsRecord.entity";
import { MeetingEntity } from "./Meeting.entity";
import { AdminRoleEntity } from "./AdminRole.entity";
import { LegalCaseEntity } from "./LegalCase.entity";
import {
  User,
  Owner,
  Message,
  PublicRelationsRecord,
  Meeting,
  AdminRole,
  LegalCase,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Channel
export class ChannelDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: UserEntity })
  // Field: members, Type: User[]
  @Column()
  members: User[];

  @ApiProperty({ type: "string" })
  // Field: ownerId, Type: string
  @Column()
  ownerId: string;

  @ApiProperty({ type: OwnerEntity })
  // Field: owner, Type: Owner
  @Column()
  owner: Owner;

  @ApiProperty({ type: MessageEntity })
  // Field: messages, Type: Message[]
  @Column()
  messages: Message[];

  @ApiProperty({ type: "string", nullable: true })
  // Field: prRecordId, Type: string
  @Column()
  prRecordId?: string;

  @ApiProperty({ type: PublicRelationsRecordEntity, nullable: true })
  // Field: prRecord, Type: PublicRelationsRecord
  @Column()
  prRecord?: PublicRelationsRecord;

  @ApiProperty({ type: "string", nullable: true })
  // Field: meetingId, Type: string
  @Column()
  meetingId?: string;

  @ApiProperty({ type: MeetingEntity, nullable: true })
  // Field: meeting, Type: Meeting
  @Column()
  meeting?: Meeting;

  @ApiProperty({ type: "string", nullable: true })
  // Field: adminRoleId, Type: string
  @Column()
  adminRoleId?: string;

  @ApiProperty({ type: AdminRoleEntity, nullable: true })
  // Field: adminRole, Type: AdminRole
  @Column()
  adminRole?: AdminRole;

  @ApiProperty({ type: "string", nullable: true })
  // Field: legalCaseId, Type: string
  @Column()
  legalCaseId?: string;

  @ApiProperty({ type: LegalCaseEntity, nullable: true })
  // Field: legalCase, Type: LegalCase
  @Column()
  legalCase?: LegalCase;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
