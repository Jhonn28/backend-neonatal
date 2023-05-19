import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TalentoHumanoService } from './talento-humano.service';


@ApiTags('Talento Humano')
@Controller('talento-humano')
export class TalentoHumanoController {
  constructor(private readonly _talentoHumanoService: TalentoHumanoService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getCiudades/:provincia')
  getCiudades(@Param('provincia') provincia: number) {
    return this._talentoHumanoService.getCiudades(provincia);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getParroquias')
  getParroquias(@Query('provincia') provincia: number,@Query('ciudad') ciudad: number) {
    return this._talentoHumanoService.getParroquias(provincia, ciudad);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('getAreaMaterial')
  getAreaMaterial() {
    return this._talentoHumanoService.getAreaMaterial();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('farmaco')
  getFarmacos() {
    return this._talentoHumanoService.getFarmacos();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('actividades')
  getActividades() {
    return this._talentoHumanoService.getActividades();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('empleado')
  getEmpleado(@Query('cl') cl: string) {
    return this._talentoHumanoService.getEmpleado(cl);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('empleado-establecimiento/:establecimiento')
  getEmpleadoEstablecimiento(@Param('establecimiento') establecimiento: number) {
    return this._talentoHumanoService.getEmpleadoEstablecimiento(establecimiento);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('responsable')
  getResponsable(@Query('coor') coor: number,@Query('dis') dis: number,@Query('estab') estab: number) {
    return this._talentoHumanoService.getResponsable(coor,dis,estab);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('forma-farmaceutica/:busqueda')
  getFormaFarmaceutica(@Param('busqueda') busqueda: string): Promise<{ data: any; }> {
    return this._talentoHumanoService.getFormaFarmaceutica(busqueda);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('autoriza-recetario/:establecimiento')
  getAutorizaRecetario(@Param('establecimiento') establecimiento: number) {
    return this._talentoHumanoService.getAutorizaRecetario(establecimiento);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('cargo')
  getCargo() {
    return this._talentoHumanoService.getCargo();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('aspectos')
  getAspectos() {
    return this._talentoHumanoService.getAspectos();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('procesos')
  getProcesos() {
    return this._talentoHumanoService.getProcesos();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('indicadores')
  getIndicadores() {
    return this._talentoHumanoService.getIndicadores();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('distritos')
  getDistritos() {
    return this._talentoHumanoService.getDistritos();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('establecimientos/:distrito')
  getEstablecimientos(@Param('distrito') distrito: number) {
    return this._talentoHumanoService.getEstablecimientos(distrito);
  }
}
