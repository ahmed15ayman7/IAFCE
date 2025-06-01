import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
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
} 