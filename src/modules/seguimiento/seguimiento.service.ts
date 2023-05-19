import { Injectable, BadRequestException } from '@nestjs/common';
import { PoolService } from '../pool/pool.service';
import { EncabezadoSupervisionDto } from './dto/encabezado-supervision.dto';
import { TalentoHumanoDto } from './dto/talento-humano.dto';
import { EspacioDto } from './dto/espacio.dto';
import { MaterialDto } from './dto/material.dto';
import { DocumentacionDto } from './dto/documentacion.dto';
import { IncidenciaDto } from './dto/incidencia.dto';
import { CriterioIEDto } from './dto/criterio-ie.dto';
import { DisponibilidadHCDto } from './dto/disponibilidad-hc.dto';
import { CalidadHCDto } from './dto/calidad-hc.dto';
import { DispoFarmacoDto } from './dto/dispo-farmaco.dto';
import { RecetarioDto } from './dto/recetario.dto';
import { NudoCriticoDto } from './dto/nudo-critico.dto';
import { EspecialidadActividadDto } from './dto/especialidad-actividad.dto';
import { ResolPromDto } from './dto/resol-prom.dto';
import { CapacitacionAnualDto } from './dto/capacitacion-anual.dto';
import { ContraReferenciaDto } from './dto/contra-referencia.dto';
import { ProcesoAdministrativoDto } from './dto/proceso-administrativo.dto';
import { IndicadorDto } from './dto/indicadores.dto';
import { AcuerdoDto } from './dto/acuerdos.dto';
import { ObservacionDto } from './dto/observaciones.dto';
import { BuscarDto } from './dto/buscar.dto';
import Seguimiento from '@common/class/seguimiento.class';
import { ResponsableDto } from './dto/responsables.dto';
import ListaSeguimiento from '@common/class/lista-seguimiento.class';


@Injectable()
export class SeguimientoService {

  constructor(private poolService: PoolService) { }

  //TODO: Guardar supervision 


  async guardarSupervision(encabezado: EncabezadoSupervisionDto) {
    /* console.log('rol=>',role); */
    //console.log("encabezado=>",encabezado);
    try {
      const { ide_segdis, ide_seges, responsable_zona_thcab, responsable_distrito_thcab, responsable_establecimiento_thcab, responsable_central_thcab, nombre_establecimiento_thcab, tipo_establecimiento_thcab, nro_zona_thcab, provincia_thcab, ciudad_thcab, fecha_thcab, hora_thcab, total_talento_humano_thcab, recetario_distrito_thcab, puntaje_thcab, talento_humano, espacio, material, documentacion, incidencia, criterioIE, disponibilidadHC, calidadHC, dispoFarmaco, recetario, nudoCritico, especialidadActividad, resolProm, capacitacionAnual, contraReferencia, procesoAdministrativo, indicadores, acuerdos, observaciones, responsables } = encabezado;
      /* console.log(ide_segdis,ide_seges,responsable_zona_thcab,responsable_distrito_thcab,responsable_establecimiento_thcab,responsable_central_thcab,nombre_establecimiento_thcab,tipo_establecimiento_thcab,nro_zona_thcab,provincia_thcab,ciudad_thcab,fecha_thcab,hora_thcab,total_talento_humano_thcab,recetario_distrito_thcab); */
      const newEncabezado = { ide_seges, ide_segdis, responsable_zona_thcab, responsable_distrito_thcab, responsable_establecimiento_thcab, responsable_central_thcab, nombre_establecimiento_thcab, tipo_establecimiento_thcab, nro_zona_thcab, provincia_thcab, ciudad_thcab, fecha_thcab, hora_thcab, total_talento_humano_thcab, recetario_distrito_thcab, puntaje_thcab }
      let data = await this.poolService.insert('th_cabecera_supervision', newEncabezado, 'ide_thcab');
      const ide_thcab = data.raw[0].ide_thcab;

      talento_humano.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarTalentoHumano(element);
      });

