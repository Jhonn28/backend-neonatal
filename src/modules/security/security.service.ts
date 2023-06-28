import { BadRequestException, Injectable } from '@nestjs/common';
import { hashSync, compareSync } from 'bcrypt';
import Utils from '@common/class/utils.class';
import { PoolService } from '../pool/pool.service';
import { ABRIO_PANTALLA, BLOQUEA_USUARIO, DESBLOQUEA_USUARIO, FALLO_INGRESO, SALIO_USUARIO } from '@config/accion-audit.const';
import { AuditAccessScreenDto, ColumnDto, ConsulTableDto, DeleteDto, DropdownDto, IsUniqueDto, SaveDataDto, TreeDto } from './dto';
import Tree from '@common/class/tree.class';
import MenuBar from '@common/class/menu-bar.class';
import { UpdateProfileDto } from './dto/update-profile-dto';
import Company from '@common/class/company.class';
import { MailService } from '../mail/mail.service';
import { PasswordDto } from './dto/password-dto';
import { UploadFirmaElectronicaDto } from './dto/upload-firma-electronica-dto';
import {  createWriteStream } from 'fs';
import { TemporalPasswordDto } from './dto/temporal-password.dto';


@Injectable()
export class SecurityService {

  constructor(private poolService: PoolService, private mailService: MailService) { }

  /**
   * Retorna los datos de un usuario especifico de acuerdo al id
   * @param id clave primaria del usuario
   * @returns 
   */
  async getUserOneById(id: number) {
    const sql = `select ide_segusu,username_segusu,cambia_clave_segusu from seg_usuario where ide_segusu=$1`;
    try {
      return await this.poolService.consult(sql, [id]);
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Returns the user data according to the username
   * @param username username
   * @returns user data
   */
  async getByUser(username: string | number, activo?: boolean): Promise<any> {
    //console.log(username);
    let sql = `select ide_segusu,a.ide_segper,nombre_segusu,username_segusu,correo_segusu,fecha_reg_segusu,
    activo_segusu,tema_segusu,bloqueado_segusu,fecha_caduc_segusu,cambia_clave_segusu,
    admin_multi_segusu as zona,reset_send_segusu,nombre_segper
    from seg_usuario a, seg_perfil b
    where 1=1`;
    if (activo) {
      sql += ` and a.ide_segper=b.ide_segper and ide_segusu=$1`;
    } else {
      sql += ` and a.ide_segper=b.ide_segper and username_segusu=$1`;
    }
    //console.log(sql);
    try {
      return await this.poolService.consult(sql, [username]);
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Retorna los datos del usuario autentificado
   */
  async getUserAutenticated(user: number) {
    let sql = `select ide_segusu,a.ide_segper,nombre_segusu,username_segusu,correo_segusu,fecha_reg_segusu,
    activo_segusu,tema_segusu,bloqueado_segusu,fecha_caduc_segusu,cambia_clave_segusu,
    admin_multi_segusu,reset_send_segusu,nombre_segper
    from seg_usuario a, seg_perfil b
    where a.ide_segper=b.ide_segper and ide_segusu=$1`;
    try {
      return await this.poolService.consult(sql, [user]);
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar datos del usuario autentificado',
        error
      });
    }
  }

  async ultimoAccesoUsuario(user: number) {
    let sql = `select fecha_seauac, hora_seauac 
    from seg_auditoria_acceso 
    where ide_segusu=$1 and ide_seacau=1
      and ide_seauac = (select max(ide_seauac) 
              from seg_auditoria_acceso 
              where ide_segusu=$1 and ide_seacau=1 and fin_seauac=false)`;
    try {
      return await this.poolService.consult(sql, [user]);
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al consultar la ultima fecha de acceso',
        error
      });
    }
  }

  async getLatestUserAccess(usuario: number) {
    let fecha = null;
    const data = await this.poolService.consult(`
    select fecha_seauac,hora_seauac
    from seg_auditoria_acceso 
    where ide_segusu=$1 and ide_seacau=$2
    and ide_seauac = (
      select max(ide_seauac) 
      from seg_auditoria_acceso 
      where ide_segusu=$1 and ide_seacau=$2 and fin_seauac=false)`, [usuario, SALIO_USUARIO]);
    if (data.length > 0) {
      fecha = Utils.convertDate(data[0].fecha_seauac) + ' ' + data[0].hora_seauac;
    }
    return fecha;
  }

  /**
   * Retorna el nímero máximo de intentos para poder acceder al
   * sistema
   * @param ide_segper clave primaria del perfil o rol
   * @returns 
   */
  async getNumberAccessAttempts(ide_segper: number) {
    let int_intentos = 3;
    const rules = await this.getRules(ide_segper);
    if (Utils.isDefined(rules) && rules.data.length > 0) {
      if (Utils.isDefined(rules.data[0].intentos_serecl)) {
        int_intentos = parseInt(rules.data[0].intentos_serecl, 10);
      }
    }
    return int_intentos;
  }

