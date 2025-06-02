import { Controller, Post, Body, Get, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin-auth')
export class AdminAuthController {
    constructor(private readonly adminAuthService: AdminAuthService) { }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        return this.adminAuthService.login(loginDto.email, loginDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return this.adminAuthService.getProfile(req.user.id);
    }

    @UseGuards(AuthGuard)
    @Get('dashboard/stats')
    async getDashboardStats(
        @Request() req,
        @Query('timeRange') timeRange: 'day' | 'week' | 'month' | 'year' = 'month'
    ) {
        return this.adminAuthService.getDashboardStats(req.user.id, timeRange);
    }
} 