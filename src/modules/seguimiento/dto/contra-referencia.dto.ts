import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
export class ContraReferenciaDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_sppro: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total_sprc: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    justificado_sprc: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    establecimiento_de_sprc: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    establecimiento_a_sprc: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_sprc: string;
}
