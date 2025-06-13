import { ApiProperty } from "@nestjs/swagger";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Partnership
export class CreatePartnershipDto {
  @ApiProperty({ type: "string" })
  // Field: partnerName, Type: string
  @Column()
  partnerName: string;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ type: "string" })
  // Field: logo, Type: string
  @Column()
  logo?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

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
