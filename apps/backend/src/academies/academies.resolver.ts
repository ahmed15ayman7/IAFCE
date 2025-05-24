import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AcademiesService } from './academies.service';
import { AcademyEntity } from 'dtos/Academy.entity';
import { CreateAcademyDto } from 'dtos/Academy.create.dto';
import { UpdateAcademyDto } from 'dtos/Academy.update.dto';

@Resolver(() => AcademyEntity)
export class AcademiesResolver {
    constructor(private readonly academiesService: AcademiesService) { }

    @Mutation(() => AcademyEntity)
    createAcademy(@Args('createAcademyInput') createAcademyInput: CreateAcademyDto) {
        return this.academiesService.create(createAcademyInput);
    }


    @Query(() => [AcademyEntity], { name: 'academies' })
    findAll() {
        return this.academiesService.findAll();
    }

    @Query(() => AcademyEntity, { name: 'academy' })
    findOne(@Args('id') id: string) {
        return this.academiesService.findOne(id);
    }

    @Mutation(() => AcademyEntity)
    updateAcademy(@Args('id') id: string, @Args('updateAcademyInput') updateAcademyInput: UpdateAcademyDto) {
        return this.academiesService.update(id, updateAcademyInput);
    }

    @Mutation(() => AcademyEntity)
    removeAcademy(@Args('id') id: string) {
        return this.academiesService.remove(id);
    }

    @Mutation(() => AcademyEntity)
    addInstructor(
        @Args('academyId') academyId: string,
        @Args('instructorId') instructorId: string,
    ) {
        return this.academiesService.addInstructor(academyId, instructorId);
    }

    @Mutation(() => AcademyEntity)
    removeInstructor(
        @Args('academyId') academyId: string,
        @Args('instructorId') instructorId: string,
    ) {
        return this.academiesService.removeInstructor(academyId, instructorId);
    }
} 