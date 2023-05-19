import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class NudoCriticoDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    medicamento_no_disponible_farmn: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    causas_farmnud: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    acciones_farnnud: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsable_farmnud: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cargo_farmnud: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_cumplimiento_farmnud: string;
}
