import { ApiProperty } from "@nestjs/swagger";
import { FileEntity } from "./File.entity";
import { AdminEntity } from "./Admin.entity";
import { File, Admin } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for SecretaryFiles
export class SecretaryFilesEntity {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string" })
  // Field: fileId, Type: string
  @Column()
  fileId: string;

  @ApiProperty({ type: FileEntity })
  // Field: file, Type: File
  @Column()
  file: File;

  @ApiProperty({ type: "string" })
  // Field: category, Type: string
  @Column()
  category: string;

  @ApiProperty({ type: "string" })
  // Field: tags, Type: string[]
  @Column()
  tags: string[];

  @ApiProperty({ type: "string" })
  // Field: secretaryId, Type: string
  @Column()
  secretaryId: string;

  @ApiProperty({ type: AdminEntity })
  // Field: secretary, Type: Admin
  @Column()
  secretary: Admin;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
