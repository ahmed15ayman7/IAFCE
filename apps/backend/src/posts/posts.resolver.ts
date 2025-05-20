import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostEntity } from 'dtos/Post.entity';
import { CreatePostDto } from 'dtos/Post.create.dto';
import { UpdatePostDto } from 'dtos/Post.update.dto';
import { CreateCommentDto } from 'dtos/Comment.create.dto';
import { UpdateCommentDto } from 'dtos/Comment.update.dto';
import { Post } from '@nestjs/common';
import { CommentEntity } from 'dtos/Comment.entity';

@Resolver(() => PostEntity)
export class PostsResolver {
    constructor(private readonly postsService: PostsService) { }

    @Mutation(() => PostEntity)
    createPost(@Args('createPostInput') createPostInput: CreatePostDto) {
        return this.postsService.create(createPostInput);
    }

    @Query(() => [PostEntity], { name: 'posts' })
    findAll() {
        return this.postsService.findAll();
    }

    @Query(() => PostEntity, { name: 'post' })
    findOne(@Args('id') id: string) {
        return this.postsService.findOne(id);
    }

    @Mutation(() => PostEntity)
    updatePost(@Args('id') id: string, @Args('updatePostInput') updatePostInput: UpdatePostDto) {
        return this.postsService.update(id, updatePostInput);
    }

    @Mutation(() => PostEntity)
    removePost(@Args('id') id: string) {
        return this.postsService.remove(id);
    }

    @Mutation(() => PostEntity)
    likePost(@Args('id') id: string) {
        return this.postsService.likePost(id);
    }

    @Mutation(() => PostEntity)
    unlikePost(@Args('id') id: string) {
        return this.postsService.unlikePost(id);
    }

    @Query(() => [PostEntity], { name: 'userPosts' })
    getUserPosts(@Args('userId') userId: string) {
        return this.postsService.getUserPosts(userId);
    }
    @Mutation(() => CommentEntity)
    createComment(@Args('postId') postId: string, @Args('createCommentDto') createCommentDto: CreateCommentDto) {
        return this.postsService.createComment(postId, createCommentDto);
    }
    @Query(() => [CommentEntity], { name: 'postComments' })
    getPostComments(@Args('postId') postId: string) {
        return this.postsService.getPostComments(postId);
    }
    @Mutation(() => CommentEntity)
    updateComment(@Args('commentId') commentId: string, @Args('updateCommentDto') updateCommentDto: UpdateCommentDto) {
        return this.postsService.updateComment(commentId, updateCommentDto);
    }
    @Mutation(() => CommentEntity)
    deleteComment(@Args('commentId') commentId: string) {
        return this.postsService.deleteComment(commentId);
    }

} 