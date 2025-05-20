import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from 'dtos/Enrollment.create.dto';
import { UpdateEnrollmentDto } from 'dtos/Enrollment.update.dto';
import { EnrollmentEntity } from 'dtos/Enrollment.entity';

@Resolver(() => EnrollmentEntity)
export class EnrollmentsResolver {
    constructor(private readonly enrollmentsService: EnrollmentsService) { }

    @Mutation(() => EnrollmentEntity)
    create(@Args('createEnrollmentInput') createEnrollmentInput: CreateEnrollmentDto) {
        return this.enrollmentsService.create(createEnrollmentInput);
    }

    @Query(() => [EnrollmentEntity])
    findAll() {
        return this.enrollmentsService.findAll();
    }

    @Query(() => EnrollmentEntity)
    findOne(@Args('id') id: string) {
        return this.enrollmentsService.findOne(id);
    }

    @Mutation(() => EnrollmentEntity)
    update(@Args('id') id: string, @Args('updateEnrollmentInput') updateEnrollmentInput: UpdateEnrollmentDto) {
        return this.enrollmentsService.update(id, updateEnrollmentInput);
    }

    @Mutation(() => EnrollmentEntity)
    remove(@Args('id') id: string) {
        return this.enrollmentsService.remove(id);
    }
} 