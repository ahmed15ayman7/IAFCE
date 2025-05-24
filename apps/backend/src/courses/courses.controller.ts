import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from '../../dtos/Course.create.dto';
import { UpdateCourseDto } from '../../dtos/Course.update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Course, Instructor, Lesson, Quiz, User } from '@shared/prisma';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    async findAll(): Promise<Course[]> {
        return this.coursesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Course> {
        return this.coursesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<Course> {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Course> {
        return this.coursesService.remove(id);
    }
    @Post('enroll/:id')
    async enrollStudent(@Param('id') id: string, @Body() body: { studentId: string }): Promise<Course> {
        return this.coursesService.enrollStudent(id, body.studentId);
    }
    @Post('unenroll/:id')
    async unenrollStudent(@Param('id') id: string, @Body() body: { studentId: string }): Promise<Course> {
        return this.coursesService.unenrollStudent(id, body.studentId);
    }
    @Post('add-instructor/:id')
    async addInstructor(@Param('id') id: string, @Body() body: { instructorId: string }): Promise<Course> {
        return this.coursesService.addInstructor(id, body.instructorId);
    }
    @Post('remove-instructor/:id')
    async removeInstructor(@Param('id') id: string, @Body() body: { instructorId: string }): Promise<Course> {
        return this.coursesService.removeInstructor(id, body.instructorId);
    }
    @Get('lessons/:id')
    async getCourseLessons(@Param('id') id: string): Promise<Lesson[]> {
        return this.coursesService.getCourseLessons(id);
    }
    @Get('quizzes/:id')
    async getCourseQuizzes(@Param('id') id: string): Promise<Quiz[]> {
        return this.coursesService.getCourseQuizzes(id);
    }
    @Get('students/:id')
    async getCourseStudents(@Param('id') id: string): Promise<User[]> {
        return this.coursesService.getCourseStudents(id);
    }
    @Get('instructors/:id')
    async getCourseInstructors(@Param('id') id: string): Promise<Instructor[]> {
        return this.coursesService.getCourseInstructors(id);
    }

    @Get('by-student/:id')
    async getCoursesByStudentId(@Param('id') id: string): Promise<Course[]> {
        return this.coursesService.getCoursesByStudentId(id);
    }

    @Get('by-instructor/:id')
    async getCoursesByInstructorId(@Param('id') id: string): Promise<Course[]> {
        return this.coursesService.getCoursesByInstructorId(id);
    }

    @Get('by-academy/:id')
    async getCoursesByAcademyId(@Param('id') id: string): Promise<Course[]> {
        return this.coursesService.getCoursesByAcademyId(id);
    }
} 