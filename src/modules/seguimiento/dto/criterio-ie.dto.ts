import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
export class CriterioIEDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total_pacientes_atendido_thcri: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    criterio_inclusion_thcri: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    porcentaje_inclusion_thcri: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    criterios_exclusion_thcri: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    porcentaje_exclusion_thcri: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_thcri: string;


}
