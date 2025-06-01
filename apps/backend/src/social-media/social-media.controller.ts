import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('المنشورات')
@Controller('social-media')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class SocialMediaController {
    constructor(private readonly socialMediaService: SocialMediaService) { }

    @Post()
    async createPost(
        @Body('userId') userId: string,
        @Body('content') content: string,
        @Body('title') title: string,
    ) {
        return this.socialMediaService.createPost(userId, content, title);
    }

    @Get(':id')
    async getPost(@Param('id') id: string) {
        return this.socialMediaService.getPost(id);
    }

    @Put(':id')
    async updatePost(
        @Param('id') id: string,
        @Body('content') content: string,
        @Body('title') title: string,
    ) {
        return this.socialMediaService.updatePost(id, content, title);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return this.socialMediaService.deletePost(id);
    }

    @Get()
    async listPosts() {
        return this.socialMediaService.listPosts();
    }
} 