import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChannelsService } from './channels.service';
import { ChannelEntity } from 'dtos/Channel.entity';
import { MessageEntity } from 'dtos/Message.entity';
import { CreateChannelDto } from 'dtos/Channel.create.dto';
import { UpdateChannelDto } from 'dtos/Channel.update.dto';

@Resolver(() => ChannelEntity)
export class ChannelsResolver {
    constructor(private readonly channelsService: ChannelsService) { }

    @Mutation(() => ChannelEntity)
    createChannel(@Args('createChannelInput') createChannelInput: CreateChannelDto) {
        return this.channelsService.create(createChannelInput);
    }

    @Query(() => [ChannelEntity], { name: 'channels' })
    findAll() {
        return this.channelsService.findAll();
    }

    @Query(() => ChannelEntity, { name: 'channel' })
    findOne(@Args('id') id: string) {
        return this.channelsService.findOne(id);
    }

    @Mutation(() => ChannelEntity)
    updateChannel(
        @Args('id') id: string,
        @Args('updateChannelInput') updateChannelInput: UpdateChannelDto,
        @Args('userId') userId: string,
    ) {
        return this.channelsService.update(id, updateChannelInput, userId);
    }

    @Mutation(() => ChannelEntity)
    removeChannel(@Args('id') id: string, @Args('userId') userId: string) {
        return this.channelsService.remove(id, userId);
    }

    @Mutation(() => ChannelEntity)
    addChannelMember(
        @Args('channelId') channelId: string,
        @Args('userId') userId: string,
        @Args('ownerId') ownerId: string,
    ) {
        return this.channelsService.addMember(channelId, userId, ownerId);
    }

    @Mutation(() => ChannelEntity)
    removeChannelMember(
        @Args('channelId') channelId: string,
        @Args('userId') userId: string,
        @Args('ownerId') ownerId: string,
    ) {
        return this.channelsService.removeMember(channelId, userId, ownerId);
    }

    @Query(() => [ChannelEntity], { name: 'userChannels' })
    getUserChannels(@Args('userId') userId: string) {
        return this.channelsService.getUserChannels(userId);
    }

    @Mutation(() => MessageEntity)
    sendChannelMessage(
        @Args('channelId') channelId: string,
        @Args('userId') userId: string,
        @Args('content') content: string,
    ) {
        return this.channelsService.sendMessage(channelId, userId, content);
    }
} 