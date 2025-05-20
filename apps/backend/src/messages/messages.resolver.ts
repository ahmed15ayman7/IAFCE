import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { MessageEntity } from 'dtos/Message.entity';
import { CreateMessageDto } from 'dtos/Message.create.dto';
import { UpdateMessageDto } from 'dtos/Message.update.dto';

@Resolver(() => MessageEntity)
export class MessagesResolver {
    constructor(private readonly messagesService: MessagesService) { }

    @Mutation(() => MessageEntity)
    createMessage(@Args('createMessageInput') createMessageInput: CreateMessageDto) {
        return this.messagesService.create(createMessageInput);
    }

    @Query(() => [MessageEntity], { name: 'messages' })
    findAll() {
        return this.messagesService.findAll();
    }

    @Query(() => MessageEntity, { name: 'message' })
    findOne(@Args('id') id: string) {
        return this.messagesService.findOne(id);
    }

    @Mutation(() => MessageEntity)
    updateMessage(@Args('id') id: string, @Args('updateMessageInput') updateMessageInput: UpdateMessageDto) {
        return this.messagesService.update(id, updateMessageInput);
    }

    @Mutation(() => MessageEntity)
    removeMessage(@Args('id') id: string) {
        return this.messagesService.remove(id);
    }

    @Mutation(() => MessageEntity)
    markMessageAsRead(@Args('id') id: string) {
        return this.messagesService.markAsRead(id);
    }

    @Query(() => [MessageEntity], { name: 'userMessages' })
    getUserMessages(@Args('userId') userId: string) {
        return this.messagesService.getUserMessages(userId);
    }

    @Query(() => [MessageEntity], { name: 'conversation' })
    getConversation(
        @Args('userId1') userId1: string,
        @Args('userId2') userId2: string,
    ) {
        return this.messagesService.getConversation(userId1, userId2);
    }
} 