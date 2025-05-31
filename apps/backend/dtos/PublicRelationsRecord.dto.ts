import { ApiProperty } from "@nestjs/swagger";
import { AdminEntity } from "./Admin.entity";
import { AcademyEntity } from "./Academy.entity";
import { PRResponseEntity } from "./PRResponse.entity";
import { PRRequestStatus, Admin, Academy, PRResponse } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for PublicRelationsRecord
export class PublicRelationsRecordDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

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

  @ApiProperty({ type: AdminEntity })
  // Field: handledByAdmin, Type: Admin
  @Column()
  handledByAdmin: Admin;

  @ApiProperty({ type: "string" })
  // Field: academyId, Type: string
  @Column()
  academyId: string;

  @ApiProperty({ type: AcademyEntity })
  // Field: academy, Type: Academy
  @Column()
  academy: Academy;

  @ApiProperty({ type: PRResponseEntity })
  // Field: responses, Type: PRResponse[]
  @Column()
  responses: PRResponse[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
