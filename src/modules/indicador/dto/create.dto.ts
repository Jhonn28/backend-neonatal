import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateHerramientaDto {


        @ApiProperty()
        @IsNotEmpty()
        cabecera:any;
    
        @ApiProperty()
        @IsNotEmpty()
        indicadores:any;

        @ApiProperty()
        @IsNotEmpty()
        promedio: any;
  

}
