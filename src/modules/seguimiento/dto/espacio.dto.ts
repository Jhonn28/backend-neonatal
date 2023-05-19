import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EspacioDto{
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_gthesp: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    numero_thcesp:  number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    tiempo_parcial_thcesp: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    tiempo_completo_thcesp: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_thcesp: string;
}
