import { Request, Controller, Get, Post, Body, Patch, Param, UseGuards, Query, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SecurityService } from './security.service';
import { AuditAccessScreenDto, ColumnDto, ConsulTableDto, DeleteDto, DropdownDto, IsUniqueDto, SaveDataDto, TreeDto } from './dto';
import { UpdateProfileDto } from './dto/update-profile-dto';
import { PasswordDto } from './dto/password-dto';
import { UploadFirmaElectronicaDto } from './dto/upload-firma-electronica-dto';
import { TemporalPasswordDto } from './dto/temporal-password.dto';

@ApiBearerAuth()
@ApiTags('Seguridad')
@Controller('seguridad')
export class SecurityController {

  constructor(private readonly securityService: SecurityService) { }

  @ApiOperation({ summary: 'Retorna las propiedades de las columnas de una tabla' })
  @UseGuards(JwtAuthGuard)
  @Post('columnas')
  getColumn(@Request() req, @Body() columnDto: ColumnDto) {
    return this.securityService.getColumns(columnDto);
  }

  @ApiOperation({ summary: 'Retorna los datos de una tabla' })
  @UseGuards(JwtAuthGuard)
  @Post('consultar-tabla')
  getConsultTable(@Body() consulTableDto: ConsulTableDto) {
    return this.securityService.getConsultTable(consulTableDto);
  }

  @ApiOperation({ summary: 'Retorna los datos de una tabla que tenga datos recursivos' })
  @UseGuards(JwtAuthGuard)
  @Post('consultar-arbol')
  getConsultTree(@Body() treeDto: TreeDto) {
    return this.securityService.getConsultTree(treeDto);
  }

  @ApiOperation({ summary: 'Retorna los datos de una tabla para los componentes de  dropdown' })
  @UseGuards(JwtAuthGuard)
  @Post('combo')
  getCombo(@Body() dropDown: DropdownDto) {
    return this.securityService.getDropDown(dropDown);
  }

  @ApiOperation({ summary: 'Elimina los datos de una tabla' })
  @UseGuards(JwtAuthGuard)
  @Post('eliminar')
  getDelete(@Body() deleteDto: DeleteDto) {
    return this.securityService.getDelete(deleteDto);
  }

  @ApiOperation({ summary: 'Verifica si un dato es único' })
  @UseGuards(JwtAuthGuard)
  @Post('isUnico')
  getIsUnique(@Body() isUniqueDto: IsUniqueDto) {
    return this.securityService.getIsUnique(isUniqueDto);
  }

  @ApiOperation({ summary: 'Retorna los permisos de menú que tiene el usuario por perfil' })
  @UseGuards(JwtAuthGuard)
  @Get('menu/:perfil')
  getMenu(@Param('perfil') perfil: number) {
    return this.securityService.getMenu(perfil);
  }

  @ApiOperation({ summary: 'Retorna los datos de un usuario' })
  @UseGuards(JwtAuthGuard)
  @Get('usuario/:id')
  getUserOneById(@Param('id') id: number) {
    return this.securityService.getUsersInfo(id);
  }

  @ApiOperation({ summary: 'Guarda los datos enviados en formato JSON' })
  @UseGuards(JwtAuthGuard)
  @Post('guardar')
  runSqlList(@Body() saveDataDto: SaveDataDto) {
    return this.securityService.saveData(saveDataDto);
  }

  @ApiOperation({ summary: 'Inserta datos de acceso a pantallas' })
  @UseGuards(JwtAuthGuard)
  @Post('auditoria/acceso-pantalla')
  auditAccessScreen(@Body() auditAccessScreenDto: AuditAccessScreenDto) {
    return this.securityService.auditAccessScreen(auditAccessScreenDto);
  }

  @ApiOperation({ summary: 'Retorna las opciones o nombrese de pantallas' })
  @UseGuards(JwtAuthGuard)
  @Get('opciones')
  getOptions() {
    return this.securityService.getOptions();
  }

  @ApiOperation({ summary: 'Retorna las reglas de la contraseña por perfil' })
  @UseGuards(JwtAuthGuard)
  @Get('reglas-password/:perfil')
  getRules(@Param('perfil') perfil: number) {
    return this.securityService.getPasswordRules(perfil);
  }

  @ApiOperation({ summary: 'Retorna las empresa y sucursales al que tiene permiso el usuario' })
  @UseGuards(JwtAuthGuard)
  @Get('usuario/:id/empresa')
  getUserCompany(@Param('id') id: number) {
    return this.securityService.getUserCompany(id);
  }

