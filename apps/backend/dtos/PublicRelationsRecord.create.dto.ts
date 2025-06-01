import { ApiProperty } from "@nestjs/swagger";
import {
  PRRequestStatus,
  Admin,
  Academy,
  PRResponse,
  Event,
  Post,
  File,
  Channel,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for PublicRelationsRecord
export class CreatePublicRelationsRecordDto {
  @ApiProperty({ type: "string" })
  // Field: message, Type: string
  @Column()
  message: string;

  @ApiProperty({ type: "string" })
  // Field: senderName, Type: string
  @Column()
  senderName: string;

  @ApiProperty({ type: "string" })
  // Field: senderContact, Type: string
  @Column()
  senderContact: string;

  @ApiProperty({ enum: PRRequestStatus })
  // Field: status, Type: PRRequestStatus
  @Column()
  status: PRRequestStatus;

  @ApiProperty({ type: "string" })
  // Field: handledByAdminId, Type: string
  @Column()
  handledByAdminId: string;

  @ApiProperty({ type: "string" })
  // Field: academyId, Type: string
  @Column()
  academyId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
