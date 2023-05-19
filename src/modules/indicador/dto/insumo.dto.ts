import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class InsumoDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    ide_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    ide_indare: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    ide_indins: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    uno_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    dos_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tres_hlic: number;
}
