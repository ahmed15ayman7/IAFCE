import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountingService } from './accounting.service';
import { CreateAccountingEntryDto } from '../../dtos/AccountingEntry.create.dto';
import { UpdateAccountingEntryDto } from '../../dtos/AccountingEntry.update.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('accounting')
export class AccountingController {
    constructor(private readonly accountingService: AccountingService) { }

    @Post()
    create(@Body() createAccountingEntryDto: CreateAccountingEntryDto) {
        return this.accountingService.create(createAccountingEntryDto);
    }

    @Get()
    findAll() {
        return this.accountingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.accountingService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAccountingEntryDto: UpdateAccountingEntryDto) {
        return this.accountingService.update(id, updateAccountingEntryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.accountingService.remove(id);
    }

    @Get('invoices')
    findAllInvoices() {
        return this.accountingService.findAllInvoices();
    }

    @Get('salary-payments')
    findAllSalaryPayments() {
        return this.accountingService.findAllSalaryPayments();
    }

    @Get('summary')
    getAccountingSummary() {
        return this.accountingService.getAccountingSummary();
    }
} 