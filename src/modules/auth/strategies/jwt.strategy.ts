import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '@common/interfaces/payload.interface';
import { SecurityService } from '@modules/security/security.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly securityService: SecurityService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'misecretkey'
    });
  }

  async validate(payload: IJwtPayload) {
    return this.securityService.getUserOneById(payload.sub);
  }
}