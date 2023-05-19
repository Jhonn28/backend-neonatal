import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';

function jwtModuleOptions(): JwtModuleOptions {
  return {
    secret: 'misecretkey',
    signOptions: { expiresIn: '24h' },
  };
}

function passportModuleOptions(): IAuthModuleOptions {
  return {
    defaultStrategy: 'jwt',
  };
}
export default registerAs('server', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: jwtModuleOptions(),
  passport: passportModuleOptions(),
}));