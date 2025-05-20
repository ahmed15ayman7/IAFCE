import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CourseEntity } from 'dtos/Course.entity';
import { AchievementEntity } from 'dtos/Achievement.entity';
import { CreateUserDto } from 'dtos/User.create.dto';
import { UpdateUserDto } from 'dtos/User.update.dto';
import { UserEntity } from 'dtos/User.entity';
@Resolver(() => UserEntity)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation(() => UserEntity)
    createUser(@Args('createUserInput') createUserInput: CreateUserDto) {
        return this.usersService.create(createUserInput);
    }

    @Query(() => [UserEntity], { name: 'users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Query(() => UserEntity, { name: 'user' })
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => UserEntity)
    updateUser(
        @Args('id', { type: () => ID }) id: string,
        @Args('updateUserInput') updateUserInput: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserInput);
    }

    @Mutation(() => UserEntity)
    removeUser(@Args('id', { type: () => ID }) id: string) {
        return this.usersService.remove(id);
    }

    @Query(() => [CourseEntity], { name: 'enrolledCourses' })
    getEnrolledCourses(@Args('userId', { type: () => ID }) userId: string) {
        return this.usersService.getEnrollments(userId);
    }

    @Query(() => [CourseEntity], { name: 'createdCourses' })
    getCreatedCourses(@Args('userId', { type: () => ID }) userId: string) {
        return this.usersService.getCreatedCourses(userId);
    }

    @Query(() => [AchievementEntity], { name: 'achievements' })
    getAchievements(@Args('userId', { type: () => ID }) userId: string) {
        return this.usersService.getAchievements(userId);
    }
} 