import { BadRequestException, Injectable, Body } from '@nestjs/common';
import { PoolService } from '@modules/pool/pool.service';
import { CreateHerramientaUnoDto } from './dto/new-h1.dto';
import { InsumoDto } from './dto/insumo.dto';
import { CreateHerramientaDto } from './dto/create.dto';
import { IndicadoresDto } from './dto/indicadores.dto';
import { UpdateHerramientaDto } from './dto/update.dto';

@Injectable()
export class IndicadorService {

  constructor(private poolService: PoolService) { }

  async getInsumos(area: number) {
    let sql = `select ide_indins as value,detalle_indis as label
    from ind_insumo where ide_indare=$1`;
    try {

      const data = await this.poolService.consult(sql, [area]);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar la ultima fecha de acceso',
        error
      });
    }
  }

  async getNumeroSala(establecimiento: number) {
    let sql = `select ide_indare as area,numero_indns as numero
    from ind_numero_sala
    where ide_seges=$1 order by ide_indare`;
    try {

      const data = await this.poolService.consult(sql, [establecimiento]);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar la ultima fecha de acceso',
        error
      });
    }
  }

  async guardarHUno(newHUno: CreateHerramientaUnoDto) {
    try {
      const { atencion_nacido, charol_emergencia, consultorio, atencion_parto,estacion_enfermeria,sala_cirugia,material_anestesia, distrito_hlic, establecimiento_hlic, farmacia, fecha_medicion_hlic, ide_segdis, ide_seges, insumos, items_cumple_hlic, laboratorio, ide_indtp, porcentaje_estandar_hlic, promedio_atencion_nacido_hlic, promedio_atencion_parto_hlic, promedio_charol_hlic, promedio_farmacia_hlic, promedio_gineco_hlic, promedio_laboratorio_hlic, promedio_preparacion_hlic, promedio_servicio_hlic, promedio_estacion_enfermeria_hlic,promedio_sala_cirugia_hlic,promedio_material_anestesia_hlic,provincia_hlic, responsable_medicion_hlic, servicio, total_items_hlic, zona_hlic } = newHUno;

      const encabezado = { ide_seges, ide_segdis, zona_hlic, provincia_hlic, distrito_hlic, establecimiento_hlic, fecha_medicion_hlic, ide_indtp, responsable_medicion_hlic, promedio_preparacion_hlic, promedio_gineco_hlic, promedio_farmacia_hlic, promedio_laboratorio_hlic, promedio_servicio_hlic, promedio_charol_hlic, promedio_atencion_parto_hlic, promedio_atencion_nacido_hlic, promedio_estacion_enfermeria_hlic,promedio_sala_cirugia_hlic,promedio_material_anestesia_hlic,items_cumple_hlic, total_items_hlic, porcentaje_estandar_hlic }

      const sql = `select count(ide_heg) as registros
      from her_encabezado_general a, ind_tiempo b
      where a.ide_indtp=b.ide_indtp and a.ide_indtp=${ide_indtp} and extract(year from date(fecha_medicion_heg))= extract(year from date('${fecha_medicion_hlic}'))`


      const registros = await this.poolService.consult(sql);
      if (registros[0].registros > 0) {
        return {
          success: false,
          message: 'Ya se encuentra registrado el indicador en el mes establecido.',
          registros
        }
      }

      let data = await this.poolService.insert('her_lista_chequeo', encabezado, 'ide_hlic');
      const ide_hlic = data.raw[0].ide_hlic;

      insumos.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      charol_emergencia.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      consultorio.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      atencion_nacido.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      atencion_parto.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      farmacia.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      laboratorio.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      servicio.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      estacion_enfermeria.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      sala_cirugia.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });
      material_anestesia.forEach(async element => {
        element['ide_hlic'] = +ide_hlic;
        await this.guardarInsumo(element);
      });

      return {
        success: true,
        message: 'OK',
        data
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al guardar',
        err: error
      });
    }
    //console.log(data);

  }

  async guardarInsumo(data: InsumoDto) {
    try {
      console.log('entro a insumo', data);
      const { ide_indare, ide_indins, uno_hlic, dos_hlic, tres_hlic, ide_hlic } = data;
      const body = { ide_hlic, ide_indare, ide_indins, uno_hlic, dos_hlic, tres_hlic };

      return await this.poolService.insert('her_indicador_lista_chequeo', body)
    } catch (error) {
      throw error;
    }
  }

  //Tiempo
  async getTiempo(condition: string) {
    let sql = `select ide_indtp as value, detalle_indtp as label
    from ind_tiempo where 1=1`;
    if (condition) {
      sql += ` and ${condition}`
    }
    try {

      const data = await this.poolService.consult(sql);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar',
        error
      });
    }
  }

  //TODO: indicador 2


  async getPrenatal() {
    let sql = `select ide_indpren as value, detalle_indpren as label
    from ind_prenatal`;
    try {

      const data = await this.poolService.consult(sql);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar',
        error
      });
    }
  }

  //
  async getIndicadores(data: IndicadoresDto, condition: string) {
    const { ide, campo, tabla } = data;
    let sql = `select ${ide} as value, ${campo} as label
    from ${tabla}
    where 1=1 `;
    if (condition) {
      sql += ` ${condition}`
    }
    try {

      const data = await this.poolService.consult(sql);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar',
        error
      });
    }
  }



  //Save data

  async saveData(newHUno: CreateHerramientaDto, tabla1: string, ide1: string, tabla2: string, tabla3: string) {
    try {
      const { cabecera, indicadores, promedio } = newHUno;
      console.log(cabecera);

      const sql = `select count(ide_heg) as registros
      from her_encabezado_general a, ind_tiempo b
      where a.ide_indtp=b.ide_indtp and a.ide_indtp=${cabecera.ide_indtp} and extract(year from date(fecha_medicion_heg))= extract(year from date('${cabecera.fecha_medicion_heg}')) and nro_herramienta_heg='${cabecera.nro_herramienta_heg}' and ide_seges=${cabecera.ide_seges}`


      const registros = await this.poolService.consult(sql);
      if (registros[0].registros > 0) {
        return {
          success: false,
          message: 'Ya se encuentra registrado el indicador en el mes establecido.',
          registros
        }
      }
      //console.log('data=>',sql,data);

      let data = await this.poolService.insert(tabla1, cabecera, ide1);
      console.log('ide=>', data.raw[0]);
      console.log('promedio=>', promedio);

      const ide = data.raw[0][ide1];
      //console.log(ide[ide1]);

      indicadores.forEach(async element => {
        element[ide1] = +ide;
        //console.log(element);
        await this.saveIndicador(element, tabla2);
      });
      if (tabla3) {
        promedio.forEach(async element => {
          element[ide1] = +ide;
          //console.log(element);
          await this.saveIndicador(element, tabla3);
        });
      }

      return {
        success: true,
        message: 'OK',
        data
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        success: false,
        message: 'Error al guardar',
        err: error
      });
    }
    //console.log(data);

  }

  async saveIndicador(data, tabla) {
    try {
      return await this.poolService.insert(tabla, data)
    } catch (error) {
      console.log('errir=>', error);
      throw error;
    }
  }


  //updateIndicador 

  async update(body, tabla1: string, condition1: string, tabla2: string, condition2: string, indicador: string, tabla3: string, condition3: string) {
    try {
      //console.log(body);
      const { cabecera, indicadores, promedio } = body;
      const ide1 = cabecera[condition1];
      delete cabecera[condition1];
      //console.log('encabezado: ',ide1);
      await this.poolService.update(tabla1, cabecera, [{ condition: condition1 + '=' + ide1, values: [ide1] }])

      indicadores.forEach(async element => {
        const ide2 = element[condition2];
        delete element[indicador];
        delete element[condition2];
        await this.poolService.update(tabla2, element, [{ condition: condition2 + '=' + ide2, values: [ide2] }])
      });
      if (tabla3) {
        console.log('ta3=', tabla3, 'c3=', condition3);
        console.log('promedio=', promedio);

        const ide3 = promedio[condition3];
        delete promedio[condition3];
        await this.poolService.update(tabla3, promedio, [{ condition: condition3 + '=' + ide3, values: [ide3] }])

      }

      return {
        success: true,
        message: 'OK',
        //data
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        success: false,
        message: 'Error al actualizar',
        err: error
      });
    }
    //console.log(data);

  }

  /* TODO: Buscar los indicadores  */
  //1A
  //
  async getIUnoA(distrito: number, establecimiento: number) {
    let sql = '';

    if (establecimiento) {
      sql = ` select ide_seges,b.ide_indtp,ide_hlic,establecimiento_hlic,fecha_medicion_hlic,distrito_hlic,ide_seges,ide_segdis,promedio_preparacion_hlic,
      promedio_preparacion_hlic,promedio_farmacia_hlic,promedio_laboratorio_hlic,promedio_servicio_hlic,promedio_charol_hlic,
      promedio_atencion_parto_hlic,promedio_atencion_nacido_hlic,promedio_gineco_hlic,promedio_estacion_enfermeria_hlic,promedio_sala_cirugia_hlic
      ,promedio_material_anestesia_hlic,items_cumple_hlic,total_items_hlic,porcentaje_estandar_hlic,
      detalle_indtp
      from her_lista_chequeo a, ind_tiempo b
      where a.ide_indtp=b.ide_indtp and ide_segdis=$1 and ide_seges=${establecimiento}`
    }else{
      sql = `SELECT ide_seges,b.ide_indtp,ide_hlic,establecimiento_hlic,fecha_medicion_hlic,distrito_hlic,ide_seges,ide_segdis,promedio_preparacion_hlic,
      promedio_preparacion_hlic,promedio_farmacia_hlic,promedio_laboratorio_hlic,promedio_servicio_hlic,promedio_charol_hlic,
      promedio_atencion_parto_hlic,promedio_atencion_nacido_hlic,promedio_estacion_enfermeria_hlic,promedio_sala_cirugia_hlic,promedio_material_anestesia_hlic,promedio_gineco_hlic,items_cumple_hlic,total_items_hlic,porcentaje_estandar_hlic,
      detalle_indtp
  FROM (
      SELECT *,
             ROW_NUMBER() OVER (PARTITION BY establecimiento_hlic ORDER BY fecha_medicion_hlic DESC) AS rn
      FROM her_lista_chequeo
  ) AS subconsulta
  inner join ind_tiempo b on b.ide_indtp=subconsulta.ide_indtp
  WHERE rn = 1 and ide_segdis=$1`
    }
    sql += "  order by ide_hlic desc"

    try {

      const data = await this.poolService.consult(sql, [distrito]);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar',
        error
      });
    }
  }

  async getDataUnoA(ide: number, area: number) {
    const sql = `select * from her_indicador_lista_chequeo
    where ide_hlic=$1 and ide_indare=$2
    order by ide_indare asc,ide_indins asc`;



    try {

      const data = await this.poolService.consult(sql, [ide, area]);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar',
        error
      });
    }
  }

  async getEncabezadoGeneral(distrito: number, herramienta: string, establecimiento: number) {

    let sql = ``;

    if (establecimiento) {
      sql += ` select  ide_heg,b.ide_indtp,fecha_medicion_heg as fecha,nro_herramienta_heg as indicador,unidad_operativa_heg as establecimiento,
      numerador_heg as numerador,denominador_heg as denominador,porcentaje_heg as porcentaje,detalle_indtp as periodo,
      responsable_medicion_heg as responsable, extract(year from date(fecha_medicion_heg)) as anio
      from her_encabezado_general a, ind_tiempo b
      where a.ide_indtp=b.ide_indtp and ide_segdis=$1 and nro_herramienta_heg=$2 and ide_seges=${establecimiento}`
    }else{
      sql=`SELECT ide_heg,b.ide_indtp,fecha_medicion_heg as fecha,nro_herramienta_heg as indicador,unidad_operativa_heg as establecimiento,
      numerador_heg as numerador,denominador_heg as denominador,porcentaje_heg as porcentaje,detalle_indtp as periodo,
      responsable_medicion_heg as responsable, extract(year from date(fecha_medicion_heg)) as anio
      FROM (
          SELECT *,
                 ROW_NUMBER() OVER (PARTITION BY unidad_operativa_heg, nro_herramienta_heg ORDER BY fecha_medicion_heg DESC) AS rn
          FROM her_encabezado_general
      ) AS subconsulta
      inner join ind_tiempo b on b.ide_indtp=subconsulta.ide_indtp
      WHERE rn = 1 and ide_segdis=$1 and nro_herramienta_heg=$2`;
    }

    sql += "  order by ide_heg,ide_indtp desc"

    try {

      const data = await this.poolService.consult(sql, [distrito, herramienta]);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar',
        error
      });
    }
  }

  async getDataIndicador(tabla: string, encabezado: number, orden: string) {

    let sql = `select * from ${tabla}
    where ide_heg=$1
    order by ${orden}`;

    try {
      const data = await this.poolService.consult(sql, [encabezado]);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar',
        error
      });
    }
  }


  async getPorcentajeComplicacion(establecimiento: number, anio: string) {

    try {
      let sql = `select * from her_porcentaje_complicaciones where ide_heg=(select ide_heg from her_encabezado_general
        where nro_herramienta_heg='12' and ide_seges=$1
        and extract(year from date(fecha_medicion_heg))= $2
        order by ide_heg desc limit 1)`;
      const data = await this.poolService.consult(sql, [establecimiento, anio]);


      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar',
        error
      });
    }
  }

  //obtiene el ultimo puntaje de todos los indicadores

  async getPuntaje(ide: number) {
    let array = {
      'unoNueve': [],
      'diez': Number,
      'once': Number,
      'doce': Number,
      'trece': Number
    }

    let sql = `select porcentaje_estandar_hlic as porcentaje
    from her_lista_chequeo where ide_seges=$1 order by ide_hlic desc limit 1;`
    let consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='2' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='3a' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='3b' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='4' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='5' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='6' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='7a' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='7b' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='8a' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='8b' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='8c' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='8d' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='8e' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='8f' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='9a' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='9b' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='9c' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.unoNueve.push(consult[0]);

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='10' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.diez = consult[0];

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='11' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.once = consult[0];

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='12' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.doce = consult[0];

    sql = `select porcentaje_heg as porcentaje
    from her_encabezado_general where ide_seges=$1 and nro_herramienta_heg='13' order by ide_heg desc limit 1;`
    consult = await this.poolService.consult(sql, [ide]);
    array.trece = consult[0];

    console.log(consult);


    try {
      const data = array;
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

  async getReporteDistrito(anio: string, ide: number) {
    let array = new Array();
    let sql = `SELECT
    '1' as indicador,
    COALESCE(TRUNC(SUM(CASE WHEN b.ide_indtp=13 THEN a.items_cumple_hlic END)),0) AS numerador_trimestre_1,
    COALESCE(TRUNC(SUM(CASE WHEN b.ide_indtp=13 THEN a.total_items_hlic END)),0) AS denominador_trimestre_1,
    COALESCE(TRUNC(SUM(CASE WHEN b.ide_indtp=14 THEN a.items_cumple_hlic END)),0) AS numerador_trimestre_2,
    COALESCE(TRUNC(SUM(CASE WHEN b.ide_indtp=14 THEN a.total_items_hlic END)),0) AS denominador_trimestre_2,
    COALESCE(TRUNC(SUM(CASE WHEN b.ide_indtp=15 THEN a.items_cumple_hlic END)),0) AS numerador_trimestre_3,
    COALESCE(TRUNC(SUM(CASE WHEN b.ide_indtp=15 THEN a.total_items_hlic END)),0) AS denominador_trimestre_3,
    COALESCE(TRUNC(SUM(CASE WHEN b.ide_indtp=16 THEN a.items_cumple_hlic END)),0) AS numerador_trimestre_4,
    COALESCE(TRUNC(SUM(CASE WHEN b.ide_indtp=16 THEN a.total_items_hlic END)),0) AS denominador_trimestre_4
FROM
    her_lista_chequeo a, ind_tiempo b
WHERE a.ide_indtp = b.ide_indtp  and extract(year from date(fecha_medicion_hlic))=$1 and a.ide_segdis=$2
GROUP BY
    indicador
ORDER BY
    indicador asc;`
    const consult_1 = await this.poolService.consult(sql, [anio, ide]);

    sql = `SELECT
    a.nro_herramienta_heg as indicador,
    COALESCE(SUM(CASE WHEN b.ide_indtp BETWEEN 1 AND 3 THEN a.numerador_heg END),0) AS numerador_trimestre_1,
    COALESCE(SUM(CASE WHEN b.ide_indtp BETWEEN 1 AND 3 THEN a.denominador_heg END),0) AS denominador_trimestre_1,
    COALESCE(SUM(CASE WHEN b.ide_indtp BETWEEN 4 AND 6 THEN a.numerador_heg END),0) AS numerador_trimestre_2,
    COALESCE(SUM(CASE WHEN b.ide_indtp BETWEEN 4 AND 6 THEN a.denominador_heg END),0) AS denominador_trimestre_2,
    COALESCE(SUM(CASE WHEN b.ide_indtp BETWEEN 7 AND 9 THEN a.numerador_heg END),0) AS numerador_trimestre_3,
    COALESCE(SUM(CASE WHEN b.ide_indtp BETWEEN 7 AND 9 THEN a.denominador_heg END),0) AS denominador_trimestre_3,
    COALESCE(SUM(CASE WHEN b.ide_indtp BETWEEN 10 AND 12 THEN a.numerador_heg END),0) AS numerador_trimestre_4,
    COALESCE(SUM(CASE WHEN b.ide_indtp BETWEEN 10 AND 12 THEN a.denominador_heg END),0) AS denominador_trimestre_4
FROM
    her_encabezado_general a, ind_tiempo b
WHERE a.ide_indtp = b.ide_indtp and a.ide_indtp<13 and nro_herramienta_heg != '8' and extract(year from date(fecha_medicion_heg))=$1 and a.ide_segdis=$2
GROUP BY
    indicador
ORDER BY
    indicador asc;`
    const consult_2 = await this.poolService.consult(sql, [anio, ide]);

    sql = `SELECT
    a.nro_herramienta_heg as indicador,
   	0 AS numerador_trimestre_1,
   	0 AS denominador_trimestre_1,
    COALESCE(SUM(CASE WHEN b.ide_indtp=17 THEN a.numerador_heg END),0) AS numerador_trimestre_2,
    COALESCE(SUM(CASE WHEN b.ide_indtp=17 THEN a.denominador_heg END),0) AS denominador_trimestre_2,
    0 AS numerador_trimestre_3,
    0 AS denominador_trimestre_3,
    COALESCE(SUM(CASE WHEN b.ide_indtp=18 THEN a.numerador_heg END),0) AS numerador_trimestre_4,
    COALESCE(SUM(CASE WHEN b.ide_indtp=18 THEN a.denominador_heg END),0) AS denominador_trimestre_4
FROM
    her_encabezado_general a, ind_tiempo b
	WHERE a.ide_indtp = b.ide_indtp and a.ide_indtp in (17,18) and extract(year from date(fecha_medicion_heg))=$1 and ide_segdis=$2
GROUP BY
    indicador
ORDER BY
    indicador asc;`
    const consult_3 = await this.poolService.consult(sql, [anio, ide]);

    array = [...consult_1, ...consult_2, ...consult_3]


    try {
      const data = array;
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

  async getReporteZonal(anio: string) {

    let sql = `select detalle_thprov as provincia, nro_distrito as distrito, 
    ROUND(COALESCE(AVG(porcentaje_estandar_hlic),0),2) as promedio_1,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '2' THEN porcentaje_heg END), 0),2) AS dos,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '3a' THEN porcentaje_heg END), 0),2) AS tres_a,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '3b' THEN porcentaje_heg END), 0),2) AS tres_b,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '4' THEN porcentaje_heg END), 0),2) AS cuatro,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '5' THEN porcentaje_heg END), 0),2) AS cinco,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '6' THEN porcentaje_heg END), 0),2) AS seis,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '7a' THEN porcentaje_heg END), 0),2) AS siete_a,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '7b' THEN porcentaje_heg END), 0),2) AS siete_b,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '8a' THEN porcentaje_heg END), 0),2) AS ocho_a,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '8b' THEN porcentaje_heg END), 0),2) AS ocho_b,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '8c' THEN porcentaje_heg END), 0),2) AS ocho_c,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '8d' THEN porcentaje_heg END), 0),2) AS ocho_d,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '8e' THEN porcentaje_heg END), 0),2) AS ocho_e,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '8f' THEN porcentaje_heg END), 0),2) AS ocho_f,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '9a' THEN porcentaje_heg END), 0),2) AS nueve_a,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '9b' THEN porcentaje_heg END), 0),2) AS nueve_b,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '9c' THEN porcentaje_heg END), 0),2) AS nueve_c,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '10' THEN porcentaje_heg END), 0),2) AS diez,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '11' THEN porcentaje_heg END), 0),2) AS once,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '12' THEN porcentaje_heg END), 0),2) AS doce,
    ROUND(COALESCE(AVG(CASE WHEN nro_herramienta_heg = '13' THEN porcentaje_heg END), 0),2) AS trece
    from her_encabezado_general a, seg_distrito b, th_provincia c,her_lista_chequeo d
    where a.ide_segdis=b.ide_segdis and b.ide_thprov=c.ide_thprov and d.ide_segdis=b.ide_segdis and extract(year from date(fecha_medicion_heg))=$1
    group by provincia,distrito`
    const consult = await this.poolService.consult(sql, [anio]);



    try {
      return {
        success: true,
        data: consult
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query'
      });
    }
  }


  async getHistorico() {
    let array = new Array();
    let sql = `select 3 as zona, provincia_hlic as provincia, distrito_hlic as distrito,establecimiento_hlic as establecimiento,
    fecha_medicion_hlic as fecha_medicion, detalle_indtp as periodo, '1a' as indicador, responsable_medicion_hlic,items_cumple_hlic as numerador,
    total_items_hlic as denominador, porcentaje_estandar_hlic as porcentaje
    from her_lista_chequeo a, ind_tiempo b
    where a.ide_indtp=b.ide_indtp`
    const consult_1 = await this.poolService.consult(sql);

    sql = `select 3 as zona, provincia_heg as provincia, distrito_heg as distrito,unidad_operativa_heg as establecimiento,
    fecha_medicion_heg as fecha_medicion, detalle_indtp as periodo, responsable_medicion_heg as responsable,nro_herramienta_heg as indicador, 
    numerador_heg as numerador,denominador_heg as denominador, porcentaje_heg as porcentaje
    from her_encabezado_general a, ind_tiempo b
    where a.ide_indtp=b.ide_indtp`
    const consult_2 = await this.poolService.consult(sql);



    array = [...consult_1, ...consult_2]


    try {
      const data = array;
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







}
