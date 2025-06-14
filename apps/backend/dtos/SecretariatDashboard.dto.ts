import { ApiProperty } from "@nestjs/swagger";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for SecretariatDashboard
export class SecretariatDashboardDto {
  @ApiProperty({ type: "string" })
  // Field: id, Type: string
  @Column()
  id: string;

  @ApiProperty({ type: "number" })
  // Field: totalStudents, Type: number
  @Column()
  totalStudents: number;

  @ApiProperty({ type: "number" })
  // Field: activeCourses, Type: number
  @Column()
  activeCourses: number;

  @ApiProperty({ type: "number" })
  // Field: todayMeetings, Type: number
  @Column()
  todayMeetings: number;

  @ApiProperty({ type: "number" })
  // Field: newNotifications, Type: number
  @Column()
  newNotifications: number;

  @ApiProperty({ type: "number" })
  // Field: totalPayments, Type: number
  @Column()
  totalPayments: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
