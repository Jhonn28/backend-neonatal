import { PoolService } from '@modules/pool/pool.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import Farmaco from './interfaces/farmaco.class';

@Injectable()
export class TalentoHumanoService {
    constructor(private poolService: PoolService) { }


    /**
     * 
     * @param provincia Identificador de provincia
     * @returns Retorna los cantones de acuerdo a la provincia
     */
    async getCiudades(provincia: number) {
        const sql = `
        select ide_thciu as value, detalle_thciu as label
        from th_ciudad a, th_provincia b
        where a.ide_thprov = b.ide_thprov and a.ide_thprov=$1`;
        try {
            const data = await this.poolService.consult(sql, [provincia]);
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

    /**
    * 
    * @param provincia Identificador de provincia
    * @returns Retorna los cantones de acuerdo a la provincia
    */
    async getParroquias(provincia: number, ciudad: number) {
        let sql = `
        select ide_thparr as value, detalle_thparr as label
        from th_parroquia a, th_ciudad b, th_provincia c
        where a.ide_thciu = b.ide_thciu and b.ide_thprov=c.ide_thprov `;

        if (provincia) {
            sql += ` and c.ide_thprov=${provincia}`;
        }
        if (ciudad) {
            sql += ` and b.ide_thciu=${ciudad}`;
        }

        console.log(sql);

        try {
            const data = await this.poolService.consult(sql);
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

    /* async getAreaMaterial() {
        const sql = `select a.ide_farm, a.detalle_farm, (case when a.far_ide_farm is null then null else b.detalle_farm end) as area,
        a.far_ide_farm
        from farm_farmacos a 
        left join farm_farmacos b on a.far_ide_farm=b.ide_farm
        order by a.detalle_farm`;
        try {
            const listaMaterial = new Array<Farmaco>();
            const data = [];
            const list = await this.poolService.consult(sql);
            console.log(list);
            for (const actual of list) {
                if (actual.far_ide_farm === null) {
                    const lista = new Farmaco();
                    if (actual.count > 0) {
                        lista.ide_farm = actual.ide_farm
                        lista.farmaco = actual.detalle_farm;
                        lista.far_ide_farm = actual.far_ide_farm;
                        listaMaterial.push(lista);
¿                        this.form_area_farmaco(lista, actual, list);
                        continue;
                    }
                    lista.ide_farm = actual.ide_farm
                    lista.farmaco = actual.detalle_farm;
                    lista.far_ide_farm = actual.far_ide_farm;
                    console.log(listaMaterial);
                }
            }
            const data = await this.poolService.consult(sql);
            return {
                success: true,
                message: 'Obtenido menu',
                data: listaMaterial
            }
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: 'Error al ejecutar query',
                error
            });
        }
    }

    private async form_area_farmaco(listaMaterial: Farmaco, fila: any, list: any) {
        const child = Array<Farmaco>();
        for (const filaActual of list) {
            if (fila.ide_farm === filaActual.far_ide_farm) {
                const materialNuevo = new Farmaco();
                if (filaActual.count > 0) {
                    materialNuevo.ide_farm = filaActual.ide_farm;
                    materialNuevo.farmaco = filaActual.farmaco;
                    materialNuevo.far_ide_farm= filaActual.far_ide_farm;
                    child.push(materialNuevo);
                    listaMaterial.children = child;
                    this.form_area_farmaco(materialNuevo, filaActual, list);
                    continue;
                }
                materialNuevo.ide_farm = filaActual.ide_farm
                materialNuevo.farmaco = filaActual.detalle_farm;
                materialNuevo.far_ide_farm = filaActual.far_ide_farm;
                child.push(materialNuevo);
                listaMaterial.children = child;
            }
        }
    } */




    async getAreaMaterial() {
        /* console.log('rol=>',role); */
        /*  const sql = `select a.ide_farm, a.detalle_farm, (case when a.far_ide_farm is null then null else b.detalle_farm end) as area,
         a.far_ide_farm
         from farm_farmacos a 
         left join farm_farmacos b on a.far_ide_farm=b.ide_farm
         `; */
        const sql = `select a.ide_fararefar as value,detalle_thare, detalle_farm || ' - ' || detalle_formfar as label,nivel_uno_farm,
        nivel_dos_farm, nivel_tres_farm
        from farm_area_farmaco a, farm_farmacos b, th_area c, farm_forma_farmaceutica d
        where a.ide_farm=b.ide_farm and a.ide_thare=c.ide_thare and b.ide_formfar=d.ide_formfar
        order by detalle_thare
        `
        try {
            const data = await this.poolService.consult(sql);
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


    async getFormaFarmaceutica(key: string) {
        console.log('KEY=>', key);
        try {
            const sql = `select ide_formfar as value, detalle_formfar as label
          from farm_forma_farmaceutica
          where UPPER(detalle_formfar) like UPPER('%${key}%') `;
            console.log(sql);
            const data = await this.poolService.select(sql);
            console.log("data=>", data);
            return data
        } catch (error) {
            throw error;
        }
    }

    async getFarmacos() {

        const sql = `select a.ide_farm as value, a.detalle_farm || ' - ' || b.detalle_formfar as label
        from farm_farmacos a,farm_forma_farmaceutica b
        where a.ide_formfar=b.ide_formfar
        order by detalle_farm
        `
        try {
            const data = await this.poolService.consult(sql);
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

    //TODO: ESPECIALIDAD ACTIVIDAD
    async getActividades() {

        const sql = `select a.ide_thesac as codigo,b.detalle_thesp,c.detalle_act,b.ide_thesp
        from th_especialidad_actividad a, th_especialidades b, th_actividades c
        where a.ide_thact=c.ide_thact and a.ide_thesp=b.ide_thesp
        order by detalle_thesp
        `
        try {
            const data = await this.poolService.consult(sql);
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

    //TODO: EMPLEADO
    async getEmpleado(cl?: string) {
        console.log('empleado=>',cl);
        /* console.log('rol=>',role); */
        let sql = `select ide_gtemp as value, concat_ws(' ',apellido_paterno_gtemp,apellido_materno_gtemp,primer_nombre_gtemp,segundo_nombre_gtemp) as label
        from th_empleado where 1=1
        `;
        if (cl!='undefined' && cl!=null) {
            sql += ` and documento_identidad_gtemp='${cl}'`
        }
        sql+=' order by label'
        console.log(sql)
        try {
            const data = await this.poolService.consult(sql);
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

    async getResponsable(coor?: number, dis?: number, estab?: number ) {
        /* console.log('rol=>',role); */
        let sql = `select concat_ws(' ',apellido_paterno_gtemp,apellido_materno_gtemp,primer_nombre_gtemp,segundo_nombre_gtemp) as responsable `;
        if (coor) {
            sql += ` from seg_coordinacion a, th_empleado b
            where a.ide_gtemp=b.ide_gtemp and a.ide_segcoor=${coor}
            `
        }
        if(dis){
            sql += ` from seg_distrito a, th_empleado b
            where a.ide_gtemp=b.ide_gtemp and a.ide_segdis=${dis}
            `
        }
        if(estab){
            sql += ` from seg_establecimiento a, th_empleado b
            where a.ide_gtemp=b.ide_gtemp and a.ide_seges=${estab}
            `
        }
        sql+=' order by responsable';
        try {
            const data = await this.poolService.consult(sql);
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




    async getAutorizaRecetario(establecimiento: number) {
        const sql = `select b.ide_gtemp as value,concat_ws(' ',apellido_paterno_gtemp,apellido_materno_gtemp,primer_nombre_gtemp,segundo_nombre_gtemp) as empleado 
        from th_empleado_establecimiento a, th_empleado b, seg_establecimiento c
        where a.ide_gtemp=b.ide_gtemp and a.ide_seges=c.ide_seges and autoriza_recetatio_gtemp=true and a.ide_seges=$1
        order by empleado
        `;
        try {
            const data = await this.poolService.consult(sql, [establecimiento]);
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

    async getCargo() {
        /* console.log('rol=>',role); */
        const sql = `select ide_thcar as value, detalle_thcar as label
        from th_cargo 
        order by label
        `;
        try {
            const data = await this.poolService.consult(sql);
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

    async getEmpleadoEstablecimiento(establecimiento: number) {
        /* console.log('rol=>',role); */
        const sql = `select concat_ws(' ',apellido_paterno_gtemp,apellido_materno_gtemp,primer_nombre_gtemp,segundo_nombre_gtemp) as empleado 
        from th_empleado_establecimiento a, th_empleado b, seg_establecimiento c
        where a.ide_gtemp=b.ide_gtemp and a.ide_seges=c.ide_seges and a.ide_seges=$1
        order by empleado 
        `;
        try {
            const data = await this.poolService.consult(sql,[establecimiento]);
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

    async getAspectos() {
        /* console.log('rol=>',role); */
        const sql = `select ide_supa as value, detalle_supa as label
        from sup_aspectos
        order by label`;
        try {
            const data = await this.poolService.consult(sql);
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

    async getProcesos() {
        /* console.log('rol=>',role); */
        const sql = `select ide_sppro as value, detalle_sppro as label
        from sup_proceso 
        order by label`;
        try {
            const data = await this.poolService.consult(sql);
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

    async getIndicadores() {
        /* console.log('rol=>',role); */
        const sql = `select ide_evin as value, detalle_evpar as parametro, detalle_evin as indicador, valor_evin as valor
        from eva_indicador a, eva_parametro b
        where a.ide_evpar=b.ide_evpar
        order by parametro,indicador`;
        try {
            const data = await this.poolService.consult(sql);
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

    async getDistritos() {
        /* console.log('rol=>',role); */
        const sql = `select ide_segdis as value, nro_distrito||' - '||nombre_segdis as label
        from seg_distrito order by nro_distrito`;
        try {
            const data = await this.poolService.consult(sql);
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


    async getEstablecimientos(distrito: number) {
        /* console.log('rol=>',role); */
        const sql = `select ide_seges as value,unicodigo_seges||' - '||nombre_seges as label
        from seg_establecimiento
        where ide_segdis=$1
        order by unicodigo_seges`;
        try {
            const data = await this.poolService.consult(sql,[distrito]);
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




    



    



    

   

    /**
     * 
     * @param distrito identificador de distrito
     * @returns Retorna empleados de un distrito
     */
    /*     async getEmpleadosDistrito(distrito: number) {
            const sql = `
            select ide_gtemp as value, concat_ws(' ',documento_identidad_gtemp,primer_nombre_gtemp,segundo_nombre_gtemp,apellido_paterno_gtemp,apellido_materno_gtemp) as label
            from th_empleado a
            where a.ide_segdis=$1
            `;
            try {
                const data = await this.poolService.consult(sql,[distrito]);
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
         */







}
