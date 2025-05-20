import { ApiProperty } from "@nestjs/swagger";
import { Quiz } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Question
export class UpdateQuestionDto {
  @ApiProperty({ type: "string" })
  // Field: text, Type: string
  @Column()
  text: string;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: options, Type: object
  @Column()
  options?: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: answer, Type: object
  @Column()
  answer: object;

  @ApiProperty({ type: "number" })
  // Field: points, Type: number
  @Column()
  points: number;

  @ApiProperty({ type: "boolean" })
  // Field: isAnswered, Type: boolean
  @Column()
  isAnswered: boolean;

  @ApiProperty({ type: "string" })
  // Field: quizId, Type: string
  @Column()
  quizId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
