import { Module } from '@nestjs/common';
import { SeguimientoService } from './seguimiento.service';
import { SeguimientoController } from './seguimiento.controller';
import { PoolModule } from '@modules/pool/pool.module';

@Module({
  imports:[
    PoolModule
  ],
  controllers: [SeguimientoController],
  providers: [SeguimientoService]
})
export class SeguimientoModule {}
