import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';


export class IsUniqueDto{
    @ApiProperty({
        description:"Nombre de la tabla",
        required:true
    })
    @IsString()
    @IsNotEmpty()
    tableName: string;

    @ApiProperty({
        required:true
    })
    @IsNumber()
    @IsNotEmpty()
    field: string;

    @ApiProperty({
        required:true
    })
    @IsString()
    @IsNotEmpty()
    valueField: [];
}