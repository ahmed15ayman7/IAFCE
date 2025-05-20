import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';
import { QuestionEntity } from 'dtos/Question.entity';
import { CreateQuestionDto } from 'dtos/Question.create.dto';
import { UpdateQuestionDto } from 'dtos/Question.update.dto';

@Resolver(() => QuestionEntity)
export class QuestionsResolver {
    constructor(private readonly questionsService: QuestionsService) { }

    @Mutation(() => QuestionEntity)
    createQuestion(@Args('createQuestionInput') createQuestionInput: CreateQuestionDto) {
        return this.questionsService.create(createQuestionInput);
    }

    @Query(() => [QuestionEntity], { name: 'questions' })
    findAll() {
        return this.questionsService.findAll();
    }

    @Query(() => QuestionEntity, { name: 'question' })
    findOne(@Args('id') id: string) {
        return this.questionsService.findOne(id);
    }

    @Mutation(() => QuestionEntity)
    updateQuestion(@Args('id') id: string, @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionDto) {
        return this.questionsService.update(id, updateQuestionInput);
    }

    @Mutation(() => QuestionEntity)
    removeQuestion(@Args('id') id: string) {
        return this.questionsService.remove(id);
    }

    @Mutation(() => QuestionEntity)
    markQuestionAsAnswered(@Args('id') id: string) {
        return this.questionsService.markAsAnswered(id);
    }

    @Mutation(() => QuestionEntity)
    markQuestionAsUnanswered(@Args('id') id: string) {
        return this.questionsService.markAsUnanswered(id);
    }
} 