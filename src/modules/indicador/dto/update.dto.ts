import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty} from "class-validator";

export class UpdateHerramientaDto {


        @ApiProperty()
        @IsNotEmpty()
        cabecera: Object;
    
        @ApiProperty()
        @IsNotEmpty()
        indicadores: Array<Object>;

        @ApiProperty()
        @IsNotEmpty()
        promedio: Array<Object>;
  

}
