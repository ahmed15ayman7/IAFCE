import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { GroupEntity } from 'dtos/Group.entity';
import { CreateGroupDto } from 'dtos/Group.create.dto';
import { UpdateGroupDto } from 'dtos/Group.update.dto';

@Resolver(() => GroupEntity)
export class GroupsResolver {
    constructor(private readonly groupsService: GroupsService) { }

    @Mutation(() => GroupEntity)
    createGroup(@Args('createGroupInput') createGroupInput: CreateGroupDto) {
        return this.groupsService.create(createGroupInput);
    }

    @Query(() => [GroupEntity], { name: 'groups' })
    findAll() {
        return this.groupsService.findAll();
    }

    @Query(() => GroupEntity, { name: 'group' })
    findOne(@Args('id') id: string) {
        return this.groupsService.findOne(id);
    }

    @Mutation(() => GroupEntity)
    updateGroup(
        @Args('id') id: string,
        @Args('updateGroupInput') updateGroupInput: UpdateGroupDto,
        @Args('userId') userId: string,
    ) {
        return this.groupsService.update(id, updateGroupInput, userId);
    }

    @Mutation(() => GroupEntity)
    removeGroup(@Args('id') id: string, @Args('userId') userId: string) {
        return this.groupsService.remove(id, userId);
    }

    @Mutation(() => GroupEntity)
    addGroupMember(
        @Args('groupId') groupId: string,
        @Args('userId') userId: string,
        @Args('adminId') adminId: string,
    ) {
        return this.groupsService.addMember(groupId, userId, adminId);
    }

    @Mutation(() => GroupEntity)
    removeGroupMember(
        @Args('groupId') groupId: string,
        @Args('userId') userId: string,
        @Args('adminId') adminId: string,
    ) {
        return this.groupsService.removeMember(groupId, userId, adminId);
    }

    @Query(() => [GroupEntity], { name: 'userGroups' })
    getUserGroups(@Args('userId') userId: string) {
        return this.groupsService.getUserGroups(userId);
    }
} 