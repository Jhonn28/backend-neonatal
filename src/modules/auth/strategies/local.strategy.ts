import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'custom') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<any> {
    const user = await this.authService.validateUser(request.body);
    if (user.length === 0) {
      throw new UnauthorizedException('Login user or password does not match.');
    }
    // console.log('retorno desde el guards', user[0].ide_segusu);
    return user;
  }
  
}
