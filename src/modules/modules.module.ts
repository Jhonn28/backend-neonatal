import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { PoolModule } from './pool/pool.module';
import { SecurityModule } from './security/security.module';
import { BodegaModule } from './bodega/bodega.module';
import { TalentoHumanoModule } from './talento-humano/talento-humano.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { IndicadorModule } from './indicador/indicador.module';

@Module({
  imports: [AuthModule, MailModule, PoolModule, SecurityModule, BodegaModule, TalentoHumanoModule, SeguimientoModule, IndicadorModule,IndicadorModule],
})
export class ModulesModule { }
