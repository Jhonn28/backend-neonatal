import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BodegaService } from './bodega.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('Bodega')
@Controller('bodega')
export class BodegaController {

  constructor(private readonly bodegaService: BodegaService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getProductos/:busqueda')
  getProductos(@Param('busqueda') busqueda: string) {
    return this.bodegaService.getProductos(busqueda);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getMateriales/:multinacional/:empresa/:sucursal')
  getMateriales(@Param('multinacional') multinacional: number, @Param('empresa') empresa:number, @Param('sucursal') sucursal:number) {
    return this.bodegaService.getMateriales(multinacional,empresa,sucursal);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getMaterial/:id')
  getMaterial(@Param('id') id: number) {
    return this.bodegaService.getMaterial(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getUnidadMedida')
  getUnidadMedida() {
    return this.bodegaService.getUnidadMedida();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getSecuencialCompInventario/:id/:ano')
  getSecuencialCompInventario(@Param('id') id: number, @Param('ano') ano: string) {
    return this.bodegaService.getSecuencialCompInventario(id,ano);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getTipoTransaccion')
  getTipoTransaccion() {
    return this.bodegaService.getTipoTransaccion();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getBodegaDefecto')
  getBodegaDefecto() {
    return this.bodegaService.getBodegaDefecto();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getSubgrupoMaterial/:ide_bogrm')
  getSubgrupoMaterial(@Param('ide_bogrm') ide_bogrm: number) {
    return this.bodegaService.getSubgrupoMaterial(ide_bogrm);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('getListaMateriales/:multinacional/:empresa/:sucursal')
  getListaMateriales(@Param('multinacional') multinacional: number, @Param('empresa') empresa:number, @Param('sucursal') sucursal:number) {
    return this.bodegaService.getListaMateriales(multinacional,empresa,sucursal);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('getProductosSegunTipo/:ide_bogrm')
  getProductosSegunTipo(@Param('ide_bogrm') ide_bogrm: number) {
    return this.bodegaService.getProductosSegunTipo(ide_bogrm);
  }

}
