import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for CrisisCommunication
export class CreateCrisisCommunicationDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ type: "string" })
  // Field: summary, Type: string
  @Column()
  summary: string;

  @ApiProperty({ type: "string" })
  // Field: responsePlan, Type: string
  @Column()
  responsePlan: string;

  @ApiProperty({ type: "string" })
  // Field: handledById, Type: string
  @Column()
  handledById: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
