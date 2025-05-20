import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonsService } from './lessons.service';
import { LessonEntity } from 'dtos/Lesson.entity';
import { CreateLessonDto } from 'dtos/Lesson.create.dto';
import { UpdateLessonDto } from 'dtos/Lesson.update.dto';

@Resolver(() => LessonEntity)
export class LessonsResolver {
    constructor(private readonly lessonsService: LessonsService) { }

    @Mutation(() => LessonEntity)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonDto) {
        return this.lessonsService.create(createLessonInput);
    }

    @Query(() => [LessonEntity], { name: 'lessons' })
    findAll() {
        return this.lessonsService.findAll();
    }

    @Query(() => LessonEntity, { name: 'lesson' })
    findOne(@Args('id') id: string) {
        return this.lessonsService.findOne(id);
    }

    @Mutation(() => LessonEntity)
    updateLesson(@Args('id') id: string, @Args('updateLessonInput') updateLessonInput: UpdateLessonDto) {
        return this.lessonsService.update(id, updateLessonInput);
    }

    @Mutation(() => LessonEntity)
    removeLesson(@Args('id') id: string) {
        return this.lessonsService.remove(id);
    }

    @Mutation(() => LessonEntity)
    markLessonAsCompleted(
        @Args('lessonId') lessonId: string,
        @Args('userId') userId: string,
    ) {
        return this.lessonsService.markLessonAsCompleted(lessonId, userId);
    }

    @Mutation(() => LessonEntity)
    markLessonAsIncomplete(
        @Args('lessonId') lessonId: string,
        @Args('userId') userId: string,
    ) {
        return this.lessonsService.markLessonAsIncomplete(lessonId, userId);
    }
} 