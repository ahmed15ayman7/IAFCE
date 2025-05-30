import { ApiProperty } from "@nestjs/swagger";
import { QuestionEntity } from "./Question.entity";
import { Question } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Option
export class OptionDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: questionId, Type: string
  @Column()
  questionId: string;

  @ApiProperty({ type: QuestionEntity })
  // Field: question, Type: Question
  @Column()
  question: Question;

  @ApiProperty({ type: "string" })
  // Field: text, Type: string
  @Column()
  text: string;

  @ApiProperty({ type: "boolean" })
  // Field: isCorrect, Type: boolean
  @Column()
  isCorrect: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
