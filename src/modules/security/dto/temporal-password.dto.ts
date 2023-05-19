import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TemporalPasswordDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newPassword: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    user: number;
}
