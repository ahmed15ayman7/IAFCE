import { ApiProperty } from "@nestjs/swagger";
import { AcademyEntity } from "./Academy.entity";
import { Academy } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for MediaAlert
export class MediaAlertEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: triggerDate, Type: Date
  @Column()
  triggerDate: Date;

  @ApiProperty({ type: "string" })
  // Field: sourceType, Type: string
  @Column()
  sourceType: string;

  @ApiProperty({ type: "string" })
  // Field: sourceId, Type: string
  @Column()
  sourceId: string;

  @ApiProperty({ type: "boolean" })
  // Field: generated, Type: boolean
  @Column()
  generated: boolean;

  @ApiProperty({ type: "string" })
  // Field: status, Type: string
  @Column()
  status: string;

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
