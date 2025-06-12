import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, ExpenseType } from '@shared/prisma';
import { CreateExpenseDto } from 'dtos/Expense.create.dto';

@Controller('expenses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    create(@Body() createExpenseDto: CreateExpenseDto) {
        return this.expensesService.createExpense(createExpenseDto);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    findAll(@Query() query: any) {
        return this.expensesService.getExpenses(query);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN)
    findOne(@Param('id') id: string) {
        return this.expensesService.getExpenseById(id);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN)
    update(@Param('id') id: string, @Body() updateExpenseDto: any) {
        return this.expensesService.updateExpense(id, updateExpenseDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.expensesService.deleteExpense(id);
    }

    @Get('statistics')
    async getStatistics(@Query('branchId') branchId?: string) {
        return this.expensesService.getStatistics(branchId);
    }

    @Get('statistics/type')
    async getTypeStatistics(@Query('branchId') branchId?: string) {
        return this.expensesService.getTypeStatistics(branchId);
    }

    @Get('statistics/monthly')
    async getMonthlyStatistics(@Query('branchId') branchId?: string) {
        return this.expensesService.getMonthlyStatistics(branchId);
    }
} 