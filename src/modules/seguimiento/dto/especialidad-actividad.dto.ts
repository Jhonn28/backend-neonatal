import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class EspecialidadActividadDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thesac: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    calificacion_thactis: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_thactis: string;
}
