import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class MaterialDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thmat: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    disponibilidad_thcmat: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    estado_thcmat: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_thcmat: string; 
}
