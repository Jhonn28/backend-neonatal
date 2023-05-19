import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class BuscarDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_de: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_hasta: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    distrito: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    establecimiento: number;

}
