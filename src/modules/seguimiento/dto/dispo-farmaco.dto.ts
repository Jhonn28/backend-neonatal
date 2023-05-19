import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsBoolean, IsString } from 'class-validator';

export class DispoFarmacoDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_fararefar: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    disponible_farmdis: boolean;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidad_farmdis: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_caducidad_farmdis: string;

}
