import { ApiProperty } from "@nestjs/swagger";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for FAQ
export class FAQDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: question, Type: string
  @Column()
  question: string;

  @ApiProperty({ type: "string" })
  // Field: answer, Type: string
  @Column()
  answer: string;

  @ApiProperty({ type: "string" })
  // Field: category, Type: string
  @Column()
  category: string;

  @ApiProperty({ type: "boolean" })
  // Field: isActive, Type: boolean
  @Column()
  isActive: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
