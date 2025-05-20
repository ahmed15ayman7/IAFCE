import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from 'dtos/Profile.create.dto';
import { UpdateProfileDto } from 'dtos/Profile.update.dto';
import { ProfileEntity } from 'dtos/Profile.entity';

@Resolver(() => ProfileEntity)
export class ProfilesResolver {
    constructor(private readonly profilesService: ProfilesService) { }

    @Mutation(() => ProfileEntity)
    create(@Args('createProfileInput') createProfileInput: CreateProfileDto) {
        return this.profilesService.create(createProfileInput);
    }

    @Query(() => [ProfileEntity])
    findAll() {
        return this.profilesService.findAll();
    }

    @Query(() => ProfileEntity)
    findOne(@Args('id') id: string) {
        return this.profilesService.findOne(id);
    }

    @Mutation(() => ProfileEntity)
    update(@Args('id') id: string, @Args('updateProfileInput') updateProfileInput: UpdateProfileDto) {
        return this.profilesService.update(id, updateProfileInput);
    }

    @Mutation(() => ProfileEntity)
    remove(@Args('id') id: string) {
        return this.profilesService.remove(id);
    }
} 