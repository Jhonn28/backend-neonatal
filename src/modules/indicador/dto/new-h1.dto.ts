import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { InsumoDto } from "./insumo.dto";

export class CreateHerramientaUnoDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    ide_seges: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    ide_segdis: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    zona_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    provincia_hlic: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    distrito_hlic: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    establecimiento_hlic: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fecha_medicion_hlic: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ide_indtp: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    responsable_medicion_hlic: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    promedio_preparacion_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    promedio_gineco_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    promedio_farmacia_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    promedio_laboratorio_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    promedio_servicio_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    promedio_charol_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    promedio_atencion_parto_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    promedio_atencion_nacido_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    items_cumple_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    total_items_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    porcentaje_estandar_hlic: number;

    @ApiProperty()
    @IsNotEmpty()
    insumos: InsumoDto[];

    @ApiProperty()
    @IsNotEmpty()
    consultorio: InsumoDto[];


    @ApiProperty()
    @IsNotEmpty()
    farmacia: InsumoDto[];

    @ApiProperty()
    @IsNotEmpty()
    laboratorio: InsumoDto[];

    @ApiProperty()
    @IsNotEmpty()
    servicio: InsumoDto[];

    @ApiProperty()
    @IsNotEmpty()
    charol_emergencia: InsumoDto[];

    @ApiProperty()
    @IsNotEmpty()
    atencion_parto: InsumoDto[];

    @ApiProperty()
    @IsNotEmpty()
    atencion_nacido: InsumoDto[];


}
