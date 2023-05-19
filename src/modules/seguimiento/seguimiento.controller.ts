import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EncabezadoSupervisionDto } from './dto/encabezado-supervision.dto';
import { BuscarDto } from './dto/buscar.dto';


@ApiTags('Seguimiento')
@Controller('seguimiento')
export class SeguimientoController {
  constructor(private readonly _seguimientoService: SeguimientoService) {}

  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('guardar-seguimiento')
  guardarSupervision(@Body() encabezadoDto: EncabezadoSupervisionDto) {
    return this._seguimientoService.guardarSupervision(encabezadoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('buscar')
  buscarSeguimiento(@Body() buscarDto: BuscarDto) {
    return this._seguimientoService.buscarSupervision(buscarDto);
  }

 
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('datos-seguimiento/:encabezado')
  getDatosSeguimiento(@Param('encabezado') encabezado: number) {
    return this._seguimientoService.getDatosSeguimiento(encabezado);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('puntaje/:establecimiento')
  getPuntaje(@Param('establecimiento') establecimiento: number) {
    return this._seguimientoService.getPuntaje(establecimiento);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('seguimientos/:longitud')
  getSeguimientos(@Body() body: any,@Param('longitud') longitud:number) {
    return this._seguimientoService.getSeguimientos(body,longitud);
  }


}
