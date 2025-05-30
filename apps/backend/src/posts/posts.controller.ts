import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from '../../dtos/Post.create.dto';
import { UpdatePostDto } from '../../dtos/Post.update.dto';
import { Comment, Post as PostModel } from '@shared/prisma';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCommentDto } from 'dtos/Comment.create.dto';
import { UpdateCommentDto } from 'dtos/Comment.update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('المنشورات')
@Controller('posts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
        return this.postsService.create(createPostDto);
    }

    @Get()
    async findAll(): Promise<PostModel[]> {
        return this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PostModel> {
        return this.postsService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostModel> {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<PostModel> {
        return this.postsService.remove(id);
    }
    @Post(':id/like')
    async likePost(@Param('id') id: string): Promise<PostModel> {
        return this.postsService.likePost(id);
    }
    @Post(':id/unlike')
    async unlikePost(@Param('id') id: string): Promise<PostModel> {
        return this.postsService.unlikePost(id);
    }
    @Get('user/:userId')
    async getUserPosts(@Param('userId') userId: string): Promise<PostModel[]> {
        return this.postsService.getUserPosts(userId);
    }
    @Post(':id/comments')
    async createComment(@Param('id') id: string, @Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.postsService.createComment(id, createCommentDto);
    }
    @Get(':id/comments')
    async getPostComments(@Param('id') id: string): Promise<Comment[]> {
        return this.postsService.getPostComments(id);
    }
    @Put(':id/comments/:commentId')
    async updateComment(@Param('commentId') commentId: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
        return this.postsService.updateComment(commentId, updateCommentDto);
    }
    @Delete(':id/comments/:commentId')
    async deleteComment(@Param('commentId') commentId: string): Promise<Comment> {
        return this.postsService.deleteComment(commentId);
    }

} 
