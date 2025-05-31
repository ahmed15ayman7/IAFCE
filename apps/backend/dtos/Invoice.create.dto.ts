import { ApiProperty } from "@nestjs/swagger";
import { InvoiceStatus, AccountingEntry } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Invoice
export class CreateInvoiceDto {
  @ApiProperty({ type: "string" })
  // Field: invoiceNumber, Type: string
  @Column()
  invoiceNumber: string;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: dueDate, Type: Date
  @Column()
  dueDate: Date;

  @ApiProperty({ enum: InvoiceStatus })
  // Field: status, Type: InvoiceStatus
  @Column()
  status: InvoiceStatus;

  @ApiProperty({ type: "string" })
  // Field: accountingEntryId, Type: string
  @Column()
  accountingEntryId: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
