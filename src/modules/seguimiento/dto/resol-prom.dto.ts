import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ResolPromDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_sprp: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    equipo_supervisor_sprp: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    actividad_fortalecimiento_sprp: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nudo_critico_detectado_sprp: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    resultado_sprp: number;

}