  /**
   * Retorna el número de intentos fallidos al tratar de acceder al sistema
   * @param usuario clave primaria del usuario
   * @param date fecha consulta
   * @param ip ip dispositivo
   * @param intentos intentos
   * @returns 
   */
  async getIntentsAccess(usuario: number, date: string, ip: string, intentos: number) {
    let int_intentos = 0;
    const sql = `select ide_segusu,count(*) as intentos 
                from seg_auditoria_acceso 
                where ide_segusu=$1 and fecha_seauac= $2 and ip_seauac=$3 
                and fin_seauac=false and ide_seacau=$4
                group by ide_segusu`;
    try {
      const intents = await this.poolService.consult(sql, [usuario, date, ip, FALLO_INGRESO]);
      if (Utils.isDefined(intents) && intents.length > 0) {
        int_intentos = parseInt(intents[0].intentos, 10);
        // Cuenta los desbloqueos para otra ves encerar el numero de
        // intentos despues de q se desbloque el usuario
        const sql2 = `select ide_segusu,count(*) as desbloqueos 
                      from seg_auditoria_acceso 
                      where ide_segusu=$1 and fecha_seauac= $2 and ip_seauac=$3 
                      and fin_seauac=false and ide_seacau=$4
                      group by ide_segusu`;
        const blockeds = await this.poolService.consult(sql2, [usuario, date, ip, DESBLOQUEA_USUARIO]);
        if (Utils.isDefined(blockeds) && blockeds.length > 0) {
          let int_num_desbloqueos = 0;
          int_num_desbloqueos = parseInt(blockeds[0].desbloqueos);
          if (int_num_desbloqueos > 0) {
            int_num_desbloqueos = int_num_desbloqueos * intentos;
            int_intentos = int_intentos - int_num_desbloqueos;
          }
        }
      }
      return int_intentos;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * Retorna las reglas de clave configuradas segun el perfil o rol
   * @param ide_segper clave primaria del perfil o rol
   * @returns 
   */
  async getRules(ide_segper: number) {
    const rules = [];
    const sql = `select a.ide_serecl, nombre_serecl,nombre_serecl, longitud_minima_serecl,
                num_carac_espe_serecl, num_mayus_serecl, num_minusc_serecl, num_numeros_serecl,
                intentos_serecl, longitud_login_serecl, num_valida_anterior_serecl
                from seg_perfil_reglas_clave a , seg_reglas_clave b
                where a.ide_serecl=b.ide_serecl and activo_seperc=true and ide_segper=$1`;
    try {
      const data = await this.poolService.consult(sql, [ide_segper]);

      let upper = '';
      let lower = '';
      let numbers = '';
      let special = '';
      let expression = [];
      let regUpper = new RegExp('');
      let regSpecial = new RegExp('');
      let regNumbers = new RegExp('');
      let regLower = new RegExp('');

      if (data.length > 0) {

        // longuitud password
        if (Utils.isDefined(data[0].longitud_minima_serecl) && data[0].longitud_minima_serecl > 0) {
          rules.push({ rule: `Tener minimo ${data[0].longitud_minima_serecl} caracteres` });
        }
        // mayusculas
        if (Utils.isDefined(data[0].num_mayus_serecl) && data[0].num_mayus_serecl > 0) {
          rules.push({ rule: `Al menos ${data[0].num_mayus_serecl} mayúscula(s)` });
          for (let i = 0; i < data[0].num_mayus_serecl; i++) {
            upper += ('.*[A-Z]')
            // console.log('mayusculas ', i);
          }
        }
        // minusculas
        if (Utils.isDefined(data[0].num_minusc_serecl) && data[0].num_minusc_serecl > 0) {
          rules.push({ rule: `Al menos ${data[0].num_minusc_serecl} minúsculas(s)` });
          for (let i = 0; i < data[0].num_minusc_serecl; i++) {
            lower += ('.*[a-z]');
            // console.log('minusculas ', i);
          }
        }
        // numeros
        if (Utils.isDefined(data[0].num_numeros_serecl)) {
          rules.push({ rule: `Al menos ${data[0].num_numeros_serecl} dígito(s)` });
          for (let i = 0; i < data[0].num_numeros_serecl; i++) {
            numbers += ('.*[0-9]');
            // console.log('números ', i);
          }
        }
        // caracteres especiales
        if (Utils.isDefined(data[0].num_carac_espe_serecl) && data[0].num_carac_espe_serecl > 0) {
          rules.push({ rule: `Incluir ${data[0].num_carac_espe_serecl} caracter(es) especiales como: !@#$%&*-_` });
          for (let i = 0; i < data[0].num_carac_espe_serecl; i++) {
            special += ('.*[!@#$%&*-_]')
            // console.log('caracteres especiales ', i);
          }
        }
        // genero la expresion
        if (Utils.isDefined(upper)) {
          regUpper = new RegExp(`^(?=${upper})`);
        }
        if (Utils.isDefined(special)) {
          regSpecial = new RegExp(`^(?=${special})`);
        }
        if (Utils.isDefined(numbers)) {
          regNumbers = new RegExp(`^(?=${numbers})`);
        }
        if (Utils.isDefined(lower)) {
          regLower = new RegExp(`^(?=${lower})`);
        }

        // expression.push(regUpper, regSpecial, regNumbers, regLower);
        // console.log('imprimo: ', regUpper, regSpecial, regNumbers, regLower);
      }

      return {
        success: true,
        message: 'Obtenido las reglas de clave',
        data,
        rules,
        expression
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  async getPasswordRules(ide_segper: number) {
    let upper = '';
    let lower = '';
    let numbers = '';
    let special = '';
    let expression = [];
    const rules = [];
    const sql = `select a.ide_serecl, nombre_serecl,nombre_serecl, longitud_minima_serecl,
                num_carac_espe_serecl, num_mayus_serecl, num_minusc_serecl, num_numeros_serecl,
                intentos_serecl, longitud_login_serecl, num_valida_anterior_serecl
                from seg_perfil_reglas_clave a , seg_reglas_clave b
                where a.ide_serecl=b.ide_serecl and activo_seperc=true and ide_segper=$1`;
    try {
      const data = await this.poolService.consult(sql, [ide_segper]);
      if (data.length > 0) {

        // longuitud password
        if (Utils.isDefined(data[0].longitud_minima_serecl) && data[0].longitud_minima_serecl > 0) {
          rules.push({ rule: `Tener minimo ${data[0].longitud_minima_serecl} caracteres` });
        }
        // mayusculas
        if (Utils.isDefined(data[0].num_mayus_serecl) && data[0].num_mayus_serecl > 0) {
          rules.push({ rule: `Al menos ${data[0].num_mayus_serecl} mayúscula(s)` });
          for (let i = 0; i < data[0].num_mayus_serecl; i++) {
            upper += ('.*[A-Z]')
            // console.log('mayusculas ', i);
          }
        }
        // minusculas
        if (Utils.isDefined(data[0].num_minusc_serecl) && data[0].num_minusc_serecl > 0) {
          rules.push({ rule: `Al menos ${data[0].num_minusc_serecl} minúsculas(s)` });
          for (let i = 0; i < data[0].num_minusc_serecl; i++) {
            lower += ('.*[a-z]');
            // console.log('minusculas ', i);
          }
        }
        // numeros
        if (Utils.isDefined(data[0].num_numeros_serecl)) {
          rules.push({ rule: `Al menos ${data[0].num_numeros_serecl} dígito(s)` });
          for (let i = 0; i < data[0].num_numeros_serecl; i++) {
            numbers += ('.*[0-9]');
            // console.log('números ', i);
          }
        }
        // caracteres especiales
        if (Utils.isDefined(data[0].num_carac_espe_serecl) && data[0].num_carac_espe_serecl > 0) {
          rules.push({ rule: `Incluir ${data[0].num_carac_espe_serecl} caracter(es) especiales como: !@#$%&*-_` });
          for (let i = 0; i < data[0].num_carac_espe_serecl; i++) {
            special += ('.*[!@#$%&*-_]')
            // console.log('caracteres especiales ', i);
          }
        }
      }
      return {
        success: true,
        message: 'Obtenido las reglas de contraseña',
        data,
        rules
      };

    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }


  /**
   * Retorna la información de la clave activa de un usuario
   * @param id clave primaria del usuario
   * @returns 
   */
  async getPasswordActiveUser(id: number) {
    const sql = `select ide_segusu,clave_seuscl from seg_usuario_clave where ide_segusu=$1 and activo_seuscl=true`;
    try {
      return await this.poolService.consult(sql, [id]);
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Inserta en la tabla de auditoria de acceso, 
   * se ejecuta cuando un usuario realiza alguna accion en el sistema
   * @param usuario clave primaria del usuario
   * @param accion clave primaria de la acción a realizar
   * @param detalle detalle de la acción
   * @param ip ip del dispositivo
   * @param device dispositivo
   * @param browser navegador
   * @param userAgent detalle del navegador
   * @returns 
   */
  async createAuditAccess(usuario: number, accion: number, detalle: string, ip: string, device: string, browser: string, userAgent: string) {
    const parametros = [{
      ide_segusu: usuario,
      ide_seacau: accion,
      fecha_seauac: Utils.currentDate(),
      hora_seauac: Utils.currentTime(),
      ip_seauac: ip, fin_seauac: false,
      detalle_seauac: detalle,
      device_seauac: device,
      browser_seauac: browser,
      user_agent_seauac: userAgent
    }];
    const data = await this.poolService.insert('seg_auditoria_acceso', parametros);
    return data;
  }

  /**
   * Bloquea un usuario
   * @param usuario 
   * @returns 
   */
  async blockUser(usuario: number, detalle: string, ip: string, device: string, browser: string, userAgent: string) {
    // Bloquea el estado
    const sql = "UPDATE seg_usuario SET bloqueado_segusu=true WHERE ide_segusu=$1";
    try {
      const data = await this.poolService.consult(sql, [usuario]);
      const audit = this.createAuditAccess(usuario, BLOQUEA_USUARIO, detalle, ip, device, browser, userAgent)
      return {
        success: true,
        message: 'Se bloqueo correctamente al usuario',
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Valida que el perfil del usuario este activo
   * @param profile clave primaria del perfil
   * @returns 
   */
  async isProfileActive(profile: number) {
    const sql = `	select ide_segper,nombre_segper from seg_perfil where ide_segper=$1 and activo_segper=true`;
    let state = false;
    try {
      const data = await this.poolService.consult(sql, [profile]);
      if (data.length > 0) {
        state = true;
      }
      return state;
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
  * If you have unsuccessful access attempts I reset them by ending them
  * @param usuario 
  * @param ip 
  * @returns 
  */
  async resetFailedAttempts(usuario: number, ip: string) {
    const sql = 'UPDATE seg_auditoria_acceso set fin_seauac=true WHERE ide_segusu=$1 and fecha_seauac=$2 and ip_seauac=$3';
    try {
      const data = await this.poolService.executeQuery(sql, [usuario, Utils.currentDate(), ip]);
      return {
        success: true,
        message: 'Se reseteo correctamente los intentos fallidos',
      };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Retorna las columnas de una con sus respectivas propiedades
   * @param columnDto 
   * @returns 
   */
  async getColumns(columnDto: ColumnDto) {
    const { tablename, tablenumber, uidOption } = columnDto;
    let data;
    try {
      const resp = await this.getTable(tablename, tablenumber, uidOption);
      if (resp.length > 0) {
        data = resp;
      } else {
        data = await this.getSchemas(tablename);
      }
      return { data };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Retorna los datos de una tabla
   * @param consulTableDto 
   * @returns 
   */
  async getConsultTable(consulTableDto: ConsulTableDto) {
    const { tablename, orderfield, condition, query } = consulTableDto;
    // console.log(query, Utils.isDefined(query));
    let sql = `SELECT * FROM ${tablename} WHERE 1 = 1`;
    let valorData = [];
    if (!(query === '')) {
      sql += ` ${query}`;
    }
    if (condition.length > 0) {
      sql += ` AND ${condition[0].condition}`;
      valorData = condition[0].values;
    }
    sql += ` ORDER BY ${orderfield}`;
    /*if (condition.length > 0 && Utils.isDefined(query)) {
      sql = `SELECT * FROM ${tablename} WHERE 1 = 1 AND ${query}  ${condition[0].condition} ORDER BY ${orderfield}`
      valorData = condition[0].values;
      // console.log('tiene condicion', condiciones, valorData);
    } else {
      sql = `SELECT * FROM ${tablename}  ORDER BY ${orderfield} `;
    }*/

    //console.log(query)
    try {

      // const pagination = await this.poolService.getPagination(tablename, 1, 20);
      /* console.log(sql); */
      // sql+=' limit 20 offset 1';
      const data = await this.poolService.consult(sql, valorData);
      // console.log(data);
      return { data };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Retorna la consulta de una tabla en forma de arbol
   * @param treeDto 
   * @returns 
   */
  async getConsultTree(treeDto: TreeDto) {
    const { tableName, primaryField, nameField, fatherField, orderField, condition } = treeDto;
    const treeMenu = new Array<Tree>();
    let valorData = [];
    let sql = `select ${primaryField} as data,${nameField} as label,${fatherField} as padre,
    (select count(${fatherField}) as total from ${tableName}
    where ${fatherField}=a.${primaryField})
    from ${tableName} a
    -- where 1=1" + this.condicion + " " + this.condicionEmpresa + "
    `;
    if (condition.length > 0) {
      sql += ` WHERE 1 = 1 AND ${condition[0].condition} ORDER BY ${fatherField} desc,${orderField}`
      valorData = condition[0].values;
    } else {
      sql += ` ORDER BY ${fatherField} desc,${orderField}`;
    }
    try {
      // console.log(sql, condition);
      const data = await this.poolService.consult(sql, valorData);
      for (const current of data) {
        if (current.padre === null) {
          const row = new Tree();
          if (current.total > 0) {
            row.collapsedIcon = "pi pi-folder";
            row.expandedIcon = "pi pi-folder-open";
            row.data = current.data;
            row.label = current.label;
            treeMenu.push(row);
            this.formar_arbol_recursivo(row, current, data);
            continue;
          }
          row.data = current.data;
          row.father = current.padre;
          row.label = current.label;
          row.icon = "pi pi-file";
          treeMenu.push(row);
        }
      }
      return { data: treeMenu };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Retorna los datos de una tabla para los combos
   * @param dropDownDto 
   * @returns 
   */
  async getDropDown(dropDownDto: DropdownDto) {

    const { tableName, primaryField, nameField, condition } = dropDownDto;
    let sql = "";
    let valorData = [];
    if (condition.length > 0) {
      sql += `WHERE 1 = 1 AND  ${condition[0].condition}`;
      valorData = condition[0].values;
    }
    /*if (condition) {
      sql = " WHERE 1 = 1 AND " + condition;
    }*/
    const query = `SELECT ${primaryField} AS value, ${nameField} AS label
        FROM ${tableName}
        ${sql}
        ORDER BY ${nameField}`;
    try {
      // console.log(query, valorData);
      const data = await this.poolService.consult(query, valorData);
      // console.log(data);
      return { data };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }

  }

  /**
   * Elimina una tabla expecifica
   * @param deletedto 
   * @returns 
   */
  async getDelete(deletedto: DeleteDto) {
    const { tableName, primaryField, valuePrimaryField } = deletedto;
    const sql = `DELETE FROM ${tableName} WHERE ${primaryField}=$1`;
    try {
      const data = await this.poolService.executeQuery(sql, [valuePrimaryField]);
      return { data };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * Verifica si el dato de una tabla es unica
   * @param isUniqueDto 
   * @returns 
   */
  async getIsUnique(isUniqueDto: IsUniqueDto) {
    const { tableName, field, valueField } = isUniqueDto;
    const sql = `select * from ${tableName} where 1=1 and ${field}=$1`;
    try {
      const data = await this.poolService.consult(sql, valueField);
      return { data };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Guarda y actualiza los datos de una tabla
   * @param saveData 
   */
  async saveData(saveData: SaveDataDto) {
    try {
      /* console.log('data enviado desde el front', saveData.listaSQL); */
      const datasql = saveData.listaSQL;
      datasql.sort((a: any, b: any) => (b.valores[b.campoPrimario] < a.valores[a.campoPrimario] ? -1 : 1));
      let cont = 0;
      // TODO: recorro la lista sql
      for (const data of datasql) {
        if (data.tipo === 'insertar') {
          cont = cont + 1;
          delete data.valores[data.campoPrimario];
          const uid = await this.poolService.insert(data.nombreTabla, data.valores, data.campoPrimario);
          const tablasHijas = data.relacion.split(',');
          // TODO: verifico si la tabla tiene tablas hijas relacionadas y recorro las tablas relacionadas
          if (tablasHijas.length > 0) {
            for (const tabla of tablasHijas) {
              // TODO: verifico si la tabla relacionada tiene registros hijos
              const hijos = datasql.filter((hijo: any) => { return hijo.nombreTabla === tabla; });
              hijos.sort((a: any, b: any) => (b.valores[b.campoPrimario] < a.valores[a.campoPrimario] ? -1 : 1));
              if (hijos.length > 0) {
                for (const hijo of hijos) {
                  delete hijo.valores[hijo.campoPrimario];
                  hijo.valores[hijo.campoforanea] = uid.raw[0][data.campoPrimario];
                  const uid1 = await this.poolService.insert(hijo.nombreTabla, hijo.valores);
                  this.removeItemFromArray(datasql, hijo);
                  const tablasHijas1 = hijo.relacion.split(',');
                  if (tablasHijas1.length > 0) {
                    for (const tabla1 of tablasHijas1) {
                      const hijos1 = datasql.filter((hijo1: any) => { return hijo1.nombreTabla === tabla1; });
                      hijos1.sort((a: any, b: any) => (b.valores[b.campoPrimario] < a.valores[a.campoPrimario] ? -1 : 1));
                      if (hijos1.length > 0) {
                        for (const hijo2 of hijos1) {
                          delete hijo2.valores[hijo2.campoPrimario];
                          hijo2.valores[hijo2.campoforanea] = uid1.raw[0][hijo.campoPrimario];
                          const uid2 = await this.poolService.insert(hijo2.nombreTabla, hijo2.valores, hijo2.campoPrimario);
                          this.removeItemFromArray(datasql, hijo2);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } else if (data.tipo === 'modificar') {
          /*data['user_update']='admin';
          data['date_update']=convertDate(currentTime());
          data['time_update']=convertDate(currentTime(), 'HH:mm:ss');*/
          // console.log('data a actualizar', data); 
          const update = await this.poolService.update(data.nombreTabla, data.valores, data.condiciones);
        }
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Retorna el menu de opcines del sistema
   * @returns 
   */
  async getOptions() {
    const sql = `select a.ide_segopc as value,UPPER(a.nombre_segopc)||' | '||
    ( case when a.seg_ide_segopc is null then 'PADRE' else UPPER(b.nombre_segopc) end ) ||' | '||
    ( case when c.seg_ide_segopc is null then 'PANTALLA' else 'MENU' end ) as label
    from seg_opcion a
    left join seg_opcion b on a.seg_ide_segopc=b.ide_segopc
    left join (
              select DISTINCT seg_ide_segopc
                from seg_opcion
                where seg_ide_segopc  in ( select ide_segopc from seg_opcion ) 
    ) c on a.ide_segopc=c.seg_ide_segopc 
    order by a.nombre_segopc`;
    try {
      const data = await this.poolService.consult(sql, []);
      return { data };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Returns the menu according to the user's profile or role
   * @param role profile or role
   * @returns menu
   */
  async getMenu(role: number) {
    /* console.log('rol=>',role); */
    const sql = `SELECT a.ide_segopc as codigo,nombre_segopc as nombre,subtitulo_segopc as subtitle,a.seg_ide_segopc as padre,ruta_segopc as ruta,icono_segopc as icono,
    (SELECT count(seg_ide_segopc) from seg_opcion where seg_ide_segopc=a.ide_segopc) as count
    FROM seg_opcion a ,seg_perfil_opcion b
    WHERE a.ide_segopc=b.ide_segopc
    AND b.ide_segper = $1
    ORDER BY a.seg_ide_segopc desc,nombre_segopc`;
    try {
      const menuOpciones = new Array<MenuBar>();
      const menu = [];
      menu.push({ id: -1, title: 'Home', type: 'basic', icon: 'fas fa-home', link: 'home' });
      const list = await this.poolService.consult(sql, [role]);
      for (const actual of list) {
        if (actual.padre === null) {
          const menus = new MenuBar();
          if (actual.count > 0) {
            menus.id = actual.codigo
            menus.title = actual.nombre;
            menus.icon = actual.icono;
            menus.link = actual.ruta;
            menus.parent = actual.padre;
            menus.subtitle = actual.subtitle;
            menus.type = "collapsable";
            menuOpciones.push(menus);
            /* console.log(menuOpciones); */
            this.form_menu_recursive(menus, actual, list);
            continue;
          }
          menus.id = actual.codigo
          menus.title = actual.nombre;
          menus.link = actual.ruta;
          menus.icon = actual.icono;
          menus.subtitle = actual.subtitle;
          menus.type = "basic";
          menuOpciones.push(menus);
        }
      }
      menu.push({ id: -2, title: 'OPCIONES', type: 'group', children: menuOpciones });
      // return menuOpciones;
      return {
        success: true,
        message: 'Obtenido menu',
        data: menu
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Registra la auditoria cuando ingresa a una pantalla o opción 
   * @param auditAccessScreenDto 
   * @returns 
   */
  async auditAccessScreen(auditAccessScreenDto: AuditAccessScreenDto) {
    const { ide_segusu, screen, ip, device, browser, userAgent } = auditAccessScreenDto;
    try {
      return await this.createAuditAccess(ide_segusu, ABRIO_PANTALLA, 'Ingresó a la pantalla ' + screen, ip, device, browser, userAgent);
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Retorna los datos del usuario especifico
   * @param id clave primaria del usuario
   * @returns 
   */
  async getUsersInfo(id: number) {
    const sql = `select a.ide_segusu,a.ide_segper, concat_ws(' ',apellido_paterno_gtemp,apellido_materno_gtemp,primer_nombre_gtemp,segundo_nombre_gtemp) as nombre_segusu,correo_segusu,foto_segusu,nombre_segper
                from seg_usuario a, seg_perfil b
                where a.ide_segper=b.ide_segper and ide_segusu=$1`;
    try {
      const data = await this.poolService.consult(sql, [id]);
      return {
        success: true,
        message: 'Obtenido datos de usuario',
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * returns the companies the user is assigned to 
   */
  async getUserCompany(usuario: number) {
    let sql = `select a.ide_seges,unicodigo_seges|| '-' || nombre_seges as nombre_seges,a.ide_segdis,nombre_segdis
    from seg_usuario_multisucursal a,seg_establecimiento b, seg_distrito c
    where a.ide_seges=b.ide_seges and a.ide_segdis=c.ide_segdis
    and ide_segusu=$1 and a.ide_seges is not null and activo_segmus=$2`;
    try {
      const data = await this.poolService.consult(sql, [usuario, true]);
      const company: any = [];
      if (data.length > 0) {
        data.forEach(element => {
          let multinacional = new Company();
          const multi = company.find(multi => multi.data === element.ide_segcoor);
          if (!multi) {
            let childEmp = Array<Company>();
            let childSucu = Array<Company>();
            const distrito = new Company();
            const establecimiento = new Company();

            // multinacional
            multinacional.data = element.ide_segcoor;
            multinacional.label = element.nombre_segcoor;

            // empresa
            distrito.data = element.ide_segdis;
            distrito.label = element.nombre_segdis;
            childEmp.push(distrito);
            // sucursal
            establecimiento.data = element.ide_seges;
            establecimiento.label = element.nombre_seges;
            childSucu.push(establecimiento);

            distrito.children = childSucu;
            multinacional.children = childEmp;

            company.push(multinacional);
          } else {
            const indexmult = company.indexOf(multi);
            const empre = company[indexmult].children;
            const index2 = empre.find(empr => empr.data === element.ide_segdis);
            if (!index2) {
              const distrito = new Company();
              const establecimiento = new Company();
              let childSucu = Array<Company>();
              // empresa
              distrito.data = element.ide_segdis;
              distrito.label = element.nombre_segdis;

              // sucursal
              establecimiento.data = element.ide_seges;
              establecimiento.label = element.nombre_seges;
              childSucu.push(establecimiento);
              distrito.children = childSucu;
              company[indexmult].children.push(distrito);
            } else {
              const indexEmpre = empre.indexOf(index2);
              const establecimiento = new Company();
              establecimiento.data = element.ide_seges;
              establecimiento.label = element.nombre_seges;
              company[indexmult].children[indexEmpre].children.push(establecimiento);
            }
          }
        });
      }

      return {
        success: true,
        message: 'Empresas asignado al usuario',
        data: company
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  // TODO: forgot and reset password 

  /**
     * Verifica si el usuario existe para resetear la contraseña
     * @param email 
     * @returns 
     */
  async forgotPassword(email: string) {
    const sql = 'select * from seg_usuario where correo_segusu=$1';
    try {
      return await this.poolService.consult(sql, [email]);
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Genera una contraseña temporal para restablecer contraseña
   * @param newPassword 
   * @param user 
   */
  async temporaryPassword(body: TemporalPasswordDto) {
    const { newPassword, user } = body;
    console.log(newPassword, user);
    try {
      const password = await hashSync(newPassword, 10);
      const data = await this.getUser(user);
      if (data.length <= 0) {
        throw (`El usuario no existe en la base de datos`);
      }
      await this.updatePassword(password, user);
      await this.updateChangePassword(true, user);
      console.log('paso update');
      const send = await this.mailService.sendMailTemporaryPassword(data[0].nombre_segusu, data[0].username_segusu, newPassword, data[0].correo_segusu);
      return {
        success: true,
        message: 'Se genero la contraseña temporal correctamente',
        send: send.response
      }

    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al generar la contraseña temporal',
        error
      });
    }
  }

  async changePassword(passwordDto: PasswordDto, usuario: number) {
    console.log('......', passwordDto, usuario);
    let sql = `select ide_segusu,clave_seuscl from seg_usuario_clave where ide_segusu=$1 and activo_seuscl=true`;
    try {
      const data = await this.poolService.consult(sql, [usuario]);
      const password = await hashSync(passwordDto.nuevaPassword, 10);
      if (data.length <= 0) {
        throw (`El usuario no existe en la base de datos`);
      }
      const isMatch = compareSync(passwordDto.passwordActual, data[0].clave_seuscl);
      if (!isMatch) {
        throw (`La contraseña no coincide.`);
      }
      await this.updatePassword(password, usuario);
      await this.updateChangePassword(false, usuario);
      return {
        success: true,
        message: 'Se cambio correctamente la contraseña.',
      }

    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al restablecer la contraseña',
        error
      });
    }
  }

  /*  async cambioContrasena(passwordDto: PasswordDto, usuario: number) {
     let sql = `select ide_segusu,clave_seuscl from seg_usuario_clave where ide_segusu=$1 and activo_seuscl=true`;
     try {
       const data = await this.poolService.consult(sql, [usuario]);
       const password = await hashSync(passwordDto.newPassword, 10);
       if (data.length <= 0) {
         throw (`El usuario no existe en la base de datos`);
       }
       const isMatch = compareSync(passwordDto.currentPassword, data[0].clave_seuscl);
       if (!isMatch) {
         throw (`La contraseña no coincide.`);
       }
       await this.updatePassword(password, usuario);
       await this.updateChangePassword(false, usuario);
       return {
         success: true,
         message: 'Se cambio correctamente la contraseña.',
       }
 
     } catch (error) {
       throw new BadRequestException({
         success: false,
         message: 'Error al restablecer la contraseña',
         error
       });
     }
   } */



  /**
   * Activa o desactiva un usuario en especifico
   */
  async activateDisableUser(user: number, state: boolean,) {
    const sql = 'update seg_usuario set activo_segusu=$1 where ide_segusu=$2';
    try {
      await this.poolService.executeQuery(sql, [state, user]);
      let message = '';
      if (state) {
        message = 'Usuario activado satisfactoriamente.';
      } else {
        message = 'Usuario desactivado satisfactoriamente';
      }

      return {
        success: true,
        message,
        state
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al activa o desactivar usuario',
        error
      });
    }
  }

  async blockUnblockUser(user: number, state: boolean) {
    const sql = 'update seg_usuario set bloqueado_segusu=$1 where ide_segusu=$2';
    try {
      await this.poolService.executeQuery(sql, [state, user]);
      let message = '';
      if (state) {
        message = 'Usuario bloqueado satisfactoriamente.';
      } else {
        message = 'Usuario desbloqueado satisfactoriamente';
      }

      return {
        success: true,
        message
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al bloquear o desbloquear usuario',
        error
      });
    }
  }

  async saveSignature(archivo: Express.Multer.File, body: UploadFirmaElectronicaDto) {

    if (!body.path) {
      throw new BadRequestException({
        success: false,
        message: 'Debe enviar el path o ruta para gurdar la firma electronica'
      });
    }

    try {
      const filename = archivo.originalname.split(' ').join('_');
      //const nombreCortado = name.split('.');
      //const extension = nombreCortado[nombreCortado.length - 1];
      //const filename = archivo.originalname;
      const path = body.path + '/' + filename;
      const sql = 'UPDATE sri_firma_electronica SET path_srfiel=$1 WHERE ide_srfiel=$2;';
      //console.log(path, nombreCortado);
      //if (!existsSync(path)) {
      const writeStream = createWriteStream(path);
      writeStream.write(archivo.buffer);
      writeStream.end();
      //}

      /*return {
        result: [res],
      };*/
      await this.poolService.executeQuery(sql, [filename, body.ide_srfiel]);
      return {
        success: true,
        message: 'Se registro correctamente la firma electrónica.'
      }

    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al bloquear o desbloquear usuario',
        error
      });
    }
  }


  // TODO: private

  private async getTable(tablename: string, tablenumber: number, uidOption: number) {
    const query = `select esquema_segtab as esquema, nombre_segcam as nombre, nom_visual_segcam as nombrevisual, orden_segcam as orden, visible_segcam as visible,
    lectura_segcam as lectura, defecto_segcam as valordefecto, mascara_segcam as mascara, filtro_segcam as filtro, comentario_segcam as comentario,
    mayuscula_segcam as mayuscula, requerido_segcam as requerida, unico_segcam as unico, correo_segcam as correo
    from seg_campo a, seg_tabla b
    where a.ide_segtab=b.ide_segtab and tabla_segtab =$1 and numero_segtab=$2 and ide_segopc=$3`;
    const data = await this.poolService.consult(query, [tablename, tablenumber, uidOption]);
    return data;
  }

  private async getSchemas(tablename: string) {
    const query = `select table_schema as esquema, table_name as nombretabla,column_name as nombre,column_name as nombrevisual, ordinal_position as orden,
    column_default as valordefecto,case when is_nullable ='YES' then false else true end as requerida, data_type as tipo,case when character_maximum_length is not null
    then character_maximum_length else case when numeric_precision is not null then numeric_precision end end as longitud, numeric_scale as decimales,
    case when data_type = 'bigint' then 'number' else case when data_type = 'integer' then 'number' else case when data_type = 'numeric' then 'decimals'
    else case when data_type = 'character varying' then 'text' else case when data_type = 'date' then 'date' else case when data_type = 'time without time zone'
    then 'time' else case when data_type = 'boolean' then 'check' else case when data_type = 'text' then 'textarea' else case when data_type = 'timestamp with time zone'
    then 'datetime' end end end end end end end end end as componente
    from information_schema.columns
    where table_name = $1`;
    const data = await this.poolService.consult(query, [tablename]);
    return data;
  }

  private async formar_arbol_recursivo(menu: Tree, fila: any, lista: any) {
    const child = Array<Tree>();
    for (const filaActual of lista) {
      if (fila.data === filaActual.padre) {
        const filaNueva = new Tree();
        if (filaActual.total > 0) {
          filaNueva.collapsedIcon = "pi pi-folder";
          filaNueva.expandedIcon = "pi pi-folder-open";
          filaNueva.data = filaActual.data;
          filaNueva.label = filaActual.label;
          child.push(filaNueva);
          menu.children = child;
          this.formar_arbol_recursivo(filaNueva, filaActual, lista);
          continue;
        }
        filaNueva.data = filaActual.data;
        filaNueva.father = filaActual.padre;
        filaNueva.label = filaActual.label;
        filaNueva.icon = 'pi pi-file';
        child.push(filaNueva);
        menu.children = child;
      }
    }
  }

  private async form_menu_recursive(menu: MenuBar, fila: any, list: any) {
    const child = Array<MenuBar>();
    for (const filaActual of list) {
      if (fila.codigo === filaActual.padre) {
        const menuNuevo = new MenuBar();
        if (filaActual.count > 0) {
          menuNuevo.id = filaActual.codigo
          menuNuevo.title = filaActual.nombre;
          menuNuevo.icon = filaActual.icono;
          menuNuevo.link = filaActual.ruta;
          menuNuevo.parent = filaActual.padre;
          menuNuevo.subtitle = filaActual.subtitle;
          menuNuevo.type = "collapsable";
          child.push(menuNuevo);
          menu.children = child;
          // menuOpciones.submenu = menu;
          this.form_menu_recursive(menuNuevo, filaActual, list);
          continue;
        }
        menuNuevo.id = filaActual.codigo
        menuNuevo.title = filaActual.nombre;
        menuNuevo.icon = filaActual.icono;
        menuNuevo.link = filaActual.ruta;
        menuNuevo.parent = filaActual.padre;
        menuNuevo.subtitle = filaActual.subtitle;
        menuNuevo.type = "basic";
        child.push(menuNuevo);
        menu.children = child;
      }
    }
  }

  /**
   * Elimina el dato de un array
   * @param arr array
   * @param item item a eliminar
   */
  private removeItemFromArray(arr: any, item: any) {
    const i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }

  /**
   * Retorna los parametros del sistema
   */
  async getParameters(name: string) {
    const sql = 'select valor_segpar from seg_parametros where nombre_segpar=$1';
    try {
      const data = await this.poolService.consult(sql, [name]);
      return {
        success: true,
        message: 'Obtenido parametros',
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  async updateProfile(updateProfileDto: UpdateProfileDto, usuario: number) {
    const { name, email, foto } = updateProfileDto;
    const sql = `UPDATE seg_usuario
    SET nombre_segusu=$1, correo_segusu=$2, foto_segusu=$3
    WHERE ide_segusu=$4 RETURNING ide_segusu;`;
    try {
      const data = await this.poolService.executeQuery(sql, [name, email, foto, usuario]);
      return {
        success: true,
        message: 'Se actualizo correctamente',
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }


  /**
   * Retorna los datos de una sucursal
   * @param sucursal primary key sucursal
   * @returns 
   */
  async getInfoSucursal(sucursal: number) {
    const sql = `
    select e.ide_thtipes as tipo,nro_distrito||' - '||nombre_segdis as distrito,nombre_seges as establecimiento, direccion_seges as direccion,
    detalle_thprov as provincia, detalle_thciu as ciudad,detalle_thtipes as tipo_establecimiento,
	  concat_ws('-',cedula_responsable_segdis,responsable_segdis) as responsable_distrito,
	  concat_ws('-',cedula_responsable_seges,responsable_seges) as responsable_establecimiento,detalle_thento as unidad_operativa
    from seg_establecimiento a, seg_distrito b, th_provincia c, th_ciudad d, th_tipo_establecimiento e,th_entidad_operativa f
    where a.ide_segdis=b.ide_segdis and b.ide_thprov = c.ide_thprov and d.ide_thciu = a.ide_thciu and a.ide_thtipes=e.ide_thtipes
	  and a.ide_thento=f.ide_thento and ide_seges=$1`;
    //const sql =`select * from seg_establecimiento where ide_seges=$1`;
    try {
      const data = await this.poolService.consult(sql, [sucursal]);
      return {
        success: true,
        message: 'Obteniendo datos de sucursal',
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * Retorna el username de los usuarios activos
   * @param activo estado activo del usuario
   * @returns 
   */
  async getUsuarioActivo(activo: boolean) {
    const sql = `select ide_segusu as value, username_segusu as label
                from seg_usuario
                where activo_segusu = $1`;
    try {
      const data = await this.poolService.consult(sql, [activo]);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
 * Retorna las sucursales de acuerdo a la empresa
 * @param seg_emp identificador de la empresa
 * @returns 
 */
  async getSucursal(sucursal: number, empresa: number) {
    let sql = `select ide_seges as value, nombre_seges as label from seg_establecimiento `;
    let valorData = [];
    if (sucursal && empresa) {
      sql += `WHERE ide_seges = $1 AND ide_segdis = $2`;
      valorData = [sucursal, empresa];
    } else if (sucursal) {
      sql += `WHERE ide_seges = $1 `;
      valorData = [sucursal];
    } else if (empresa) {
      sql += `WHERE ide_segdis = $1 `;
      valorData = [empresa];
    }
    sql += 'order by nombre_seges';
    try {
      const data = await this.poolService.consult(sql, valorData);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
 * Retorna las sucursales de acuerdo a la empresa
 * @param seg_emp identificador de la empresa
 * @returns 
 */
  async getEmpresa(empresa: number, multinacional: number) {
    let sql = `SELECT ide_segdis as value, nombre_segdis as label FROM seg_distrito `;
    let valorData = [];
    if (empresa && multinacional) {
      sql += `WHERE ide_segdis = $1 AND ide_segcoor = $2`;
      valorData = [empresa, multinacional];
    } else if (empresa) {
      sql += `WHERE ide_segdis = $1 `;
      valorData = [empresa];
    } else if (multinacional) {
      sql += `WHERE ide_segcoor = $1 `;
      valorData = [multinacional];
    }
    sql += 'order by nombre_segdis';
    try {
      const data = await this.poolService.consult(sql, valorData);
      return {
        success: true,
        data
      }
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }


  /**
   * Actualiza la contraseña de un usuario en especifico
   * @param password contraseña hasheada
   * @param user usuario
   * @returns 
   */
  private async updatePassword(password: string, user: number) {
    const query = `UPDATE seg_usuario_clave
    SET clave_seuscl=$1
    WHERE ide_segusu=$2;`;
    const data = await this.poolService.consult(query, [password, user]);
    return data;
  }


  /**
   * Actualizar la bandera de cambiar clave
   * @param status true-false 
   * @param user user
   * @returns 
   */
  private async updateChangePassword(status: boolean, user: number) {
    const query = `update seg_usuario set cambia_clave_segusu=$1 where ide_segusu=$2;`;
    const data = await this.poolService.consult(query, [status, user]);
    return data;
  }


  /**
   * Retorna los datos de un usuario
   * @param user 
   * @returns 
   */
  private async getUser(user: number) {
    const query = `select ide_segusu,ide_segper,nombre_segusu,
    username_segusu,correo_segusu 
    from seg_usuario a
    where ide_segusu=$1`;
    const data = await this.poolService.consult(query, [user]);
    return data;
  }

  /**
 * Retorna los establecimientos de acuerdo al distrito
 * @returns 
 */
  async getEstablecimientos(distrito: number) {
    let sql = `select ide_seges as value, unicodigo_seges || ' - ' || nombre_seges as label
      from seg_establecimiento a, seg_distrito b
      where a.ide_segdis = b.ide_segdis`;
    if (distrito) {
      sql += ` and a.ide_segdis=${distrito}`
    }
    sql += ' order by label'
    //console.log('distrito=>',sql)
    try {
      const data = await this.poolService.consult(sql);
      return { data };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }

  /**
   * 
   * @param unicodigo unicodigo del establecimiento
   * @returns Verifica que exista el establecimiento, devuelve distrito y establecimiento en caso de que si
   */

  async getExistEstab(unicodigo: string, distrito: string) {
    let sql = `select b.ide_segdis as distrito,a.ide_seges as establecimiento 
      from seg_establecimiento a,seg_distrito b
      where a.ide_segdis=b.ide_segdis`;

    if (unicodigo) {
      sql += ` and a.unicodigo_seges=${unicodigo}`
    } else if (distrito) {
      sql += ` and upper(b.nro_distrito) = upper('${distrito}') limit 1`
    }

    try {
      const data = await this.poolService.consult(sql);
      return { data };
    } catch (error) {
      throw new BadRequestException({
        success: false,
        message: 'Error al ejecutar query',
        error
      });
    }
  }





}
