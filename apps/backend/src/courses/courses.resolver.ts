// import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
// import { CoursesService } from './courses.service';
// import { CreateCourseDto } from 'dtos/Course.create.dto';
// import { UpdateCourseDto } from 'dtos/Course.update.dto';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { UserRole } from '@shared/prisma';
// import { CourseEntity } from 'dtos/Course.entity';
// import { UserEntity } from 'dtos/User.entity';

// @Resolver(() => CourseEntity)
// export class CoursesResolver {
//     constructor(private readonly coursesService: CoursesService) { }

//     @Mutation(() => CourseEntity)
//     @UseGuards(JwtAuthGuard, RolesGuard)
//     @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
//     createCourse(@Args('createCourseInput') createCourseInput: CreateCourseDto) {
//         return this.coursesService.create(createCourseInput);
//     }

//     @Query(() => [CourseEntity], { name: 'courses' })
//     findAll() {
//         return this.coursesService.findAll();
//     }

//     @Query(() => CourseEntity, { name: 'course' })
//     findOne(@Args('id', { type: () => ID }) id: string) {
//         return this.coursesService.findOne(id);
//     }

//     @Mutation(() => CourseEntity)
//     @UseGuards(JwtAuthGuard, RolesGuard)
//     @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
//     updateCourse(
//         @Args('id', { type: () => ID }) id: string,
//         @Args('updateCourseInput') updateCourseInput: UpdateCourseDto,
//     ) {
//         return this.coursesService.update(id, updateCourseInput);
//     }

//     @Mutation(() => CourseEntity)
//     @UseGuards(JwtAuthGuard, RolesGuard)
//     @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
//     removeCourse(@Args('id', { type: () => ID }) id: string) {
//         return this.coursesService.remove(id);
//     }

//     @Mutation(() => CourseEntity)
//     @UseGuards(JwtAuthGuard)
//     enrollInCourse(
//         @Args('courseId', { type: () => ID }) courseId: string,
//         @Args('studentId', { type: () => ID }) studentId: string,
//     ) {
//         return this.coursesService.enrollStudent(courseId, studentId);
//     }

//     @Query(() => [CourseEntity], { name: 'courseLessons' })
//     getCourseLessons(@Args('courseId', { type: () => ID }) courseId: string) {
//         return this.coursesService.getCourseLessons(courseId);
//     }

//     // @Query(() => [Course], { name: 'courseQuizzes' })
//     // getCourseQuizzes(@Args('courseId', { type: () => ID }) courseId: string) {
//     //     return this.coursesService.getCourseQuizzes(courseId);
//     // }

//     @Query(() => [UserEntity], { name: 'courseStudents' })
//     getCourseStudents(@Args('courseId', { type: () => ID }) courseId: string) {
//         return this.coursesService.getCourseStudents(courseId);
//     }
// } 