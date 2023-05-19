import { IsString, IsNotEmpty, IsNumber, IsEmail, IsOptional, isNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TalentoHumanoDto } from './talento-humano.dto';
import { EspacioDto } from './espacio.dto';
import { MaterialDto } from './material.dto';
import { DocumentacionDto } from './documentacion.dto';
import { IncidenciaDto } from './incidencia.dto';
import { CriterioIEDto } from './criterio-ie.dto';
import { DisponibilidadHCDto } from './disponibilidad-hc.dto';
import { DispoFarmacoDto } from './dispo-farmaco.dto';
import { RecetarioDto } from './recetario.dto';
import { EspecialidadActividadDto } from './especialidad-actividad.dto';
import { CalidadHCDto } from './calidad-hc.dto';
import { NudoCriticoDto } from './nudo-critico.dto';
import { ResolPromDto } from './resol-prom.dto';
import { CapacitacionAnualDto } from './capacitacion-anual.dto';
import { ContraReferenciaDto } from './contra-referencia.dto';
import { ProcesoAdministrativoDto } from './proceso-administrativo.dto';
import { IndicadorDto } from './indicadores.dto';
import { AcuerdoDto } from './acuerdos.dto';
import { ObservacionDto } from './observaciones.dto';
import { ResponsableDto } from './responsables.dto';

export class EncabezadoSupervisionDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_segdis: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    ide_seges: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsable_zona_thcab: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsable_distrito_thcab: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsable_establecimiento_thcab: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsable_central_thcab: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre_establecimiento_thcab: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tipo_establecimiento_thcab: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    nro_zona_thcab: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    provincia_thcab: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ciudad_thcab: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_thcab: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    hora_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total_talento_humano_thcab: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    recetario_distrito_thcab: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    puntaje_thcab: number;

    @ApiProperty()
    @IsNotEmpty()
    talento_humano: TalentoHumanoDto[];

    @ApiProperty()
    @IsNotEmpty()
    espacio: EspacioDto[];

    @ApiProperty()
    @IsNotEmpty()
    material: MaterialDto[];

    @ApiProperty()
    @IsNotEmpty()
    documentacion: DocumentacionDto[];

    @ApiProperty()
    @IsNotEmpty()
    incidencia: IncidenciaDto[];

    @ApiProperty()
    @IsNotEmpty()
    criterioIE: CriterioIEDto[];

    @ApiProperty()
    @IsNotEmpty()
    disponibilidadHC: DisponibilidadHCDto[];

    @ApiProperty()
    @IsNotEmpty()
    calidadHC: CalidadHCDto[];

    @ApiProperty()
    @IsNotEmpty()
    dispoFarmaco: DispoFarmacoDto[];

    @ApiProperty()
    @IsOptional()
    recetario: RecetarioDto[];

    @ApiProperty()
    @IsOptional()
    nudoCritico: NudoCriticoDto[];

    @ApiProperty()
    @IsNotEmpty()
    especialidadActividad: EspecialidadActividadDto[];

    @ApiProperty()
    @IsOptional()
    resolProm: ResolPromDto[];

    @ApiProperty()
    @IsOptional()
    capacitacionAnual: CapacitacionAnualDto[];

    @ApiProperty()
    @IsOptional()
    contraReferencia: ContraReferenciaDto[];

    @ApiProperty()
    @IsNotEmpty()
    procesoAdministrativo: ProcesoAdministrativoDto[];

    @ApiProperty()
    @IsNotEmpty()
    indicadores: IndicadorDto[];

    @ApiProperty()
    @IsOptional()
    acuerdos: AcuerdoDto[];

    @ApiProperty()
    @IsOptional()
    observaciones: ObservacionDto[];

    @ApiProperty()
    @IsOptional()
    responsables: ResponsableDto[];



}
