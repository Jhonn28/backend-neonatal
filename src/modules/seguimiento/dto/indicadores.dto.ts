import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class IndicadorDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_evin: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    puntaje_evagen:number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_evagen: string;
}
