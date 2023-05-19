import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class IncidenciaDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_incdiag: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_enero: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_febrero: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_marzo: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_abril: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_mayo: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_junio: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_julio: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_agosto: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_septiembre: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_octubre: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_noviembre: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    casos_diciembre: number;

}
