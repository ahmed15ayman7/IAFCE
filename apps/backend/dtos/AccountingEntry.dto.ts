import { ApiProperty } from "@nestjs/swagger";
import { AdminEntity } from "./Admin.entity";
import { AcademyEntity } from "./Academy.entity";
import { InvoiceEntity } from "./Invoice.entity";
import { SalaryPaymentEntity } from "./SalaryPayment.entity";
import { FileEntity } from "./File.entity";
import { ReportEntity } from "./Report.entity";
import {
  AccountingType,
  Admin,
  Academy,
  Invoice,
  SalaryPayment,
  File,
  Report,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for AccountingEntry
export class AccountingEntryDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ enum: AccountingType })
  // Field: type, Type: AccountingType
  @Column()
  type: AccountingType;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "string" })
  // Field: createdByAdminId, Type: string
  @Column()
  createdByAdminId: string;

  @ApiProperty({ type: AdminEntity })
  // Field: createdByAdmin, Type: Admin
  @Column()
  createdByAdmin: Admin;

  @ApiProperty({ type: "string" })
  // Field: academyId, Type: string
  @Column()
  academyId: string;

  @ApiProperty({ type: AcademyEntity })
  // Field: academy, Type: Academy
  @Column()
  academy: Academy;

  @ApiProperty({ type: InvoiceEntity, nullable: true })
  // Field: invoice, Type: Invoice
  @Column()
  invoice?: Invoice;

  @ApiProperty({ type: SalaryPaymentEntity, nullable: true })
  // Field: salaryPayment, Type: SalaryPayment
  @Column()
  salaryPayment?: SalaryPayment;

  @ApiProperty({ type: FileEntity })
  // Field: files, Type: File[]
  @Column()
  files: File[];

  @ApiProperty({ type: ReportEntity })
  // Field: reports, Type: Report[]
  @Column()
  reports: Report[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
