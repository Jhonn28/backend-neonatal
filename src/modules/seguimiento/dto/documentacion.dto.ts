import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator';

export class DocumentacionDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thtipdoc: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    activo_thdoc: boolean;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_thdoc: string;
}
