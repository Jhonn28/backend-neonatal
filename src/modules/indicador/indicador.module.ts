import { Module } from '@nestjs/common';
import { IndicadorService } from './indicador.service';
import { IndicadorController } from './indicador.controller';
import { PoolModule } from '@modules/pool/pool.module';

@Module({
  imports:[
    PoolModule
  ],
  controllers: [IndicadorController],
  providers: [IndicadorService]
})
export class IndicadorModule {}
