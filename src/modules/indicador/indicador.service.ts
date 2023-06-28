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
      const { atencion_nacido, charol_emergencia, consultorio, atencion_parto, distrito_hlic, establecimiento_hlic, farmacia, fecha_medicion_hlic, ide_segdis, ide_seges, insumos, items_cumple_hlic, laboratorio, ide_indtp, porcentaje_estandar_hlic, promedio_atencion_nacido_hlic, promedio_atencion_parto_hlic, promedio_charol_hlic, promedio_farmacia_hlic, promedio_gineco_hlic, promedio_laboratorio_hlic, promedio_preparacion_hlic, promedio_servicio_hlic, provincia_hlic, responsable_medicion_hlic, servicio, total_items_hlic, zona_hlic } = newHUno;

      const encabezado = { ide_seges, ide_segdis, zona_hlic, provincia_hlic, distrito_hlic, establecimiento_hlic, fecha_medicion_hlic, ide_indtp, responsable_medicion_hlic, promedio_preparacion_hlic, promedio_gineco_hlic, promedio_farmacia_hlic, promedio_laboratorio_hlic, promedio_servicio_hlic, promedio_charol_hlic, promedio_atencion_parto_hlic, promedio_atencion_nacido_hlic, items_cumple_hlic, total_items_hlic, porcentaje_estandar_hlic }

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
    if(condition){
      sql+=` and ${condition}`
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
      where a.ide_indtp=b.ide_indtp and a.ide_indtp=${cabecera.ide_indtp} and extract(year from date(fecha_medicion_heg))= extract(year from date('${cabecera.fecha_medicion_heg}')) and nro_herramienta_heg='${cabecera.nro_herramienta_heg}'`


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
    let sql = `select * from her_lista_chequeo
    where ide_segdis=$1`;

    if (establecimiento) {
      sql += ` and ide_seges=${establecimiento}`
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

    let sql = `select * from her_encabezado_general
    where ide_segdis=$1 and nro_herramienta_heg=$2`;

    if (establecimiento) {
      sql += ` and ide_seges=${establecimiento}`
    }

    sql += "  order by ide_heg desc"

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




}
