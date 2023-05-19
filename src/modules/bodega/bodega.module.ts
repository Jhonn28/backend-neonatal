import { Module } from '@nestjs/common';
import { BodegaService } from './bodega.service';
import { BodegaController } from './bodega.controller';
import { PoolModule } from '@modules/pool/pool.module';

@Module({
  imports: [
    PoolModule
  ],
  controllers: [BodegaController],
  providers: [BodegaService]
})
export class BodegaModule {}
