import { ApiProperty } from "@nestjs/swagger";
import { PublicRelationsRecord, Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for PRResponse
export class UpdatePRResponseDto {
  @ApiProperty({ type: "string" })
  // Field: response, Type: string
  @Column()
  response: string;

  @ApiProperty({ type: "string" })
  // Field: prRecordId, Type: string
  @Column()
  prRecordId: string;

  @ApiProperty({ type: "string" })
  // Field: respondedByAdminId, Type: string
  @Column()
  respondedByAdminId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
