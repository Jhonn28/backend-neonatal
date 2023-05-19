import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class IndicadoresDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ide: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    campo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tabla: string;


}
