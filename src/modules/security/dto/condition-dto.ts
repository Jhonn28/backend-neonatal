import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ConditionDto{
    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    condition: string;

    @ApiProperty({
        required:true
    })
    @IsNotEmpty()
    values: [];

}