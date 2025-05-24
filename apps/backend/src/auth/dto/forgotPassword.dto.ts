import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
    @IsNotEmpty()
    @ApiProperty({ type: "string", example: "test@example.com" })
    email: string;
}