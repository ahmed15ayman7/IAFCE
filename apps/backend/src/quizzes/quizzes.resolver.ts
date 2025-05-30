import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from 'dtos/Quiz.create.dto';
import { UpdateQuizDto } from 'dtos/Quiz.update.dto';
import { QuizEntity } from 'dtos/Quiz.entity';

@Resolver(() => QuizEntity)
export class QuizzesResolver {
    constructor(private readonly quizzesService: QuizzesService) { }

    // @Mutation(() => QuizEntity)
    // create(@Args('createQuizInput') createQuizInput: CreateQuizDto) {
    //     return this.quizzesService.create(createQuizInput);
    // }

    @Query(() => [QuizEntity])
    findAll() {
        return this.quizzesService.findAll();
    }

    @Query(() => QuizEntity)
    findOne(@Args('id', { type: () => ID }) id: string) {
        return this.quizzesService.findOne(id);
    }

    @Mutation(() => QuizEntity)
    update(@Args('id') id: string, @Args('updateQuizInput') updateQuizInput: UpdateQuizDto) {
        return this.quizzesService.update(id, updateQuizInput);
    }

    @Mutation(() => QuizEntity)
    remove(@Args('id', { type: () => ID }) id: string) {
        return this.quizzesService.remove(id);
    }

    // @Mutation(() => QuizEntity)
    // submitQuizAttempt(
    //     @Args('quizId', { type: () => ID }) quizId: string,
    //     @Args('userId', { type: () => ID }) userId: string,
    //     @Args('answers', { type: () => [String] }) answers: { questionId: string; answer: string }[],
    // ) {
    //     return this.quizzesService.submitQuizAttempt(quizId, userId, answers);
    // }
} 