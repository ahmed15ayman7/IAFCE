import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventDto } from 'dtos/Event.create.dto';
import { UpdateEventDto } from 'dtos/Event.update.dto';
import { EventEntity } from 'dtos/Event.entity';

@Resolver(() => EventEntity)
export class EventsResolver {
    constructor(private readonly eventsService: EventsService) { }

    @Mutation(() => EventEntity)
    create(@Args('createEventInput') createEventInput: CreateEventDto) {
        return this.eventsService.create(createEventInput);
    }

    @Query(() => [EventEntity])
    findAll() {
        return this.eventsService.findAll();
    }

    @Query(() => EventEntity)
    findOne(@Args('id') id: string) {
        return this.eventsService.findOne(id);
    }

    @Mutation(() => EventEntity)
    update(@Args('id') id: string, @Args('updateEventInput') updateEventInput: UpdateEventDto) {
        return this.eventsService.update(id, updateEventInput);
    }

    @Mutation(() => EventEntity)
    remove(@Args('id') id: string) {
        return this.eventsService.remove(id);
    }
} 