      espacio.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarEspacio(element);
      });

      material.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarMaterial(element);
      });

      documentacion.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarDocumentacion(element);
      });

      incidencia.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarIncidencia(element);
      });

      criterioIE.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarCriterioIE(element);
      });

      disponibilidadHC.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarDisponibilidadHC(element);
      });

      calidadHC.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarCalidadHC(element);
      });

      dispoFarmaco.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarDispoFarm(element);
      });

      recetario.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarRecetario(element);
      });

      nudoCritico.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarNudoCritico(element);
      });

      especialidadActividad.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarActividadAsistencia(element);
      });

      resolProm.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarResolProm(element);
      });

      capacitacionAnual.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarCapacitacionAnual(element);
      });

      contraReferencia.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarContraReferencia(element);
      });

      procesoAdministrativo.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarProcesoAdministrativo(element);
      });

      indicadores.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guaradarEvaluacion(element);
      });

      acuerdos.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarAcuerdo(element);
      });

      observaciones.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarObservacion(element);
      });

      responsables.forEach(async element => {
        element['ide_thcab'] = +ide_thcab;
        await this.guardarResponsables(element);
      });
      /* incidencia,criterioIE,disponibilidadHC,calidadHC,dispoFarmaco,recetario,nudoCritico,especialidadActividad,resolProm,capacitacionAnual,contraReferencia,procesoAdministrativo,indicadores,acuerdos,observaciones */
      return {
        success: true,
        message: 'OK',
        data
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        err: error
      });
    }
  }

  async guardarTalentoHumano(body: TalentoHumanoDto) {
    try {
      const { ide_thcab, ide_thpro, numero_thcapro, capacitado_sm_thcapro, observacion_thcapro } = body;
      const newTalentoHumano = {
        ide_thcab, ide_thpro, numero_thcapro, capacitado_sm_thcapro, observacion_thcapro
      };
      return await this.poolService.insert('th_capacitacion_profesional', newTalentoHumano)
    } catch (error) {
      throw error;
    }
  }

  async guardarEspacio(body: EspacioDto) {
    try {
      const { ide_thcab, ide_gthesp, numero_thcesp, tiempo_parcial_thcesp, tiempo_completo_thcesp, observacion_thcesp } = body;
      const newEspacio = {
        ide_thcab, ide_gthesp, numero_thcesp, tiempo_parcial_thcesp, tiempo_completo_thcesp, observacion_thcesp
      };
      return await this.poolService.insert('th_control_espacios', newEspacio)
    } catch (error) {
      throw error;
    }
  }

  async guardarMaterial(body: MaterialDto) {
    try {
      const { ide_thcab, ide_thmat, disponibilidad_thcmat, estado_thcmat, observacion_thcmat } = body;
      const newMaterial = {
        ide_thcab, ide_thmat, disponibilidad_thcmat, estado_thcmat, observacion_thcmat
      };
      return await this.poolService.insert('th_control_materiales', newMaterial)
    } catch (error) {
      throw error;
    }
  }

  async guardarDocumentacion(body: DocumentacionDto) {
    try {
      const { ide_thcab, ide_thtipdoc, activo_thdoc, observacion_thdoc } = body;
      const newDocumentacion = {
        ide_thcab, ide_thtipdoc, activo_thdoc, observacion_thdoc
      };
      return await this.poolService.insert('th_documentacion', newDocumentacion)
    } catch (error) {
      throw error;
    }
  }

  async guardarIncidencia(body: IncidenciaDto) {
    try {
      const { ide_thcab, ide_incdiag, casos_enero, casos_febrero, casos_marzo, casos_abril, casos_mayo, casos_junio, casos_julio, casos_agosto, casos_septiembre, casos_octubre, casos_noviembre, casos_diciembre } = body;
      const newIncidencia = {
        ide_thcab, ide_incdiag, casos_enero, casos_febrero, casos_marzo, casos_abril, casos_mayo, casos_junio, casos_julio, casos_agosto, casos_septiembre, casos_octubre, casos_noviembre, casos_diciembre
      };
      return await this.poolService.insert('inc_incidencia', newIncidencia)
    } catch (error) {
      throw error;
    }
  }

  async guardarCriterioIE(body: CriterioIEDto) {
    try {
      const { ide_thcab, total_pacientes_atendido_thcri, criterio_inclusion_thcri, porcentaje_inclusion_thcri, criterios_exclusion_thcri, porcentaje_exclusion_thcri, observacion_thcri } = body;
      const newCriterio = {
        ide_thcab, total_pacientes_atendido_thcri, criterio_inclusion_thcri, porcentaje_inclusion_thcri, criterios_exclusion_thcri, porcentaje_exclusion_thcri, observacion_thcri
      };
      return await this.poolService.insert('th_criterio_exclusion', newCriterio)
    } catch (error) {
      throw error;
    }
  }

  async guardarDisponibilidadHC(body: DisponibilidadHCDto) {
    try {
      const { ide_thcab, ide_hcasp, consulta_externa_hcdisp, observacion_hcdisp } = body;
      const newDisponibilidad = {
        ide_thcab, ide_hcasp, consulta_externa_hcdisp, observacion_hcdisp
      };
      return await this.poolService.insert('hc_disponibilidad', newDisponibilidad)
    } catch (error) {
      throw error;
    }
  }

  async guardarCalidadHC(body: CalidadHCDto) {
    try {
      const { ide_thcab, ide_hcpar, puntuacion_hccal, observacion_hccal } = body;
      const newBody = {
        ide_thcab, ide_hcpar, puntuacion_hccal, observacion_hccal
      };
      return await this.poolService.insert('hc_calidad_historia_clinica', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarDispoFarm(body: DispoFarmacoDto) {
    try {
      const { ide_thcab, ide_fararefar, disponible_farmdis, cantidad_farmdis, fecha_caducidad_farmdis } = body;
      const newBody = {
        ide_thcab, ide_fararefar, disponible_farmdis, cantidad_farmdis, fecha_caducidad_farmdis
      };
      return await this.poolService.insert('farm_disponibilidad', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarRecetario(body: RecetarioDto) {
    try {
      const { ide_thcab, ide_gtemp, nro_recetas_emitidas_farmrec, nro_recetas_disponibles_farmrec, observacion_farmrec } = body;
      const newBody = {
        ide_thcab, ide_gtemp, nro_recetas_emitidas_farmrec, nro_recetas_disponibles_farmrec, observacion_farmrec
      };
      return await this.poolService.insert('farm_recetario', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarNudoCritico(body: NudoCriticoDto) {
    try {
      const { ide_thcab, medicamento_no_disponible_farmn, responsable_farmnud, cargo_farmnud, causas_farmnud, acciones_farnnud, fecha_cumplimiento_farmnud } = body;
      const newBody = {
        ide_thcab, medicamento_no_disponible_farmn, responsable_farmnud, cargo_farmnud, causas_farmnud, acciones_farnnud, fecha_cumplimiento_farmnud
      };
      return await this.poolService.insert('farm_nudos_criticos', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarActividadAsistencia(body: EspecialidadActividadDto) {
    try {
      const { ide_thcab, ide_thesac, calificacion_thactis, observacion_thactis } = body;
      const newBody = {
        ide_thcab, ide_thesac, calificacion_thactis, observacion_thactis
      };
      return await this.poolService.insert('th_actividades_asistencia', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarResolProm(body: ResolPromDto) {
    try {
      const { ide_thcab, fecha_sprp, equipo_supervisor_sprp, actividad_fortalecimiento_sprp, nudo_critico_detectado_sprp, resultado_sprp } = body;
      const newBody = {
        ide_thcab, fecha_sprp, equipo_supervisor_sprp, actividad_fortalecimiento_sprp, nudo_critico_detectado_sprp, resultado_sprp
      };
      return await this.poolService.insert('sup_resolucion_problema', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarCapacitacionAnual(body: CapacitacionAnualDto) {
    try {
      const { ide_thcab, tema_sppca, total_profesional_capacitar_spp, nro_capacitado_sppca, porcentaje_sppca, total_horas_sppca, fecha_sppca, actualizado_sppca } = body;
      const newBody = {
        ide_thcab, tema_sppca, total_profesional_capacitar_spp, nro_capacitado_sppca, porcentaje_sppca, total_horas_sppca, fecha_sppca, actualizado_sppca
      };
      return await this.poolService.insert('sup_plan_capacitacion_anual', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarContraReferencia(body: ContraReferenciaDto) {
    try {
      const { ide_thcab, ide_sppro, total_sprc, justificado_sprc, establecimiento_a_sprc, establecimiento_de_sprc, observacion_sprc } = body;
      const newBody = {
        ide_thcab, ide_sppro, total_sprc, justificado_sprc, establecimiento_a_sprc, establecimiento_de_sprc, observacion_sprc
      };
      return await this.poolService.insert('sup_referencia_contrareferencia', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarProcesoAdministrativo(body: ProcesoAdministrativoDto) {
    try {
      const { ide_thcab, ide_supa, cero_suppa, uno_tres_suppa, cuatro_seis_suppa, siete_mas_suppa, observacion_suppa } = body;
      const newBody = {
        ide_thcab, ide_supa, cero_suppa, uno_tres_suppa, cuatro_seis_suppa, siete_mas_suppa, observacion_suppa
      };
      return await this.poolService.insert('sup_proceso_administrativo', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guaradarEvaluacion(body: IndicadorDto) {
    try {
      const { ide_thcab, ide_evin, puntaje_evagen, observacion_evagen } = body;
      const newBody = {
        ide_thcab, ide_evin, puntaje_evagen, observacion_evagen
      };
      return await this.poolService.insert('eva_evaluacion_general', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarAcuerdo(body: AcuerdoDto) {
    try {
      const { ide_thcab, acuerdo_acucomp, responsable_acucomp, cargo_acucomp, fecha_acucomp } = body;
      const newBody = {
        ide_thcab, acuerdo_acucomp, responsable_acucomp, cargo_acucomp, fecha_acucomp
      };
      return await this.poolService.insert('acu_acuerdo_compromiso', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarObservacion(body: ObservacionDto) {
    try {
      const { ide_thcab, observacion_evab } = body;
      const newBody = {
        ide_thcab, observacion_evab
      };
      return await this.poolService.insert('eva_observacion', newBody)
    } catch (error) {
      throw error;
    }
  }

  async guardarResponsables(body: ResponsableDto) {
    try {
      const { ide_thcab, supervisor_supesup, cargo_supesup, observacion_supesup } = body;
      const newBody = {
        ide_thcab, supervisor_supesup, cargo_supesup, observacion_supesup
      };
      return await this.poolService.insert('sup_equipo_supervision', newBody)
    } catch (error) {
      throw error;
    }
  }


  //Consultas por busquedas
  async buscarSupervision(buscarDto: BuscarDto) {
    try {
      const { fecha_de, fecha_hasta, distrito, establecimiento } = buscarDto;

      let sql = `select * from th_cabecera_supervision where 1=1 `;
      if (fecha_de && fecha_hasta) {
        sql += ` and fecha_thcab between '${fecha_de}' and  '${fecha_hasta}'`;
      }
      if (distrito) {
        sql += ` and ide_segdis=${distrito}`
      }
      if (establecimiento) {
        sql += ` and ide_seges=${establecimiento}`
      }
      sql += ' order by ide_thcab desc, nombre_establecimiento_thcab'

      //console.log('sql=>',sql);
      const data = await this.poolService.consult(sql);
      return {
        success: true,
        data
      };
    } catch (error) {
      throw error;
    }
  }


  //TODO: Consulta datos de un seguimiento

  /**
   * 
   * @param ide Identificador del encabezado
   * @returns 
   */
  async getDatosSeguimiento(ide: number) {
    try {
      let sql: string;
      let response: [];

      let data = new Seguimiento();

      sql = `select detalle_thpro, numero_thcapro,(case when b.capacitado_sm_thcapro=true then 'Si' when b.capacitado_sm_thcapro=false then 'No' else '-' end) as capacitado,
      observacion_thcapro
      from th_cabecera_supervision a, th_capacitacion_profesional b, th_profesional c
      where a.ide_thcab=b.ide_thcab and b.ide_thpro=c.ide_thpro and a.ide_thcab=$1`;
      response = await this.poolService.consult(sql, [ide]);
      data.talento_humano = response;

      sql = `select detalle_gthesp, numero_thcesp, (case when b.tiempo_parcial_thcesp = true then 'Si' when b.       tiempo_parcial_thcesp = false then 'No' else '-' end) as tiempo_parcial,
      (case when b.tiempo_completo_thcesp = true then 'Si' when b.tiempo_completo_thcesp = false then 'No' else '-' end) tiempo_completo,
      observacion_thcesp
      from th_cabecera_supervision a, th_control_espacios b, th_espacios c
      where a.ide_thcab = b.ide_thcab and b.ide_gthesp = c.ide_gthesp and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.espacios = response;


      sql = `select detalle_thmat, (case when b.disponibilidad_thcmat = 1 then 'Nula' when b.disponibilidad_thcmat = 2 then 'Baja' when b.disponibilidad_thcmat = 3 then 'Adecuada' end) as disponibilidad,
      (case when b.estado_thcmat = 1 then 'Malo' when b.estado_thcmat = 2 then 'Regular' when b.estado_thcmat = 3 then 'Bueno' end) as estado, observacion_thcmat
      from th_cabecera_supervision a, th_control_materiales b, th_material c
      where a.ide_thcab = b.ide_thcab and b.ide_thmat = c.ide_thmat and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.insumos = response;


      sql = `select detalle_thtipdoc, (case when b.activo_thdoc = true then 'Si' when b.activo_thdoc = false then 'No' end ) as activo, observacion_thdoc
      from th_cabecera_supervision a, th_documentacion b, th_tipo_documentacion c
      where a.ide_thcab = b.ide_thcab and b.ide_thtipdoc = c.ide_thtipdoc and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.documentacion = response;


      sql = `select detalle_incdiag, casos_enero, casos_febrero, casos_marzo, casos_abril, casos_mayo, casos_junio, casos_julio,
      casos_agosto, casos_septiembre, casos_octubre, casos_noviembre, casos_diciembre
      from th_cabecera_supervision a, inc_incidencia b, inc_diagnostico c
      where a.ide_thcab = b.ide_thcab and b.ide_incdiag = c.ide_incdiag and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.incidencia = response;


      sql = `select total_pacientes_atendido_thcri, criterio_inclusion_thcri, porcentaje_inclusion_thcri,
      criterios_exclusion_thcri, porcentaje_exclusion_thcri, observacion_thcri
      from th_cabecera_supervision a, th_criterio_exclusion b
      where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.criterio_inclusion_exclusion = response;


      sql = `select detalle_hcasp, consulta_externa_hcdisp, observacion_hcdisp
      from th_cabecera_supervision a, hc_disponibilidad b, hc_aspectos c
      where a.ide_thcab = b.ide_thcab and b.ide_hcasp = c.ide_hcasp and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.disponibilidad_hc = response;



      sql = `select detalle_hcpar, puntuacion_hccal, (case when b.puntuacion_hccal = 1 then 'MALO'  when b.puntuacion_hccal = 2 then 'REGULAR'  when b.puntuacion_hccal = 3 then 'BUENO' end) as puntuacion, observacion_hccal
      from th_cabecera_supervision a, hc_calidad_historia_clinica b, hc_parametros c
      where a.ide_thcab = b.ide_thcab and b.ide_hcpar = c.ide_hcpar and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.calidad_hc = response;


      sql = `select detalle_thare, detalle_farm, detalle_formfar, (case when b.disponible_farmdis = true then 'Si' when b.disponible_farmdis = false then 'No' end) as disponible,
      cantidad_farmdis, fecha_caducidad_farmdis, (case when d.nivel_uno_farm = true then 'X' else '-' end) as nivel_uno,
      (case when d.nivel_dos_farm = true then 'X' else '-' end) as nivel_dos,
      (case when d.nivel_tres_farm = true then 'X' else '-' end) as nivel_tres
      from th_cabecera_supervision a, farm_disponibilidad b, farm_area_farmaco c, farm_farmacos d, th_area e, farm_forma_farmaceutica f
      where a.ide_thcab = b.ide_thcab and b.ide_fararefar = c.ide_fararefar and c.ide_farm = d.ide_farm and c.ide_thare = e.ide_thare and d.ide_formfar = f.ide_formfar
      and a.ide_thcab = $1
      order by detalle_thare, detalle_farm`;
      response = await this.poolService.consult(sql, [ide]);
      data.medicamentos_disponibilidad = response;


      sql = `select concat_ws(' ', apellido_paterno_gtemp, apellido_materno_gtemp, primer_nombre_gtemp, segundo_nombre_gtemp) as empleado,
      nro_recetas_emitidas_farmrec, nro_recetas_disponibles_farmrec, observacion_farmrec
      from th_cabecera_supervision a, farm_recetario b, th_empleado c
      where a.ide_thcab = b.ide_thcab and b.ide_gtemp = c.ide_gtemp and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.recetario = response;


      sql = `select medicamento_no_disponible_farmn, responsable_farmnud, cargo_farmnud, causas_farmnud, acciones_farnnud, fecha_cumplimiento_farmnud
      from th_cabecera_supervision a, farm_nudos_criticos b
      where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.nudos_criticos = response;


      sql = `select detalle_thesp, detalle_act, (case when b.calificacion_thactis = 1 then 'Malo' when b.calificacion_thactis = 2 then 'Regular' when b.calificacion_thactis = 3 then 'Bueno' end) as calificacion, observacion_thactis
      from th_cabecera_supervision a, th_actividades_asistencia b, th_especialidad_actividad c, th_actividades d, th_especialidades e
      where a.ide_thcab = b.ide_thcab and b.ide_thesac = c.ide_thesac and c.ide_thact = d.ide_thact and c.ide_thesp = e.ide_thesp
      and a.ide_thcab = $1 order by detalle_thesp, detalle_act`;
      response = await this.poolService.consult(sql, [ide]);
      data.actividades_asistencia = response;


      sql = `select fecha_sprp, equipo_supervisor_sprp, actividad_fortalecimiento_sprp, nudo_critico_detectado_sprp,
      (case when b.resultado_sprp = 1 then 'No solucionado' when b.resultado_sprp = 2 then 'En proceso' when b.resultado_sprp = 3 then 'Solucionado' end) as resultado
      from th_cabecera_supervision a, sup_resolucion_problema b
      where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.resolucion_problemas = response;


      sql = `select tema_sppca, total_profesional_capacitar_spp, nro_capacitado_sppca, porcentaje_sppca, total_horas_sppca, fecha_sppca,
      (case when b.actualizado_sppca = true then 'Si' when b.actualizado_sppca = false then 'No' end) as actualizado
      from th_cabecera_supervision a, sup_plan_capacitacion_anual b
      where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.plan_capacitacion_anual = response;


      sql = `select detalle_sppro, total_sprc, (case when b.justificado_sprc = true then 'Si' when b.justificado_sprc = false then 'No' end) as justificado,
      establecimiento_de_sprc, establecimiento_a_sprc, observacion_sprc
      from th_cabecera_supervision a, sup_referencia_contrareferencia b, sup_proceso c
      where a.ide_thcab = b.ide_thcab and b.ide_sppro = c.ide_sppro  and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.referencia_contrareferencia = response;



      sql = `select detalle_supa, cero_suppa, uno_tres_suppa, cuatro_seis_suppa, siete_mas_suppa, observacion_suppa
      from th_cabecera_supervision a, sup_proceso_administrativo  b, sup_aspectos c
      where a.ide_thcab = b.ide_thcab and b.ide_supa = c.ide_supa  and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.proceso_administrativo = response;

      sql = `select detalle_evpar,detalle_evin,(5) as valor,puntaje_evagen,observacion_evagen
      from th_cabecera_supervision a,eva_evaluacion_general  b,eva_indicador c,eva_parametro d
      where a.ide_thcab=b.ide_thcab and b.ide_evin=c.ide_evin and c.ide_evpar=d.ide_evpar  and a.ide_thcab=$1
      order by detalle_evpar,detalle_evin`;
      response = await this.poolService.consult(sql, [ide]);
      data.evaluacion_general = response;


      sql = `select acuerdo_acucomp, responsable_acucomp, cargo_acucomp, fecha_acucomp
      from th_cabecera_supervision a, acu_acuerdo_compromiso  b
      where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.acuerdos_compromisos = response;


      sql = `select observacion_evab
      from th_cabecera_supervision a, eva_observacion b
      where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.observaciones_generales = response;

      sql = `select supervisor_supesup as responsable, cargo_supesup as cargo,observacion_supesup as observacion
      from sup_equipo_supervision a, th_cabecera_supervision b
      where a.ide_thcab=b.ide_thcab and a.ide_thcab= $1`;
      response = await this.poolService.consult(sql, [ide]);
      data.responsables = response;

      return {
        success: true,
        data
      };
    } catch (error) {
      throw error;
    }
  }

  //TODO: Obtiene puntaje

  async getPuntaje(ide: number) {
    const sql = `select puntaje_thcab as puntaje 
    from th_cabecera_supervision 
    where ide_seges=$1
    order by ide_thcab desc
    limit 1
    `
    try {
      const data = await this.poolService.consult(sql, [ide]);
      return {
        success: true,
        data
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query'
      });
    }
  }



  //TODO: Consulta seguimientos 
  async getSeguimientos(body, longitud: number) {
    let data = new ListaSeguimiento();
    let sql: string;
    let response;
    let cabecera=[];
    let talento_humano = [];
    let espacios=[];
    let insumos=[];
    let documentacion=[];
    let incidencia=[];
    let criterio_inclusion_exclusion=[];
    let disponibilidad_hc=[];
    let calidad_hc=[];
    let medicamentos_disponibilidad=[];
    let recetario=[];
    let nudos_criticos=[];
    let actividades_asistencia=[];
    let resolucion_problemas=[];
    let plan_capacitacion_anual=[];
    let referencia_contrareferencia=[];
    let proceso_administrativo=[];
    let evaluacion_general=[];
    let acuerdos_compromisos=[];
    let observaciones_generales=[];
    let responsables=[];


    try {

      for (let index = 0; index < longitud; index++) {
        //cabecera
        sql = `select a.ide_thcab,fecha_thcab,nro_distrito,nombre_segdis,unicodigo_seges,nombre_establecimiento_thcab,
        tipo_establecimiento_thcab,provincia_thcab,ciudad_thcab,total_talento_humano_thcab,puntaje_thcab,recetario_distrito_thcab,
        responsable_establecimiento_thcab,responsable_distrito_thcab,responsable_zona_thcab,responsable_central_thcab
        from th_cabecera_supervision a, seg_establecimiento b, seg_distrito c
        where a.ide_seges=b.ide_seges and a.ide_segdis=c.ide_segdis and ide_thcab=$1
        order by ide_thcab desc`;
        response = await this.poolService.consult(sql, [body[index]]);
        cabecera.push(response);

        //talento humano
        sql = `select b.ide_thcab,detalle_thpro, numero_thcapro,(case when b.capacitado_sm_thcapro=true then 'Si' when b.capacitado_sm_thcapro=false then 'No' else '-' end) as capacitado,
                observacion_thcapro
                from th_cabecera_supervision a, th_capacitacion_profesional b, th_profesional c
                where a.ide_thcab=b.ide_thcab and b.ide_thpro=c.ide_thpro and a.ide_thcab=$1`;
        response = await this.poolService.consult(sql, [body[index]]);
        talento_humano.push(response);

        //espacios
        sql = `select detalle_gthesp, numero_thcesp, (case when b.tiempo_parcial_thcesp = true then 'Si' when b.       tiempo_parcial_thcesp = false then 'No' else '-' end) as tiempo_parcial,
        (case when b.tiempo_completo_thcesp = true then 'Si' when b.tiempo_completo_thcesp = false then 'No' else '-' end) tiempo_completo,
        observacion_thcesp,b.ide_thcab
        from th_cabecera_supervision a, th_control_espacios b, th_espacios c
        where a.ide_thcab = b.ide_thcab and b.ide_gthesp = c.ide_gthesp and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        espacios.push(response);
  
  
        sql = `select b.ide_thcab,detalle_thmat, (case when b.disponibilidad_thcmat = 1 then 'Nula' when b.disponibilidad_thcmat = 2 then 'Baja' when b.disponibilidad_thcmat = 3 then 'Adecuada' end) as disponibilidad,
        (case when b.estado_thcmat = 1 then 'Malo' when b.estado_thcmat = 2 then 'Regular' when b.estado_thcmat = 3 then 'Bueno' end) as estado, observacion_thcmat
        from th_cabecera_supervision a, th_control_materiales b, th_material c
        where a.ide_thcab = b.ide_thcab and b.ide_thmat = c.ide_thmat and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        insumos.push(response);
  
  
        sql = `select b.ide_thcab,detalle_thtipdoc, (case when b.activo_thdoc = true then 'Si' when b.activo_thdoc = false then 'No' end ) as activo, observacion_thdoc
        from th_cabecera_supervision a, th_documentacion b, th_tipo_documentacion c
        where a.ide_thcab = b.ide_thcab and b.ide_thtipdoc = c.ide_thtipdoc and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        documentacion.push(response);
  
  
        sql = `select b.ide_thcab,detalle_incdiag, casos_enero, casos_febrero, casos_marzo, casos_abril, casos_mayo, casos_junio, casos_julio,
        casos_agosto, casos_septiembre, casos_octubre, casos_noviembre, casos_diciembre
        from th_cabecera_supervision a, inc_incidencia b, inc_diagnostico c
        where a.ide_thcab = b.ide_thcab and b.ide_incdiag = c.ide_incdiag and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        incidencia.push(response);
  
  
        sql = `select b.ide_thcab,total_pacientes_atendido_thcri, criterio_inclusion_thcri, porcentaje_inclusion_thcri,
        criterios_exclusion_thcri, porcentaje_exclusion_thcri, observacion_thcri
        from th_cabecera_supervision a, th_criterio_exclusion b
        where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        criterio_inclusion_exclusion.push(response);
  
  
        sql = `select b.ide_thcab,detalle_hcasp, consulta_externa_hcdisp, observacion_hcdisp
        from th_cabecera_supervision a, hc_disponibilidad b, hc_aspectos c
        where a.ide_thcab = b.ide_thcab and b.ide_hcasp = c.ide_hcasp and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        disponibilidad_hc.push(response);
  
  
  
        sql = `select b.ide_thcab,detalle_hcpar, puntuacion_hccal, (case when b.puntuacion_hccal = 1 then 'MALO'  when b.puntuacion_hccal = 2 then 'REGULAR'  when b.puntuacion_hccal = 3 then 'BUENO' end) as puntuacion, observacion_hccal
        from th_cabecera_supervision a, hc_calidad_historia_clinica b, hc_parametros c
        where a.ide_thcab = b.ide_thcab and b.ide_hcpar = c.ide_hcpar and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        calidad_hc.push(response);
  
  
        sql = `select b.ide_thcab,detalle_thare, detalle_farm, detalle_formfar, (case when b.disponible_farmdis = true then 'Si' when b.disponible_farmdis = false then 'No' end) as disponible,
        cantidad_farmdis, fecha_caducidad_farmdis, (case when d.nivel_uno_farm = true then 'X' else '-' end) as nivel_uno,
        (case when d.nivel_dos_farm = true then 'X' else '-' end) as nivel_dos,
        (case when d.nivel_tres_farm = true then 'X' else '-' end) as nivel_tres
        from th_cabecera_supervision a, farm_disponibilidad b, farm_area_farmaco c, farm_farmacos d, th_area e, farm_forma_farmaceutica f
        where a.ide_thcab = b.ide_thcab and b.ide_fararefar = c.ide_fararefar and c.ide_farm = d.ide_farm and c.ide_thare = e.ide_thare and d.ide_formfar = f.ide_formfar
        and a.ide_thcab = $1
        order by detalle_thare, detalle_farm`;
        response = await this.poolService.consult(sql, [body[index]]);
        medicamentos_disponibilidad.push(response);
  
  
        sql = `select b.ide_thcab,concat_ws(' ', apellido_paterno_gtemp, apellido_materno_gtemp, primer_nombre_gtemp, segundo_nombre_gtemp) as empleado,
        nro_recetas_emitidas_farmrec, nro_recetas_disponibles_farmrec, observacion_farmrec
        from th_cabecera_supervision a, farm_recetario b, th_empleado c
        where a.ide_thcab = b.ide_thcab and b.ide_gtemp = c.ide_gtemp and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        recetario.push(response);
  
  
        sql = `select b.ide_thcab,medicamento_no_disponible_farmn, responsable_farmnud, cargo_farmnud, causas_farmnud, acciones_farnnud, fecha_cumplimiento_farmnud
        from th_cabecera_supervision a, farm_nudos_criticos b
        where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        nudos_criticos.push(response);
  
  
        sql = `select b.ide_thcab,detalle_thesp, detalle_act, (case when b.calificacion_thactis = 1 then 'Malo' when b.calificacion_thactis = 2 then 'Regular' when b.calificacion_thactis = 3 then 'Bueno' end) as calificacion, observacion_thactis
        from th_cabecera_supervision a, th_actividades_asistencia b, th_especialidad_actividad c, th_actividades d, th_especialidades e
        where a.ide_thcab = b.ide_thcab and b.ide_thesac = c.ide_thesac and c.ide_thact = d.ide_thact and c.ide_thesp = e.ide_thesp
        and a.ide_thcab = $1 order by detalle_thesp, detalle_act`;
        response = await this.poolService.consult(sql,[body[index]]);
        actividades_asistencia.push(response);
  
  
        sql = `select b.ide_thcab,fecha_sprp, equipo_supervisor_sprp, actividad_fortalecimiento_sprp, nudo_critico_detectado_sprp,
        (case when b.resultado_sprp = 1 then 'No solucionado' when b.resultado_sprp = 2 then 'En proceso' when b.resultado_sprp = 3 then 'Solucionado' end) as resultado
        from th_cabecera_supervision a, sup_resolucion_problema b
        where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql,[body[index]]);
        resolucion_problemas.push(response);
  
  
        sql = `select b.ide_thcab,tema_sppca, total_profesional_capacitar_spp, nro_capacitado_sppca, porcentaje_sppca, total_horas_sppca, fecha_sppca,
        (case when b.actualizado_sppca = true then 'Si' when b.actualizado_sppca = false then 'No' end) as actualizado
        from th_cabecera_supervision a, sup_plan_capacitacion_anual b
        where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql,[body[index]]);
        plan_capacitacion_anual.push(response);
  
  
        sql = `select b.ide_thcab,detalle_sppro, total_sprc, (case when b.justificado_sprc = true then 'Si' when b.justificado_sprc = false then 'No' end) as justificado,
        establecimiento_de_sprc, establecimiento_a_sprc, observacion_sprc
        from th_cabecera_supervision a, sup_referencia_contrareferencia b, sup_proceso c
        where a.ide_thcab = b.ide_thcab and b.ide_sppro = c.ide_sppro  and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql,[body[index]]);
        referencia_contrareferencia.push(response);
  
  
  
        sql = `select b.ide_thcab,detalle_supa, cero_suppa, uno_tres_suppa, cuatro_seis_suppa, siete_mas_suppa, observacion_suppa
        from th_cabecera_supervision a, sup_proceso_administrativo  b, sup_aspectos c
        where a.ide_thcab = b.ide_thcab and b.ide_supa = c.ide_supa  and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        proceso_administrativo.push(response);
  
        sql = `select b.ide_thcab,detalle_evpar,detalle_evin,(5) as valor,puntaje_evagen,observacion_evagen
        from th_cabecera_supervision a,eva_evaluacion_general  b,eva_indicador c,eva_parametro d
        where a.ide_thcab=b.ide_thcab and b.ide_evin=c.ide_evin and c.ide_evpar=d.ide_evpar  and a.ide_thcab=$1
        order by detalle_evpar,detalle_evin`;
        response = await this.poolService.consult(sql, [body[index]]);
        evaluacion_general.push(response);
  
  
        sql = `select b.ide_thcab,acuerdo_acucomp, responsable_acucomp, cargo_acucomp, fecha_acucomp
        from th_cabecera_supervision a, acu_acuerdo_compromiso  b
        where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        acuerdos_compromisos.push(response);
  
  
        sql = `select b.ide_thcab,observacion_evab
        from th_cabecera_supervision a, eva_observacion b
        where a.ide_thcab = b.ide_thcab and a.ide_thcab = $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        observaciones_generales.push(response);
  
        sql = `select b.ide_thcab,supervisor_supesup as responsable, cargo_supesup as cargo,observacion_supesup as observacion
        from sup_equipo_supervision a, th_cabecera_supervision b
        where a.ide_thcab=b.ide_thcab and a.ide_thcab= $1`;
        response = await this.poolService.consult(sql, [body[index]]);
        responsables.push(response);


      }
      data.cabecera=cabecera;
      data.talento_humano = talento_humano;
      data.espacios=espacios;
      data.insumos=insumos;
      data.documentacion=documentacion;
      data.incidencia=incidencia;
      data.disponibilidad_hc=disponibilidad_hc;
      data.calidad_hc=calidad_hc;
      data.criterio_inclusion_exclusion=criterio_inclusion_exclusion;
      data.medicamentos_disponibilidad=medicamentos_disponibilidad;
      data.recetario=recetario;
      data.nudos_criticos=nudos_criticos;
      data.actividades_asistencia=actividades_asistencia
      data.resolucion_problemas=resolucion_problemas;
      data.plan_capacitacion_anual=plan_capacitacion_anual;
      data.referencia_contrareferencia=referencia_contrareferencia;
      data.proceso_administrativo=proceso_administrativo;
      data.evaluacion_general=evaluacion_general;
      data.acuerdos_compromisos=acuerdos_compromisos;
      data.observaciones_generales=observaciones_generales;
      data.responsables=responsables;
    

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('error=>', error);
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

}
