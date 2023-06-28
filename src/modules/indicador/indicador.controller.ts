import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreateHerramientaUnoDto } from './dto/new-h1.dto';
import { CreateHerramientaDto } from './dto/create.dto';
import { IndicadoresDto } from './dto/indicadores.dto';

@ApiBearerAuth()
@ApiTags('Indicadores')
@Controller('indicador')
export class IndicadorController {
  constructor(private readonly indicadorService: IndicadorService) {}


  @UseGuards(JwtAuthGuard)
  @Get('insumos/:area')
  getColumn(@Param('area') area: number) {
    return this.indicadorService.getInsumos(area);
  }

  @UseGuards(JwtAuthGuard)
  @Get('numero-sala/:establecimiento')
  getNumeroSala(@Param('establecimiento') establecimiento: number) {
    return this.indicadorService.getNumeroSala(establecimiento);
  }

  @UseGuards(JwtAuthGuard)
  @Post('guardar-1')
  guardarHUno(@Body() data:CreateHerramientaUnoDto) {
    return this.indicadorService.guardarHUno(data);
  }

  //
  @UseGuards(JwtAuthGuard)
  @Get('tiempo')
  getTiempo(@Query('condition') condition: string) {
    return this.indicadorService.getTiempo(condition);
  }

  //

  @UseGuards(JwtAuthGuard)
  @Post('indicadores')
  getIndicadores(@Body() data: IndicadoresDto,@Query('condition') condition: string) {
    return this.indicadorService.getIndicadores(data,condition);
  }
  //TODO: indicador 2

  @UseGuards(JwtAuthGuard)
  @Get('prenatal')
  getPrenatal() {
    return this.indicadorService.getPrenatal();
  }

  @UseGuards(JwtAuthGuard)
  @Post('guardar/:tabla1/:ide1/:tabla2')
  saveData(@Body() data:CreateHerramientaDto,@Param('tabla1') tabla1:string,@Param('ide1') ide1:string,@Param('tabla2') tabla2:string,@Query('tabla3') tabla3: string) {
    return this.indicadorService.saveData(data,tabla1,ide1,tabla2,tabla3);
  }

  @UseGuards(JwtAuthGuard)
  @Get('uno-a/:distrito')
  getIUnoA(@Param('distrito') distrito: number,@Query('establecimiento') establecimiento: number) {
    return this.indicadorService.getIUnoA(distrito,establecimiento);
  }

  @UseGuards(JwtAuthGuard)
  @Get('data-uno-a/:ide/:area')
  getDataUnoA(@Param('ide') ide: number,@Param('area') area: number) {
    return this.indicadorService.getDataUnoA(ide,area);
  }

  @UseGuards(JwtAuthGuard)
  @Get('encabezado/:distrito/:herramienta')
  getEncabezadoGeneral(@Param('distrito') distrito: number,@Param('herramienta') herramienta: string,@Query('establecimiento') establecimiento:number) {
    return this.indicadorService.getEncabezadoGeneral(distrito,herramienta,establecimiento);
  }

  @UseGuards(JwtAuthGuard)
  @Get('data-indicador/:tabla/:encabezado/:orden')
  getDataIndicador(@Param('tabla') tabla:string,@Param('encabezado') encabezado: number,@Param('orden') orden: string) {
    return this.indicadorService.getDataIndicador(tabla,encabezado,orden);
  }



  @UseGuards(JwtAuthGuard)
  @Post('actualizar/:tabla1/:condition/:tabla2/:condition2/:indicador')
  updateData(@Body() data:CreateHerramientaDto,@Param('tabla1') tabla1:string,@Param('condition') condition:string,@Param('tabla2') tabla2:string,@Param('condition2') condition2:string,@Param('indicador') indicador:string,@Query('tabla3') tabla3: string,@Query('condition3') condition3: string) {
    return this.indicadorService.update(data,tabla1,condition,tabla2,condition2,indicador,tabla3,condition3);
  }

  @UseGuards(JwtAuthGuard)
  @Get('porcentaje-complicacion/:establecimiento/:anio')
  getPorcentajeComplicacion(@Param('establecimiento') establecimiento: number,@Param('anio') anio: string) {
    return this.indicadorService.getPorcentajeComplicacion(establecimiento,anio);
  }








 
}
