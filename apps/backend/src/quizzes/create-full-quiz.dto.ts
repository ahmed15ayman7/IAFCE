import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from 'dtos/Question.create.dto';
import { CreateOptionDto } from 'dtos/Option.create.dto';

export class CreateOptionNestedDto extends CreateOptionDto {
    @ApiProperty()
    text: string;

    @ApiProperty()
    isCorrect: boolean;
}

export class CreateQuestionNestedDto extends CreateQuestionDto {
    @ApiProperty()
    text: string;

    @ApiProperty({ type: [CreateOptionNestedDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOptionNestedDto)
    options: CreateOptionNestedDto[];
}

export class CreateFullQuizDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: [CreateQuestionNestedDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionNestedDto)
    questions: CreateQuestionNestedDto[];
}
