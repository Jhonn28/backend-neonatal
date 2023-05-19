import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class DisponibilidadHCDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_hcasp: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    consulta_externa_hcdisp: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_hcdisp: string;
}
