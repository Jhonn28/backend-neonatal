import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class ProcesoAdministrativoDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_supa: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cero_suppa: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    uno_tres_suppa: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cuatro_seis_suppa: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    siete_mas_suppa: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    observacion_suppa: string;
}
