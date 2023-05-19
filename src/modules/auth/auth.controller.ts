import { Request, Body, Controller, Post, UseGuards, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignOutDto } from './dto/signout.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Cierra la sesíon de una cuenta' })
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async singin(@Request() req, @Body() loginDto: LoginDto) {
    return await this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Cierra la sesíon de una cuenta' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  async singout(@Body() signOutDto: SignOutDto) {
    return await this.authService.singout(signOutDto);
  }

  @ApiOperation({ summary: 'Cambia la contraseña de una cuenta' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('cambiar-password')
  async changePassword(@Body() signOutDto: SignOutDto) {
    return await this.authService.singout(signOutDto);
  }

  @Get('forgot-password/:email')
  forgotPassword(@Param('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @ApiOperation({ summary: 'Renueva el token de acceso' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('renew-token/:user')
  async renew(@Param('user') user: number) {
    return await this.authService.tokenRenew(user);
  }

  @Patch('resetear-password/:token')
  update(@Param('token') token: string, @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto, token);
  }

}
