import { ApiProperty } from "@nestjs/swagger";
import { PublicRelationsRecordEntity } from "./PublicRelationsRecord.entity";
import { AdminEntity } from "./Admin.entity";
import { PublicRelationsRecord, Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for PRResponse
export class PRResponseDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: response, Type: string
  @Column()
  response: string;

  @ApiProperty({ type: "string" })
  // Field: prRecordId, Type: string
  @Column()
  prRecordId: string;

  @ApiProperty({ type: PublicRelationsRecordEntity })
  // Field: prRecord, Type: PublicRelationsRecord
  @Column()
  prRecord: PublicRelationsRecord;

  @ApiProperty({ type: "string" })
  // Field: respondedByAdminId, Type: string
  @Column()
  respondedByAdminId: string;

  @ApiProperty({ type: AdminEntity })
  // Field: respondedByAdmin, Type: Admin
  @Column()
  respondedByAdmin: Admin;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
