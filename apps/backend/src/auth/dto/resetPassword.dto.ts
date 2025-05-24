import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString({ message: 'Token must be a string' })
    @ApiProperty({ type: "string", example: "reset_token" })
    token: string;
    @IsNotEmpty()
    @IsString({ message: 'Password must be a string' })
    @ApiProperty({ type: "string", example: "password" })
    password: string;
}