import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CalidadHCDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_hcpar: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    puntuacion_hccal: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    observacion_hccal: string;
}
