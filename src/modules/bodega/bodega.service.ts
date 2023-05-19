import { PoolService } from '@modules/pool/pool.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class BodegaService {

    constructor(private poolService: PoolService) { }

    async getProductos(busqueda: string) {
        const sql = `
        select a.ide_bomat,codigo_principal_bomat as codigo_principal,codigo_secundario_bomat as codigo_secundario,
        detalle_bomat as name, codigo_principal_bomat||' - '||detalle_bomat as detalle,a.ide_bounm as cod_unidad, detalle_bounm as unidad_medida,
        b.porcentaje_srdeim as iva, b.codigo_sri_srdeim as cod_sri_iva,c.porcentaje_srdeim as ice, 
        c.codigo_sri_srdeim as cod_sri_ice,d.porcentaje_srdeim as irbpnr, d.codigo_sri_srdeim as cod_sri_irbpnr,
        valor_bocoa as precio
        from bodt_material a
        left join sri_detalle_impuesto b on a.ide_srdeim=b.ide_srdeim
        left join sri_detalle_impuesto c on a.sri_ide_srdeim=c.ide_srdeim
        left join sri_detalle_impuesto d on a.sri_ide_srdeim2=d.ide_srdeim
        left join bodt_unidad_medida e on a.ide_bounm=e.ide_bounm
        left join bodt_costo_articulo f on a.ide_bomat=f.ide_bomat
        where activo_bomat=true and aplica_defecto_bocoa=true
        and activo_bocoa=true and codigo_principal_bomat like '%${busqueda}%' OR detalle_bomat like '%${busqueda}%'
        order by ide_bomat
        limit 10`;
        // console.log(sql);
        try {
            const data = await this.poolService.consult(sql);
            return {
                success: true,
                data
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: 'Error al consultar los materiales'
            });
        }

    }
    /**
     * 
     * @param multinacional 
     * @param empresa 
     * @param sucursal 
     * @returns  Retorna los materiales existentes en la sucursal.
     */
    async getMateriales(multinacional: number, empresa: number, sucursal: number) {
        const sql = `
        select ide_bomat as value,codigo_principal_bomat||' - '||detalle_bomat as label  from bodt_material
        where ide_segmul=$1 and ide_segemp=$2 and ide_segsuc=$3`;
        try {
            const data = await this.poolService.consult(sql,[multinacional,empresa,sucursal]);
            return {
                success: true,
                data
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: 'Error al consultar los materiales'
            });
        }

    }

    /**
     * Retorna el precio del producto
     * @param producto 
     * @returns 
     */
    async getPrecioProducto(producto: number) {
        const sql = `
        select tipo_aplica_bocoa,valor_aplicar_bocoa,valor_bocoa as precio 
        from bodt_costo_articulo
        where ide_bomat=$1 and aplica_defecto_bocoa=true
        and activo_bocoa=true`;

        return await this.poolService.consult(sql, [producto]);
    }



    async getMaterial(id: number) {
        const sql = `select ide_bomat,codigo_bomat,detalle_bomat
        from bodt_material
        where ide_bomat=$1`;
        try {
            const data = await this.poolService.consult(sql, [id]);
            return {
                success: true,
                data
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: 'Error al ejecutar query',
                error
            });
        }
    }


    async getUnidadMedida() {
        const sql = `select ide_bounm,detalle_bounm,abreviatura_bounm,activo_bounm from bodt_unidad_medida`;
        try {
            const data = await this.poolService.consult(sql);
            return {
                success: true,
                data
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
     * Retorna el tipo de transaccion 
     * @returns 
     */
    async getTipoTransaccion() {
        const sql = `select a.ide_botiti as value, b.nombre_botici || ' | ' ||  a.nombre_botiti as label
        from bodt_tip_tran_inve a 
        left join bodt_tip_comp_inve b
        on a.ide_botici = b.ide_botici`;
        try {
            const data = await this.poolService.consult(sql);
            return {
                success: true,
                data
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: 'Error al ejecutar query',
                error
            });
        }
    }


    /** Retorna el secuencial de un comprobante */
    async getSecuencialCompInventario(ide: number, anio: string) {
        let secuencial: any;
        const sql = `select abreviatura_botiti||' - '||count(ide_bocci) +1 as secuencial
        from (
        select ide_bocci,a.ide_geani,a.ide_botiti, abreviatura_botiti
        from bodt_cab_comp_inve a
        left join bodt_tip_tran_inve b on a.ide_botiti=b.ide_botiti 
        ) a
        where a.ide_botiti=$1 and a.ide_geani=$2
        group by abreviatura_botiti`;
        try {
            const data = await this.poolService.consult(sql, [ide, anio]);
            if (data.length > 0) {
                secuencial = data;
            } else {
                const data1 = await this.getSecuencialTipoCompInventario(ide);
                if (data1.length > 0) {
                    secuencial = data1;
                    console.log('data1' + secuencial);
                } else {
                    console.log('dataerror');
                    return {
                        success: false,
                        message: 'El comprobante no existe'
                    };
                }
            }
            return {
                success: true,
                data: secuencial
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: 'Error al ejecutar query',
                error
            });
        }
    }

    private async getSecuencialTipoCompInventario(ide: number) {
        const sql = `select abreviatura_botiti ||' - '||1 as secuencial
        from bodt_tip_tran_inve where ide_botiti=$1`;
        const data = await this.poolService.consult(sql, [ide]);
        return data;
    }

    /**
 * Retorna la bodega que se encuentra marcada por defecto 
 * @returns 
 */
    async getBodegaDefecto() {
        const sql = `select ide_bobod as value, detalle_bobod as label
        from bodt_bodega
        where bodega_defecto_bobod in (true)`;
        try {
            const data = await this.poolService.consult(sql);
            return {
                success: true,
                data
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
     * 
     * @param ide_bogrm identificador del grupo al que pertenece el material
     * @returns el subgrupo al que pertence el material
     */

    async getSubgrupoMaterial(ide_bogrm: number) {
        const sql = `select a.ide_bosgr as value, a.detalle_bosgr as label
        from bodt_subgrupo_material a
        left join bodt_grupo_subrupo b 
        on a.ide_bosgr = b.ide_bosgr
        where b.ide_bogrm = $1`;
        try {
            const data = await this.poolService.consult(sql,[ide_bogrm]);
            return {
                success: true,
                data
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
     * 
     * @returns Retorna una lista con todos los materiales
     */
     async getListaMateriales(multinacional:number, empresa:number, sucursal: number) {
        const sql = `select a.ide_bomat, a.ide_bogrm as grupo_material, a.ide_bosgr as subgrupo_material, a.ide_botip as tipo,
        a.ide_bocat as categoria, a.ide_srdeim as iva,(case when a.sri_ide_srdeim is null then 0 else a.sri_ide_srdeim end) as ice,
        (case when a.sri_ide_srdeim is null then 0 else a.sri_ide_srdeim2 end) as ibrpn,a.codigo_principal_bomat as cod_principal,
        a.codigo_secundario_bomat as cod_secundario, a.detalle_bomat as detalle, a.observacion_bomat as observacion, a.foto_material_bomat as foto
        from bodt_material 	a
        
        where ide_segmul=$1 and ide_segemp=$2 and ide_segsuc=$3
        order by a.ide_bomat`;
        try {
            const data = await this.poolService.consult(sql,[multinacional,empresa,sucursal]);
            return {
                success: true,
                data
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
     * 
     * @param ide_bogrm identificador del grupo material
     * @returns    Retorna los productos de acuerdo al grupo material al que pertenecen
     */ 
    async getProductosSegunTipo(ide_bogrm) {
        const sql = `select * 
        from bodt_material 
        where ide_bogrm = $1
        order by ide_bomat desc`;
        try {
            const data = await this.poolService.consult(sql,[ide_bogrm]);
            return {
                success: true,
                data
            };
        } catch (error) {
            throw new BadRequestException({
                success: false,
                message: 'Error al ejecutar query',
                error
            });
        }
    }


    





}