  @ApiOperation({ summary: 'Retorna el valor de un parametro' })
  @UseGuards(JwtAuthGuard)
  @Get('parametro/:nombre')
  getParametrs(@Param('nombre') nombre: string) {
    return this.securityService.getParameters(nombre);
  }

  @UseGuards(JwtAuthGuard)
  @Get('forgot-password/:email')
  forgotPassword(@Param('email') email: string) {
    return this.securityService.forgotPassword(email);
  }

  @ApiOperation({ summary: 'Genera una clave temporal y envia al correo' })
  @UseGuards(JwtAuthGuard)
  @Post('password-temporal')
  temporaryPassword(@Body() temporalPasswordDto: TemporalPasswordDto) {
    return this.securityService.temporaryPassword(temporalPasswordDto);
  }

  @ApiOperation({ summary: 'Actualiza el perfil de una cuenta' })
  @UseGuards(JwtAuthGuard)
  @Patch('usuario/cuenta/:user')
  update(@Param('user') user: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.securityService.updateProfile(updateProfileDto, user);
  }

  @ApiOperation({ summary: 'Retorna los datos de una sucursal' })
  @UseGuards(JwtAuthGuard)
  @Get('sucursal/:sucursal')
  getInfoSucursal(@Param('sucursal') sucursal: number) {
    return this.securityService.getInfoSucursal(sucursal);
  }

/*
  @UseGuards(JwtAuthGuard) */
  @Get('getUsuarioActivo')
  getUsuarioActivo() {
    return this.securityService.getUsuarioActivo(true);
  }

  @ApiOperation({ summary: 'Permite activar o descativar la cuenta del usuario' })
  @UseGuards(JwtAuthGuard)
  @Get('usuario/:user/activar/:state')
  getActivateDisableUser(@Param('user') user: number,@Param('state') state: boolean) {
    return this.securityService.activateDisableUser(user, state);
  }

  @ApiOperation({ summary: 'Permite bloquear o desbloquear la cuenta del usuario' })
  @UseGuards(JwtAuthGuard)
  @Get('usuario/:user/bloquear/:state')
  getblockUnblockUser(@Param('user') user: number,@Param('state') state: boolean) {
    return this.securityService.blockUnblockUser(user, state);
  }

  @ApiOperation({ summary: 'Retorna los datos de las empresas' })
  @UseGuards(JwtAuthGuard)
  @Get('empresa')
  getEmpresa(@Query('empresa') empresa: number,@Query('multinacional') multinacional: number) {
    return this.securityService.getEmpresa(empresa, multinacional);
  }

  @ApiOperation({ summary: 'Retorna los datos de todas las sucursales' })
  @UseGuards(JwtAuthGuard)
  @Get('sucursal')
  getSucursal(@Query('sucursal') sucursal: number,@Query('empresa') empresa: number) {
    return this.securityService.getSucursal(sucursal, empresa);
  }

  // USUARIOS

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualiza la contraseña de un usuario de la aplicación' })
  @Patch('actualizar-password/:usuario')
  actualizarContrasena(@Param('usuario') usuario: number,@Body() passwordDto: PasswordDto) {
    return this.securityService.changePassword(passwordDto, usuario);
  }

  
  
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('p12'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Permite subir la firma electronica con extensión .p12' })
  @Post('upload/fimar-electronica')
  subirFirma(@UploadedFile() file: Express.Multer.File, @Body() body: UploadFirmaElectronicaDto) {
    console.log(file, body);
    return this.securityService.saveSignature(file, body);
  }

  @ApiOperation({ summary: 'Retorna los establecimientos de acuerdo a un distrito' })
  @UseGuards(JwtAuthGuard)
  @Get('establecimientos')
  getEstablecimientos(@Query('distrito') distrito: number) {
    return this.securityService.getEstablecimientos(distrito);
  }

  @ApiOperation({ summary: 'Retorna las empresa y sucursales al que tiene permiso el usuario' })
  @UseGuards(JwtAuthGuard)
  @Get('username/:user')
  getByUser(@Param('user') user: string) {
    return this.securityService.getByUser(user);
  }

  @ApiOperation({ summary: 'Distrito y establecimiento si este existe' })
  @UseGuards(JwtAuthGuard)
  @Get('existe-establecimiento')
  getExistEstab(@Query('unicodigo') unicodigo: string,@Query('distrito') distrito:string) {
    return this.securityService.getExistEstab(unicodigo,distrito);
  }

}
