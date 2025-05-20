import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AchievementsService } from './achievements.service';
import { AchievementEntity } from 'dtos/Achievement.entity';
import { CreateAchievementDto } from 'dtos/Achievement.create.dto';
import { UpdateAchievementDto } from 'dtos/Achievement.update.dto';

@Resolver(() => AchievementEntity)
export class AchievementsResolver {
    constructor(private readonly achievementsService: AchievementsService) { }

    @Mutation(() => AchievementEntity)
    createAchievement(@Args('createAchievementInput') createAchievementInput: CreateAchievementDto) {
        return this.achievementsService.create(createAchievementInput);
    }

    @Query(() => [AchievementEntity], { name: 'achievements' })
    findAll() {
        return this.achievementsService.findAll();
    }

    @Query(() => AchievementEntity, { name: 'achievement' })
    findOne(@Args('id') id: string) {
        return this.achievementsService.findOne(id);
    }

    @Mutation(() => AchievementEntity)
    updateAchievement(@Args('id') id: string, @Args('updateAchievementInput') updateAchievementInput: UpdateAchievementDto) {
        return this.achievementsService.update(id, updateAchievementInput);
    }

    @Mutation(() => AchievementEntity)
    removeAchievement(@Args('id') id: string) {
        return this.achievementsService.remove(id);
    }

    @Mutation(() => AchievementEntity)
    assignAchievementToUser(
        @Args('achievementId') achievementId: string,
        @Args('userId') userId: string,
    ) {
        return this.achievementsService.assignAchievementToUser(achievementId, userId);
    }

    @Mutation(() => AchievementEntity)
    removeAchievementFromUser(
        @Args('achievementId') achievementId: string,
        @Args('userId') userId: string,
    ) {
        return this.achievementsService.removeAchievementFromUser(achievementId, userId);
    }
} 