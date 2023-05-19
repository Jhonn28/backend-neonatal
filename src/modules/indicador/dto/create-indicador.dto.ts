import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InsumoDto } from "./insumo.dto";

export class CreateIndicadorDto {

    
       
        @ApiProperty()
        @IsNotEmpty()
        cabecera: Object;
    
        @ApiProperty()
        @IsNotEmpty()
        indicadores: Array<Object>;

    
    

}
