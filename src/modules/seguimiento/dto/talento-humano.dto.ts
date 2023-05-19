import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TalentoHumanoDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thpro: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    numero_thcapro: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    capacitado_sm_thcapro: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_thcapro: string;
}
