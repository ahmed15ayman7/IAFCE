import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for SuccessStory
export class CreateSuccessStoryDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ type: "string" })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string" })
  // Field: videoUrl, Type: string
  @Column()
  videoUrl?: string;

  @ApiProperty({ type: "string" })
  // Field: graduateName, Type: string
  @Column()
  graduateName: string;

  @ApiProperty({ type: "string" })
  // Field: position, Type: string
  @Column()
  position: string;

  @ApiProperty({ type: "string" })
  // Field: createdById, Type: string
  @Column()
  createdById: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
