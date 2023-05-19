import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AcuerdoDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ide_thcab: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    acuerdo_acucomp: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsable_acucomp: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cargo_acucomp: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_acucomp: string;
}
