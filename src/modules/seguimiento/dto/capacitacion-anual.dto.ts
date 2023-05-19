import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CapacitacionAnualDto{

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tema_sppca: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total_profesional_capacitar_spp: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    nro_capacitado_sppca: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    porcentaje_sppca: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total_horas_sppca: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_sppca: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    actualizado_sppca: boolean;
}
