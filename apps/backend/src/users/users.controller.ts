import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from 'dtos/User.create.dto';
import { UpdateUserDto } from 'dtos/User.update.dto';

@ApiTags('المستخدمين')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء مستخدم جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء المستخدم بنجاح' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المستخدمين' })
    @ApiResponse({ status: 200, description: 'تم جلب المستخدمين بنجاح' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب المستخدم بنجاح' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات مستخدم' })
    @ApiResponse({ status: 200, description: 'تم تحديث المستخدم بنجاح' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف مستخدم' })
    @ApiResponse({ status: 200, description: 'تم حذف المستخدم بنجاح' })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
} 