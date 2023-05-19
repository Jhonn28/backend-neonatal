import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto{
    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    email:string;


    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    foto:string;

}