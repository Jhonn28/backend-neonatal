import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class DeleteDto{
    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    tableName: string;

    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    primaryField:string;


    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    valuePrimaryField:string;

}