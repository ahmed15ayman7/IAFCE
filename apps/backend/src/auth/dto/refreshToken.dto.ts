import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString({ message: 'Refresh token must be a string' })
    @ApiProperty({ type: "string", example: "refresh_token" })
    refreshToken: string;
}