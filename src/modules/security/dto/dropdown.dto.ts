import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ConditionDto } from './condition-dto';

export class DropdownDto{
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
    primaryField: string;


    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    nameField:string;


    @ApiProperty({
        required:false
    })
    @IsNotEmpty()
    condition: any;

    

}