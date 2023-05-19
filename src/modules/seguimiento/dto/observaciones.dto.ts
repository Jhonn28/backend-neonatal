import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ObservacionDto{
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_thcab: number;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    observacion_evab: string;
}
