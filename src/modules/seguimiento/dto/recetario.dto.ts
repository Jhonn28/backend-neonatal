import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class RecetarioDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_gtemp: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    nro_recetas_emitidas_farmrec: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    nro_recetas_disponibles_farmrec: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_farmrec:number;
}
