import { Injectable } from '@nestjs/common';
import { Connection, InsertResult, UpdateQueryBuilder, UpdateResult } from 'typeorm';

@Injectable()
export class PoolService {

    private queryRunner: Connection;

    constructor(private connection: Connection) {
        this.queryRunner = this.connection;
    }

    /**
    * Permite insertar datos en una tabla
    * @param nombreTabla nombre de la tabla
    * @param datos datos
    * @param resultado que campo desea retornar despues de insertar por defaul all
    * @returns Promise<any>
    */
    async insert(nombreTabla: string, datos: any, resultado?: any): Promise<InsertResult> {
        if (resultado === undefined) {
            resultado = '*';
        }
        return await this.queryRunner.createQueryBuilder()
            .insert()
            .into(nombreTabla)
            .values(datos)
            .returning(resultado)
            .execute();
    }

    /**
     * Permite actualizar los datos de una tabla
     * @param nombreTabla nombre de tabla
     * @param parameters campos
     * @param condiciones condicion
     * @returns Promise<any>
     */
    async update(nombreTabla: string, parameters: UpdateQueryBuilder<unknown>, condiciones: any): Promise<UpdateResult> {
        const { condition, values } = condiciones[0];
        //console.log('parametros de condicion ', condition, values);
        /* await this.queryRunner.createQueryBuilder()
        .update(nombreTabla)
        .set(parameters)
        .where(condition, values)
        .getQueryAndParameters();
         */// console.log('ejecuto este sl ', sql);

        //console.log(nombreTabla);
         //console.log(parameters);
         /*console.log(condiciones); */
        return await this.queryRunner.createQueryBuilder()
            .update(nombreTabla)
            .set(parameters)
            .where(condition, values)
            .execute();
    }

    /**
     * Permite ejecutar una consulta
     * @param query {string} sql
     * @param parameters {any[]} condicion con parametros
     * @returns Promise<any>
     */
    async consult(query: string, parameters?: any[]): Promise<any> {
        return await this.queryRunner.query(query, parameters);
    }

    /**
     * Permite eliminar los datos de una tabla
     * @param query sql
     * @param parameters condicion
     * @returns Promise<any>
     */
    async delete(query: string, parameters?: any[]): Promise<any> {
        return await this.queryRunner.query(query, parameters);
    }

    /**
     * Permite ejecutar cualquier query
     * @param query sql
     * @param parameters condition 
     * @returns Promise<any>
     */
    async executeQuery(query: string, parameters?: any[]): Promise<any> {
        return await this.queryRunner.query(query, parameters);
    }

    /**
     * Sistema de paginacion
     * @param primaryKey 
     * @param tableName 
     * @param page 
     * @param itemsPage 
     * @returns 
     */
    async getPagination(tableName: string, page: number = 10, itemsPage: number = 20) {
        // console.log(tableName);
        const total = await this.queryRunner.query(`select count(*) as total from ${tableName}`);
        const pages = Math.ceil(total[0].total / itemsPage);
        return {
            page,
            skip: (page - 1) * itemsPage,
            itemsPage,
            total: total[0].total,
            pages
        };
    }

    async select(query: string, parameters?: any[]): Promise<any> {
        //console.log('user logueado => ', this.req.user['username']);
        return await this.queryRunner.query(query, parameters);
      }
}
