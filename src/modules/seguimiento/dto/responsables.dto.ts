import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class ResponsableDto{

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number; 

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    supervisor_supesup: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cargo_supesup: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    observacion_supesup: string;
}
