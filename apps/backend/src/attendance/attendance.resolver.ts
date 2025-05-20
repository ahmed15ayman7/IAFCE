import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { AttendanceEntity } from 'dtos/Attendance.entity';
import { CreateAttendanceDto } from 'dtos/Attendance.create.dto';
import { UpdateAttendanceDto } from 'dtos/Attendance.update.dto';

@Resolver(() => AttendanceEntity)
export class AttendanceResolver {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Mutation(() => AttendanceEntity)
    createAttendance(@Args('createAttendanceInput') createAttendanceInput: CreateAttendanceDto) {
        return this.attendanceService.create(createAttendanceInput);
    }

    @Query(() => [AttendanceEntity], { name: 'attendances' })
    findAll() {
        return this.attendanceService.findAll();
    }

    @Query(() => AttendanceEntity, { name: 'attendance' })
    findOne(@Args('id') id: string) {
        return this.attendanceService.findOne(id);
    }

    @Mutation(() => AttendanceEntity)
    updateAttendance(
        @Args('id') id: string,
        @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceDto
    ) {
        return this.attendanceService.update(id, updateAttendanceInput);
    }

    @Mutation(() => AttendanceEntity)
    removeAttendance(@Args('id') id: string) {
        return this.attendanceService.remove(id);
    }

    @Mutation(() => AttendanceEntity)
    trackAttendance(
        @Args('lessonId') lessonId: string,
        @Args('studentId') studentId: string,
        @Args('method') method: 'FACE_ID' | 'QR_CODE'
    ) {
        return this.attendanceService.trackAttendance(lessonId, studentId, method);
    }

    @Query(() => [AttendanceEntity], { name: 'studentAttendanceStats' })
    getStudentAttendanceStats(@Args('studentId') studentId: string) {
        return this.attendanceService.getStudentAttendanceStats(studentId);
    }
} 